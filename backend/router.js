const express = require('express')
const router = express.Router()

router.get('/:text', async (req, res) => {
    try {
        //return translateText(text)
        console.log("Got a thing from the thing baby")
    } catch (err) {
        res.status(400).json({message : err.message})
    }
})


const {TranslationServiceClient} = require('@google-cloud/translate');

// Instantiates a client
const translationClient = new TranslationServiceClient();

const projectId = 'virtual-cubist-399422';
const location = 'global';
/* const text = 'Hello, world!'; */

async function translateText(text) {
    // Construct request
    const request = {
        parent: `projects/${projectId}/locations/${location}`,
        contents: [text],
        mimeType: 'text/plain', // mime types: text/plain, text/html
        sourceLanguageCode: 'en',
        targetLanguageCode: 'ar',
    };

    // Run request
    const [response] = await translationClient.translateText(request);

    for (const translation of response.translations) {
        console.log(`Translation: ${translation.translatedText}`);
    }
}

module.exports = {translateText}
