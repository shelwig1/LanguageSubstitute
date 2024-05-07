const server = 'http://localhost:3000/'
const url = chrome.runtime.getURL('freqList.json')
let words
let freqCutoff
let onOff = true

console.log("Background working")


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    translateCall(request.word).then(sendResponse)
    return true
    
})

    /*    if (request.word) {
         translateCall(request.word)
            .then(processedWord => {
                sendResponse("Testicle test response data SUGMA")
                console.log("SENT RESPONSE TO CONTENT")
            })
            .catch(error => {
                sendResponse({error : error.message})
            })
    }
 */        

async function translateCall(data) {
    console.log("Background - translateCall - data received: ", JSON.stringify(data))
    const arrayData = [data]
    const response = await fetch (server, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(arrayData)
    })
    const responseData = await response.json()

    return responseData[0]
}

async function serverTest(data) {
    const response = await fetch (server, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    console.log("Fetch response was: ", response.json())
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.active && changeInfo.status === 'complete') {
        chrome.scripting.executeScript({
            target: {tabId : tab.id},
            files: ['content.js']
        })
    }

})

// TODO - toggle translations when we hit the toggle
chrome.storage.onChanged.addListener( async (changes, areaName) => {
    console.log("Local storage changed")

    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions)
    console.log(tab.id)
    chrome.scripting.executeScript({
        target: {tabId : tab.id},
        files: ['content.js']
    })
})

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }

async function fetchData() {
    try{
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error("Network response not okay")
        }
        const data = await response.json()

        console.log("Fetched data", data)
        return data
    } catch (error) {
        console.log("Error fetching data:", error)
    }
}

/* fetchData()
    .then(data => {
        console.log("Data outisde async function:", data)
        words = data
        console.log("Setting words var to:",words)
    })
    .catch(error => {
        console.error("Error outside async function", error)
    })
 */