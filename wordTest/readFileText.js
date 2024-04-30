const fs = require('fs')
fs.readFile('arabic.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

const words = data.trim().split('\n');
console.log(words)


// Turn it into an object now
const jsonData = {
    words: words
  };

  // Convert the JSON object to a string
  const jsonString = JSON.stringify(jsonData, null, 2);

  // Print the JSON string
  //console.log(jsonData);

    fs.writeFile("data.json", jsonString, "utf8", (err) => {
        if (err) {
            console.error("Error occured", err)
        } else {
            console.log("No issues")
        }
    })

});

