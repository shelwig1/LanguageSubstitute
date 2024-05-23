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

/* const axios = require('axios');

// Replace 'example.vercel.app' with your actual Vercel deployment URL

axios.get(url)
  .then(response => {
    console.log(response.json);
  })
  .catch(error => {
    console.error(`Error: ${error.message}`);
  });

  f
 */
  const url = 'https://language-substitute.vercel.app/';

  fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Data received:', data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
