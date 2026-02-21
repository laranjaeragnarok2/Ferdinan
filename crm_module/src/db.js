import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '..', 'openclaw.sqlite');

export const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("❌ Erro ao abrir openclaw.sqlite:", err.message);
    } else {
        db.run(`CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            company TEXT,
            status TEXT DEFAULT 'New',
            notes TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (err) {
                console.error("❌ [OpenClaw] Erro na criação da tabela contacts:", err);
            }
        });
    }
});
