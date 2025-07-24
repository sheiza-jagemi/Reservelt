const http = require('http');

// Function to check if the JSON server is running
const checkServer = () => {
  console.log('Checking if JSON server is running on http://localhost:3001/rooms...');
  
  http.get('http://localhost:3001/rooms', (res) => {
    const { statusCode } = res;
    let error;
    
    if (statusCode !== 200) {
      error = new Error(`Request Failed.\nStatus Code: ${statusCode}`);
    }
    
    if (error) {
      console.error(error.message);
      res.resume();
      return;
    }
    
    res.setEncoding('utf8');
    let rawData = '';
    
    res.on('data', (chunk) => { rawData += chunk; });
    
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        console.log(`Server is running! Found ${parsedData.length} rooms.`);
        console.log('First room:', parsedData[0]);
      } catch (e) {
        console.error(`Error parsing JSON: ${e.message}`);
      }
    });
  }).on('error', (e) => {
    console.error(`Error: ${e.message}`);
    console.log('Make sure to start the JSON server with: npm run server');
  });
};

checkServer();