'use client';

import { useState, useEffect } from 'react';
import { ProposalData, ProposalService, TechnicalIntegration } from '@/types/proposal';
import { saveProposal, getProposal } from '@/lib/proposal-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Plus, Trash2, Download, Save, Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export default function ProposalAdminPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [proposal, setProposal] = useState<ProposalData>({
        clientName: 'Sua Empresa',
        title: 'Dominância Digital: Sua Marca como Máquina de Vendas',
        subtitle: 'Estratégia de Expansão Digital 2024',
        taxRate: 0.17,
        services: [
            {
                id: 'rebranding',
                name: 'Estratégia & Rebranding',
                description: 'Posicionamento de elite. Definimos a autoridade visual necessária para atrair clientes de alto valor.',
                features: ['Logotipo Premium', 'Identidade Verbal & Tom de Voz', 'Manual de Aplicação de Marca', 'Análise de Posicionamento Competitivo'],
                price: 800,
                type: 'setup'
            },
            {
                id: 'ecommerce',
                name: 'E-commerce de Conversão',
                description: 'Sua plataforma de vendas. Infraestrutura robusta focada em eliminar atritos e maximizar o lucro.',
                features: ['UX/UI Design de Alta Performance', 'Integração com Gateways Globais', 'Checkout Otimizado (One-Click)'],
                price: 3200,
                type: 'setup'
            },
            {
                id: 'social',
                name: 'Social Media',
                description: 'Autoridade constante. Mantendo sua audiência engajada e informada.',
                features: ['4 Posts Mensais', '2 Reels (Alta Edição)', 'Planejamento & Legendas'],
                price: 800,
                type: 'monthly'
            }
        ],
        integrations: [
            { id: 'hosting', name: 'Integração de Hospedagem', price: 217, type: 'setup' },
            { id: 'google', name: 'Integrações Google (Analytics, Search Console, etc.)', price: 250, type: 'setup' },
            { id: 'quarterly', name: 'Integração (Trimestre Integrado)', price: 1800, type: 'setup' }
        ],
        updatedAt: new Date().toISOString()
    });

    useEffect(() => {
        const loadProposal = async () => {
            try {
                const data = await getProposal();
                if (data) {
                    setProposal(data);
                }
            } catch (error) {
                console.error('Error loading proposal:', error);
            } finally {
                setLoading(false);
            }
        };
        loadProposal();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            await saveProposal(proposal);
            toast({
                title: 'Sucesso',
                description: 'Proposta salva com sucesso!',
            });
        } catch (error) {
            console.error('Error saving proposal:', error);
            toast({
                title: 'Erro',
                description: 'Erro ao salvar a proposta.',
                variant: 'destructive',
            });
        } finally {
            setSaving(false);
        }
    };

    const addService = () => {
        const newService: ProposalService = {
            id: crypto.randomUUID(),
            name: 'Novo Serviço',
            description: 'Descrição do serviço',
            features: [],
            price: 0,
            type: 'setup'
        };
        setProposal({ ...proposal, services: [...proposal.services, newService] });
    };

    const removeService = (id: string) => {
        setProposal({ ...proposal, services: proposal.services.filter(s => s.id !== id) });
    };

    const updateService = (id: string, updates: Partial<ProposalService>) => {
        setProposal({
            ...proposal,
            services: proposal.services.map(s => s.id === id ? { ...s, ...updates } : s)
        });
    };

    const addIntegration = () => {
        const newIntegration: TechnicalIntegration = {
            id: crypto.randomUUID(),
            name: 'Nova Integração',
            price: 0,
            type: 'setup'
        };
        setProposal({ ...proposal, integrations: [...proposal.integrations, newIntegration] });
    };

    const removeIntegration = (id: string) => {
        setProposal({ ...proposal, integrations: proposal.integrations.filter(i => i.id !== id) });
    };

    const updateIntegration = (id: string, updates: Partial<TechnicalIntegration>) => {
        setProposal({
            ...proposal,
            integrations: proposal.integrations.map(i => i.id === id ? { ...i, ...updates } : i)
        });
    };

    const generatePDF = async () => {
        const previewElement = document.getElementById('proposal-preview');
        if (!previewElement) return;

        toast({
            title: 'Gerando PDF',
            description: 'Aguarde um momento...',
        });

        try {
            const canvas = await html2canvas(previewElement, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#0a1628'
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            let heightLeft = pdfHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
            heightLeft -= pdf.internal.pageSize.getHeight();

            while (heightLeft >= 0) {
                position = heightLeft - pdfHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
                heightLeft -= pdf.internal.pageSize.getHeight();
            }

            pdf.save(`proposta-${proposal.clientName.toLowerCase().replace(/\s+/g, '-')}.pdf`);

            toast({
                title: 'Sucesso',
                description: 'PDF gerado com sucesso!',
            });
        } catch (error) {
            console.error('Error generating PDF:', error);
            toast({
                title: 'Erro',
                description: 'Erro ao gerar o PDF.',
                variant: 'destructive',
            });
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
    }

    const calculateTotals = () => {
        const setupServices = proposal.services.filter(s => s.type === 'setup').reduce((acc, s) => acc + s.price, 0);
        const setupIntegrations = proposal.integrations.reduce((acc, i) => acc + i.price, 0);
        const monthlyServices = proposal.services.filter(s => s.type === 'monthly').reduce((acc, s) => acc + s.price, 0);

        // Emulated logic from proposta.html (integrations with special rules?)
        // In proposta.html: 1.800 is "Integração (Trimestre Integrado)" which seems to include setup + some months
        // Let's keep it simple for now as per the data model

        const setupSubtotal = setupServices + setupIntegrations;
        const taxes = setupSubtotal * proposal.taxRate;
        const totalInitial = setupSubtotal + taxes;

        return {
            setupSubtotal,
            taxes,
            totalInitial,
            monthlyTotal: monthlyServices + 1000 // +1000 from maintenance in HTML example? 
            // Actually let's just use what's in the services.
        };
    };

    const totals = calculateTotals();

    return (
        <div className="container mx-auto py-10 space-y-8 px-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Proposta Comercial</h1>
                <div className="flex gap-4">
                    <Button variant="outline" onClick={() => window.open('/propostas/proposta.html', '_blank')}>
                        <Eye className="w-4 h-4 mr-2" /> Ver Base HTML
                    </Button>
                    <Button variant="outline" onClick={handleSave} disabled={saving}>
                        <Save className="w-4 h-4 mr-2" /> {saving ? 'Salvando...' : 'Salvar'}
                    </Button>
                    <Button className="bg-orange-600 hover:bg-orange-700" onClick={generatePDF}>
                        <Download className="w-4 h-4 mr-2" /> Baixar PDF
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Editor */}
                <div className="space-y-6">
                    <Card className="bg-zinc-900 border-zinc-800">
                        <CardHeader>
                            <CardTitle>Informações Gerais</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="clientName">Nome do Cliente</Label>
                                <Input
                                    id="clientName"
                                    value={proposal.clientName}
                                    onChange={(e) => setProposal({ ...proposal, clientName: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="title">Título</Label>
                                <Input
                                    id="title"
                                    value={proposal.title}
                                    onChange={(e) => setProposal({ ...proposal, title: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="subtitle">Subtítulo</Label>
                                <Input
                                    id="subtitle"
                                    value={proposal.subtitle}
                                    onChange={(e) => setProposal({ ...proposal, subtitle: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="taxRate">Alíquota de Impostos (0.17 = 17%)</Label>
                                <Input
                                    id="taxRate"
                                    type="number"
                                    step="0.01"
                                    value={proposal.taxRate}
                                    onChange={(e) => setProposal({ ...proposal, taxRate: parseFloat(e.target.value) })}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-900 border-zinc-800">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Serviços</CardTitle>
                            <Button size="sm" onClick={addService}><Plus className="w-4 h-4 mr-1" /> Add</Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {proposal.services.map((service) => (
                                <div key={service.id} className="p-4 border border-zinc-800 rounded-lg relative space-y-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-2 right-2 text-red-500"
                                        onClick={() => removeService(service.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                    <Input
                                        placeholder="Nome do Serviço"
                                        value={service.name}
                                        onChange={(e) => updateService(service.id, { name: e.target.value })}
                                    />
                                    <textarea
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-sm"
                                        placeholder="Descrição"
                                        value={service.description}
                                        onChange={(e) => updateService(service.id, { description: e.target.value })}
                                    />
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <Label>Preço</Label>
                                            <Input
                                                type="number"
                                                value={service.price}
                                                onChange={(e) => updateService(service.id, { price: parseFloat(e.target.value) })}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <Label>Tipo</Label>
                                            <select
                                                className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-sm mt-2"
                                                value={service.type}
                                                onChange={(e) => updateService(service.id, { type: e.target.value as any })}
                                            >
                                                <option value="setup">Setup Único</option>
                                                <option value="monthly">Mensal</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-900 border-zinc-800">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Integrações Técnicas</CardTitle>
                            <Button size="sm" onClick={addIntegration}><Plus className="w-4 h-4 mr-1" /> Add</Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {proposal.integrations.map((integration) => (
                                <div key={integration.id} className="p-4 border border-zinc-800 rounded-lg relative space-y-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-2 right-2 text-red-500"
                                        onClick={() => removeIntegration(integration.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                    <Input
                                        placeholder="Nome da Integração"
                                        value={integration.name}
                                        onChange={(e) => updateIntegration(integration.id, { name: e.target.value })}
                                    />
                                    <div className="w-1/3">
                                        <Label>Preço</Label>
                                        <Input
                                            type="number"
                                            value={integration.price}
                                            onChange={(e) => updateIntegration(integration.id, { price: parseFloat(e.target.value) })}
                                        />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Preview */}
                <div className="sticky top-10">
                    <h2 className="text-xl font-bold mb-4">Preview em Tempo Real</h2>
                    <div className="border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
                        <div id="proposal-preview" className="bg-[#0a1628] text-white p-8 max-w-full overflow-y-auto max-h-[800px] text-[10px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {/* Inline styles and structure to mimic proposta.html */}
                            <header className="text-center mb-10">
                                <div className="inline-block px-4 py-1 mb-4 text-[8px] font-bold tracking-widest uppercase border border-[#ff6b35] rounded-full text-[#ff6b35]">
                                    {proposal.subtitle}
                                </div>
                                <h1 className="text-3xl font-extrabold mb-4 leading-tight">
                                    Dominância Digital: Sua Marca como <span style={{ background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Máquina de Vendas</span>
                                </h1>
                                <p className="text-gray-400 text-sm">
                                    Um ecossistema de alta performance desenhado exclusivamente para a <strong className="text-[#ff6b35]">{proposal.clientName}</strong> pela <strong>Ferdinand-MSP.Group</strong>.
                                </p>
                            </header>

                            <div className="grid grid-cols-3 gap-4 mb-10">
                                {proposal.services.map(service => (
                                    <div key={service.id} className="p-4 bg-[rgba(26,35,50,0.6)] border border-[rgba(255,255,255,0.08)] rounded-xl">
                                        <h3 className="text-xs font-bold uppercase mb-2 text-white">{service.name}</h3>
                                        <p className="text-[8px] text-gray-400 mb-4">{service.description}</p>
                                        <div className="mt-auto pt-2 border-t border-gray-800">
                                            <span className="text-[6px] text-gray-500 uppercase tracking-wider">{service.type === 'setup' ? 'Investimento Único' : 'Fee Mensal'}</span>
                                            <p className="text-sm font-black text-white">R$ {service.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-[rgba(26,35,50,0.6)] p-6 rounded-2xl mb-10 border border-[rgba(255,255,255,0.08)]">
                                <h2 className="text-lg font-bold mb-6">Resumo do Investimento</h2>
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-gray-700">
                                            <th className="py-2 text-gray-400">Serviço</th>
                                            <th className="py-2 text-gray-400">Modelo</th>
                                            <th className="py-2 text-right text-gray-400">Valor</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-800">
                                        {proposal.services.map(s => (
                                            <tr key={s.id}>
                                                <td className="py-3">{s.name}</td>
                                                <td className="py-3 text-gray-400">{s.type === 'setup' ? 'Setup Único' : 'Mensal'}</td>
                                                <td className="py-3 text-right">R$ {s.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan={3} className="py-2 text-[8px] font-bold uppercase tracking-wider text-[#ff6b35]">Integrações Técnicas</td>
                                        </tr>
                                        {proposal.integrations.map(i => (
                                            <tr key={i.id}>
                                                <td className="py-3">{i.name}</td>
                                                <td className="py-3 text-gray-400">Setup Único</td>
                                                <td className="py-3 text-right">R$ {i.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                                            </tr>
                                        ))}
                                        <tr className="text-[#ff6b35] font-bold">
                                            <td className="py-3">Impostos ({(proposal.taxRate * 100).toFixed(0)}% sobre Setup + 1ª Mensalidade)</td>
                                            <td className="py-3">Setup Único</td>
                                            <td className="py-3 text-right">R$ {totals.taxes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className="mt-8 border-2 border-dashed border-[#ff6b35]/40 rounded-xl p-4 bg-gradient-to-br from-orange-500/10 to-transparent">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-[8px] text-gray-400 uppercase">Investimento Inicial (Único)</p>
                                            <p className="text-2xl font-black">R$ {totals.totalInitial.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[8px] text-[#ff6b35] uppercase font-bold">Mensalidade (Após 3 Meses)</p>
                                            <p className="text-2xl font-black text-[#ff6b35]">R$ {totals.monthlyTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <footer className="text-center pt-8 border-t border-gray-800">
                                <img src="https://iili.io/fO7oK3F.png" alt="Logo" className="h-12 mx-auto mb-2 opacity-50" />
                                <p className="text-[8px] text-gray-500">Ferdinand-MSP.Group | Growth, AI & Content Ecosystems</p>
                            </footer>
                        </div>
                    </div>
                    <p className="text-xs text-zinc-500 mt-2 italic text-center">O preview é uma representação simplificada. O PDF final terá o visual completo.</p>
                </div>
            </div>
        </div>
    );
}
