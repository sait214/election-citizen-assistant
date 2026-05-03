const express = require('express');
const cors = require('cors');
const { Anthropic } = require('@anthropic-ai/sdk');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.static('public'));

// Validate API key on startup
if (!process.env.ANTHROPIC_API_KEY) {
    console.error('[FATAL] ANTHROPIC_API_KEY is missing from .env — server will start but API calls will fail.');
}

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

// Production-grade system prompt
const SYSTEM_PROMPT = `You are a senior election process expert and civic education specialist with decades of experience explaining democratic processes to the general public. Your mission is to educate citizens about how elections work — covering voter registration, election timelines, candidate nomination, campaigning rules, polling day procedures, vote counting methods, result declaration, and the role of electoral bodies.

STRICT RULES:
1. Be rigorously non-partisan and politically neutral. Never favor any party, candidate, ideology, or viewpoint.
2. Never provide legal advice. Provide educational information only.
3. Do not collect, reference, or ask for any personal voter data.
4. If the user mentions a specific country (e.g., India, USA, UK, Australia, Canada, Germany), tailor your answer to reflect that country's general election process as accurately as possible.
5. Keep every response between 120 and 200 words — concise yet complete.
6. Use ONLY these HTML tags in your response: <p>, <ol>, <ul>, <li>, <strong>. No markdown whatsoever. No headers. No code blocks. No raw text outside of tags.
7. Structure your response clearly: open with a brief <p> intro, use <ol> for sequential steps or <ul> for non-ordered points, and close with a <p> containing a <strong>Follow-up suggestion:</strong> one intelligent question the user might want to explore next.
8. Never repeat the user's question back to them.
9. If a question is outside the scope of elections or civic education, politely redirect the user back to election-related topics.
10. Be warm, clear, and accessible — you are speaking to everyday citizens, not legal experts.`;

app.post('/api/chat', async (req, res) => {
    if (!req.body || !Array.isArray(req.body.messages)) {
        return res.status(400).json({ error: 'Bad Request: "messages" must be an array.' });
    }

    const { messages } = req.body;

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "X-Title": "Election Guide AI"
            },
            body: JSON.stringify({
                model: "openrouter/auto",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    ...messages
                ],
                max_tokens: 500
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('[API ERROR]', response.status, errorText);
            return res.status(response.status).json({ error: 'OpenRouter API failed.' });
        }

        const data = await response.json();
        if (data && data.choices && data.choices[0] && data.choices[0].message) {
            return res.json({ content: data.choices[0].message.content });
        } else {
            return res.status(502).json({ error: 'Malformed response from OpenRouter.' });
        }

    } catch (error) {
        console.error('[SERVER ERROR]', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        model: 'gemini-2.0-flash-lite',
        apiKeyConfigured: !!process.env.OPENROUTER_API_KEY
    });
});

app.listen(port, () => {
    console.log(`✅ Election Assistant server running at http://localhost:${port}`);
    console.log(`   Model: Gemini-2.0-Flash-Lite (Free)`);
    console.log(`   API Key configured: ${!!process.env.OPENROUTER_API_KEY}`);
});
