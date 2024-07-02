const {TranslationServiceClient} = require('@google-cloud/translate');
// Instantiates a client
const credentialsBase64 = process.env.GOOGLE_AUTH;
const credentialsJSON = JSON.parse(Buffer.from(credentialsBase64, 'base64').toString('ascii'));
    
    //const client = await auth.getClient();

const translationClient = new TranslationServiceClient({
    credentials : credentialsJSON
});

const projectId = 'virtual-cubist-399422';
const location = 'global';
/* const text = 'Hello, world!'; */

// Make it take a language request as well - first, are we sending the language to the server?
async function translateText(text, targetLanguage) {
    
    // Construct request
    const request = {
        parent: `projects/${projectId}/locations/${location}`,
        contents: [text],
        mimeType: 'text/plain', // mime types: text/plain, text/html
        sourceLanguageCode: 'en',
        targetLanguageCode: targetLanguage,
    };

    // Run request
    const [response] = await translationClient.translateText(request);


    for (const translation of response.translations) {
        console.log(`Translation: ${translation.translatedText}`);
        return(translation.translatedText)
    }
}

module.exports = {translateText}