/* const http = require('http')

const options = {
    hostname: 'language-substitute.vercel.app',
    path: '/',
    method: 'GET'
}

const req = http.request(options, (res) => {
    let data = ''

    res.on('data', (chunk) => {
        data += chunk
    })

    res.on('end', () => {
        console.log(data);
      });
    });
    
    req.on('error', (e) => {
      console.error(`Problem with request: ${e.message}`);
    });
    
    req.end(); */

 const axios = require('axios');

// Replace 'example.vercel.app' with your actual Vercel deployment URL
const url = 'https://language-substitute.vercel.app/';
const url2 = 'https://language-ext-backend.vercel.app'

/* axios.get(url2)
  .then(response => {
    console.log(response.json);
  })
  .catch(error => {
    console.error(`Error: ${error.message}`);
  });
 */
  

  fetch(url2)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    console.log("Got network response")
    //return response.json();
    return response
  })
  .then(data => {
    console.log('Data received:', data.body);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
