const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Proxy endpoint pentru trends
app.get('/api/trends', async (req, res) => {
    try {
        const response = await axios.get('https://agentx.site/trends.json');
        res.json(response.data);
    } catch (error) {
        console.error('Eroare la preluarea trendurilor:', error);
        res.json([{
            timestamp: new Date().toISOString(),
            trends: ['România', 'Actualitate', 'Sport', 'Tehnologie']
        }]);
    }
});

const db = new sqlite3.Database('./news.db', (err) => {
    if (err) {
        console.error('Eroare la conectarea la baza de date:', err.message);
    } else {
        console.log('Conectat la baza de date SQLite.');
        db.run(`CREATE TABLE IF NOT EXISTS news (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            content TEXT,
            topic TEXT,
            timestamp INTEGER
        )`);
    }
});

app.get('/api/news', (req, res) => {
    const query = `
        SELECT * FROM news 
        WHERE title IS NOT NULL 
        AND title != 'Știre de rezervă'
        AND content IS NOT NULL 
        AND content != ''
        ORDER BY timestamp DESC
    `;
    
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Eroare la citirea știrilor:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        
        if (!rows || rows.length === 0) {
            res.status(404).json({ message: "Nu există știri disponibile" });
            return;
        }
        
        res.json(rows);
    });
});

app.post('/api/news', (req, res) => {
    const { title, content, topic } = req.body;
    
    if (!title || !content || title === 'Știre de rezervă') {
        res.status(400).json({ error: "Date invalide pentru știre" });
        return;
    }

    const timestamp = Date.now();
    
    db.run(
        'INSERT INTO news (title, content, topic, timestamp) VALUES (?, ?, ?, ?)',
        [title, content, topic, timestamp],
        function(err) {
            if (err) {
                console.error('Eroare la inserarea știrii:', err);
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ 
                id: this.lastID, 
                title, 
                content, 
                topic, 
                timestamp 
            });
        }
    );
});

const server = app.listen(port, () => {
    console.log(`Serverul rulează pe http://localhost:${port}`);
})
.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Portul ${port} este deja în uz. Încercați alt port.`);
        process.exit(1);
    } else {
        console.error('Eroare la pornirea serverului:', error);
        process.exit(1);
    }
});

process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    server.close(() => {
        console.log('Server închis.');
        process.exit(0);
    });
});