const {TranslationServiceClient} = require('@google-cloud/translate');
const translationClient = new TranslationServiceClient();
const projectId = 'virtual-cubist-399422';
const location = 'global';

const fs = require('fs');
const readline = require('readline');
const filePath = 'arabic.txt';

const fileStream = fs.createReadStream(filePath);

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

let lineCount = 0;
let output = {};

rl.on('line', (line) => {
  console.log('Processing line:', line);

// Right side needs to be the API call to google translate
  output[line] = ""
  lineCount++;

  
if (lineCount > 5) {
  rl.close();
  // This is the most crucial line for everything we're doing here, apparently
  fileStream.close();
  
}
})

rl.on('close', () => {
  rl.removeAllListeners()

    console.log('End of file reached after reading 5 lines.');
    const outputJSON = JSON.stringify(output, null, 2)
/*     fs.writeFile("data.json", outputJSON, 'utf8', (err) => {
      if (err) {
          console.error("Error occured: ", err)
      } else {
          console.log("JSON file write success")
      } 
  }) */
});



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

console.log("End of my script")
