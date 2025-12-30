// Script to seed production database via API
const https = require('https');

const API_URL = 'https://portfolio-85phdjicg-farid2063s-projects.vercel.app/api/projects/add';
const API_KEY = process.env.API_KEY || 'your-api-key-here';

const data = JSON.stringify({});

const options = {
  hostname: 'portfolio-85phdjicg-farid2063s-projects.vercel.app',
  path: '/api/projects/add',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
    'Authorization': `Bearer ${API_KEY}`,
    'X-API-Key': API_KEY
  }
};

const req = https.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  
  let responseData = '';
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    console.log('Response:', responseData);
    if (res.statusCode === 201) {
      console.log('✅ Projects added successfully!');
    } else {
      console.log('❌ Failed to add projects');
    }
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.write(data);
req.end();



