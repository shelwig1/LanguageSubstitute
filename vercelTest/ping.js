const http = require('http')

const options = {
    hostname: 'language-substitute-rfkgoh66u-seans-projects-e8bfcdac.vercel.app',
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
    
    req.end();