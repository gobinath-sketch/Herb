/**
 * This script helps you get a real API key from Plant.id
 * 
 * Instructions:
 * 1. Run this script with Node.js: node get_api_key.js
 * 2. Follow the prompts to sign up for a Plant.id account
 * 3. Copy the API key and update your .env file
 */

import https from 'https';
import readline from 'readline';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Welcome to the Plant.id API Key Setup Script!');
console.log('\nThis script will help you get a real API key from Plant.id and update your .env file.');
console.log('\nFollow these steps:');
console.log('1. The script will open the Plant.id website in your browser');
console.log('2. Sign up for a free account at Plant.id');
console.log('3. After signing up, you\'ll get an API key');
console.log('4. Enter the API key when prompted\n');

// Open Plant.id website in the default browser
const url = 'https://web.plant.id/api-access-key/';
let command;

if (process.platform === 'win32') {
  command = `start ${url}`;
} else if (process.platform === 'darwin') {
  command = `open ${url}`;
} else {
  command = `xdg-open ${url}`;
}

import('child_process').then(({ exec }) => {
  exec(command, (error) => {
    if (error) {
      console.error('Could not open the browser automatically.');
      console.log('Please visit https://web.plant.id/api-access-key/ manually');
    }
  });
});

// Prompt for API key
rl.question('\nPlease enter your Plant.id API key: ', (apiKey) => {
  const envPath = path.join(__dirname, '.env');
  
  try {
    let envContent = '';
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf8');
    }

    // Check if VITE_PLANT_ID_API_KEY already exists in .env
    if (envContent.includes('VITE_PLANT_ID_API_KEY=')) {
      // Update existing key
      envContent = envContent.replace(
        /VITE_PLANT_ID_API_KEY=.*/,
        `VITE_PLANT_ID_API_KEY=${apiKey}`
      );
    } else {
      // Add new key
      envContent += `\nVITE_PLANT_ID_API_KEY=${apiKey}`;
    }

    fs.writeFileSync(envPath, envContent);
    console.log('\n✅ API key has been successfully added to your .env file!');
    console.log('\nYou can now use the Plant Disease Detection feature with real API calls.');
  } catch (error) {
    console.error('\n❌ Error updating .env file:', error.message);
    console.log('\nPlease manually add the following line to your .env file:');
    console.log(`VITE_PLANT_ID_API_KEY=${apiKey}`);
  }

  rl.close();
}); 