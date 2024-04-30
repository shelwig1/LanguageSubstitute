const fs = require('fs')

const data = {
    nameOf: "John",
    age: 16
}

const jsonData = JSON.stringify(data, null, 2);

// Value, replacer, space

// What the hell is a replacer?

fs.writeFile("data.json", jsonData, 'utf8', (err) => {
    if (err) {
        console.error("Error occured: ", err)
    } else {
        console.log("JSON file write success")
    }
})

let output = {}

console.log(output)


output["test"] = "test2"

console.log(output)