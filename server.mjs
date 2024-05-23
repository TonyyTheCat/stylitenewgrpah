import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static('public'));

app.get('/api/playercount', async (req, res) => {
    try {
        const response = await fetch("https://api.vectaria.io/v2/games", {
            "headers": {
                "accept": "application/json, text/plain, */*"
            },
            "method": "GET"
        });

        const data = await response.json();
        const stylite = data.filter(x => x.shortId === "5NFC53QB")[0];
        res.json({ playersCount: stylite.serverStats.playersCount });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
