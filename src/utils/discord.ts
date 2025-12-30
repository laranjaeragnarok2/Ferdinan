/**
 * Utilitário para enviar notificações ao Discord via Webhook
 */

interface LeadData {
  name?: string;
  email: string;
  whatsapp?: string;
  challenge?: string;
}

type LeadType = 'form' | 'modal';

/**
 * Envia notificação de novo lead para o Discord
 * @param leadData - Dados do lead capturado
 * @param type - Tipo de captura ('form' para formulário principal, 'modal' para modal de email)
 */
export async function sendDiscordNotification(
  leadData: LeadData,
  type: LeadType
): Promise<void> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  // Se não houver webhook configurado, apenas loga e retorna (não quebra o fluxo)
  if (!webhookUrl) {
    console.warn('⚠️ Discord Webhook URL não configurada. Notificação não enviada.');
    return;
  }

  try {
    const isFormLead = type === 'form';
    const timestamp = new Date().toISOString();

    // Embed rico para Discord
    const embed = {
      title: isFormLead ? '📋 Novo Lead - Formulário Principal' : '✉️ Novo Lead - Modal de Captura',
      color: isFormLead ? 0xea580c : 0x3b82f6, // Laranja para form, Azul para modal
      fields: [
        ...(leadData.name
          ? [
              {
                name: '👤 Nome',
                value: leadData.name,
                inline: true,
              },
            ]
          : []),
        {
          name: '📧 Email',
          value: leadData.email,
          inline: true,
        },
        ...(leadData.whatsapp
          ? [
              {
                name: '📱 WhatsApp',
                value: leadData.whatsapp,
                inline: true,
              },
            ]
          : []),
        ...(leadData.challenge
          ? [
              {
                name: '🎯 Desafio Principal',
                value: leadData.challenge,
                inline: false,
              },
            ]
          : []),
      ],
      footer: {
        text: `Ferdinan-MSP • ${isFormLead ? 'Análise de Negócio' : 'Curadoria de Conteúdo'}`,
      },
      timestamp,
    };

    // Payload para Discord
    const payload = {
      content: isFormLead
        ? '🔥 **Novo lead solicitou análise de negócio!**'
        : '📚 **Novo lead capturado no modal de curadoria!**',
      embeds: [embed],
    };

    // Envia para Discord
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Discord API retornou status ${response.status}`);
    }

    console.log('✅ Notificação Discord enviada com sucesso');
  } catch (error) {
    // Loga o erro mas não propaga (Discord não deve quebrar o fluxo principal)
    console.error('❌ Erro ao enviar notificação Discord:', error);
  }
}
