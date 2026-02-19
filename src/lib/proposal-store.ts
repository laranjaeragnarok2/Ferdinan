// Arquivo neutralizado para remoção de Firebase
// Mantendo a compatibilidade com as chamadas do sistema de Propostas
export const saveProposal = async (data: any) => {
    console.log("[SOVEREIGN_MODE] Mock saveProposal:", data);
    return { success: true, id: 'mock-id' };
};

export const getProposal = async (id: string) => {
    console.log("[SOVEREIGN_MODE] Mock getProposal for ID:", id);
    return null;
};

export const submitProposal = async (data: any) => {
    console.log("[SOVEREIGN_MODE] Mock submitProposal:", data);
    return { success: true };
};
