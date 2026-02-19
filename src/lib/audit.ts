import { db } from './firebase';
import { collection, addDoc, query, orderBy, limit, getDocs, Timestamp } from 'firebase/firestore';

const LOGS_COLLECTION = 'system-audit-logs';

export type AuditLogSeverity = 'INFO' | 'WARNING' | 'CRITICAL' | 'SECURITY';

export interface AuditLog {
    id?: string;
    timestamp: any;
    severity: AuditLogSeverity;
    action: string;
    actor: string;
    details: any;
    path?: string;
}

/**
 * Registra uma ação no ledger imutável de auditoria.
 * Em uma Fintech, isso é o rastro da "Ação Sábia".
 */
export async function logAuditAction(
    action: string,
    actor: string,
    severity: AuditLogSeverity = 'INFO',
    details: any = {}
) {
    try {
        const log: AuditLog = {
            timestamp: Timestamp.now(),
            severity,
            action,
            actor,
            details,
        };
        
        await addDoc(collection(db, LOGS_COLLECTION), log);
        
        if (severity === 'SECURITY' || severity === 'CRITICAL') {
            console.warn(`🚨 [SECURITY AUDIT] ${action} by ${actor}`);
        }
    } catch (error) {
        // Fallback em caso de erro no banco para garantir que o erro seja logado no console pelo menos
        console.error('❌ [AUDIT FAIL] Could not write to ledger:', error);
    }
}

/**
 * Busca os logs mais recentes para o painel administrativo.
 */
export async function getRecentAuditLogs(limitCount: number = 50) {
    const logsRef = collection(db, LOGS_COLLECTION);
    const q = query(logsRef, orderBy('timestamp', 'desc'), limit(limitCount));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}
