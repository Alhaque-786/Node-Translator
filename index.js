const express = require('express');
const bodyParser = require('body-parser');
const MsTranslator = require('mstranslator');

const app = express();
const port = 3001;

const apiKey = 'YOUR_MICROSOFT_TRANSLATOR_API_KEY'; // Replace with your actual Microsoft Translator API key
const translator = new MsTranslator({ api_key: '669198ae6b0b44a78a0c37956505d5e2', content_type: 'application/json' });

// Explicitly initialize the token
translator.initialize_token();

app.use(bodyParser.json());

app.post('/translate', async (req, res) => {
  try {
    // Check if the request body contains the required 'text' field
    if (!req.body || !req.body.text) {
      return res.status(400).json({ error: 'Missing or invalid request body. Please provide the "text" field.' });
    }

    const englishText = req.body.text;

    // Translate the English text to French using Microsoft Translator API
    translator.translate({ text: englishText, from: 'en', to: 'fr' }, (err, translationResult) => {
      if (err) {
        console.error('Error during translation:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      // Respond with the translated text
      res.json({ translation: translationResult });
    });
  } catch (error) {
    console.error('Error during translation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


