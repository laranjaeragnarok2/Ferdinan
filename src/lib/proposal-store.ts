import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    query,
    orderBy,
    limit,
} from 'firebase/firestore';
import { db } from './firebase';
import { ProposalData } from '@/types/proposal';

const PROPOSALS_COLLECTION = 'proposals';

// Salvar ou atualizar proposta
export async function saveProposal(proposal: ProposalData): Promise<string> {
    const id = proposal.id || 'default-proposal';
    const docRef = doc(db, PROPOSALS_COLLECTION, id);

    const dataToSave = {
        ...proposal,
        id,
        updatedAt: new Date().toISOString(),
    };

    await setDoc(docRef, dataToSave, { merge: true });
    return id;
}

// Buscar proposta por ID
export async function getProposal(id: string = 'default-proposal'): Promise<ProposalData | null> {
    const docRef = doc(db, PROPOSALS_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        return null;
    }

    return docSnap.data() as ProposalData;
}
