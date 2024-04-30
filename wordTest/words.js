const fs = require('fs');
const readline = require('readline');

const filePath = 'arabic.txt';

const fileStream = fs.createReadStream(filePath);

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

let lineCount = 0;
rl.on('line', (line) => {
    console.log('Processing line:', line);
  
    lineCount++;
    console.log(lineCount)

  
    if (lineCount > 5) {
        rl.close();
        // This is the most crucial line for everything we're doing here, apparently
        rl.removeAllListeners()
        fileStream.close();
  } 
});

// Handle the end of file
rl.on('close', () => {
    console.log('End of file reached after reading 5 lines.');
});



/*
Question to answer:

It outputs wrong in the console, but does it write to HTML correctly? That's all I actually care about.
*/