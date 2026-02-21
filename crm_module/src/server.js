import express from 'express';
import cors from 'cors';
import { getDb } from './db.js';
import { listContacts, addContact, getContact } from './contacts.js';
import { listDeals, addDeal, getDeal, updateStage } from './deals.js';
import { generatePipelineReport } from './reports.js';
import { listActivities, addActivity } from './activities.js';
import { listDueFollowups, addFollowup, completeFollowup } from './followups.js';
import { search as searchDb } from './search.js';
import { sendLeadNotifications } from './mailer.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;
const db = getDb();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Contacts API
app.get('/api/contacts', (req, res) => {
    try {
        const contacts = listContacts(db, req.query.search);
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/contacts', async (req, res) => {
    try {
        const id = addContact(db, req.body);
        // Enviar notificações (email/discord)
        sendLeadNotifications(req.body);
        res.status(201).json({ id });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/api/contacts/:id', (req, res) => {
    try {
        const contact = getContact(db, req.params.id);
        if (!contact) return res.status(404).json({ error: 'Contact not found' });
        res.json(contact);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Deals API
app.get('/api/deals', (req, res) => {
    try {
        const deals = listDeals(db, { stage: req.query.stage, tag: req.query.tag });
        res.json(deals);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/deals', (req, res) => {
    try {
        const id = addDeal(db, req.body);
        res.status(201).json({ id });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/api/deals/:id', (req, res) => {
    try {
        const deal = getDeal(db, req.params.id);
        if (!deal) return res.status(404).json({ error: 'Deal not found' });
        res.json(deal);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.patch('/api/deals/:id/stage', (req, res) => {
    try {
        updateStage(db, req.params.id, req.body.stage);
        res.json({ success: true });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Reports & Search
app.get('/api/report/pipeline', (req, res) => {
    try {
        const report = generatePipelineReport(db);
        res.json({ report });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/search', (req, res) => {
    try {
        const results = searchDb(db, req.query.q);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`CRM API Server running at http://localhost:${port}`);
});
