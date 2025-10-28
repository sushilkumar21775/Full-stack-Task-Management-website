#!/usr/bin/env node

/**
 * Server Health Check Script
 * 
 * Tests if the backend server is running and responding correctly
 */

const http = require('http');

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:5000';
const TIMEOUT = 5000; // 5 seconds

console.log('🔍 Checking server health...\n');

// Test health endpoint
function checkHealth() {
  return new Promise((resolve, reject) => {
    const req = http.get(`${SERVER_URL}/health`, { timeout: TIMEOUT }, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`Health check failed with status ${res.statusCode}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

// Test root endpoint
function checkRoot() {
  return new Promise((resolve, reject) => {
    const req = http.get(`${SERVER_URL}/`, { timeout: TIMEOUT }, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`Root endpoint failed with status ${res.statusCode}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

// Run all checks
async function runChecks() {
  console.log(`Target: ${SERVER_URL}\n`);

  try {
    // Check health endpoint
    console.log('1. Testing /health endpoint...');
    const healthData = await checkHealth();
    console.log('   ✅ Health check passed');
    console.log(`   Status: ${healthData.status}`);
    console.log(`   Environment: ${healthData.environment}`);
    console.log(`   MongoDB: ${healthData.mongodb}`);
    console.log(`   Uptime: ${Math.round(healthData.uptime)}s\n`);

    // Check root endpoint
    console.log('2. Testing / endpoint...');
    const rootData = await checkRoot();
    console.log('   ✅ Root endpoint passed');
    console.log(`   Message: ${rootData.message}`);
    console.log(`   Version: ${rootData.version}\n`);

    console.log('✅ All checks passed! Server is healthy.\n');
    process.exit(0);

  } catch (error) {
    console.error(`\n❌ Server health check failed!`);
    console.error(`   Error: ${error.message}\n`);
    console.error('💡 Tips:');
    console.error('   - Make sure the server is running (npm run dev)');
    console.error('   - Check if MongoDB is connected');
    console.error('   - Verify the server URL and port\n');
    process.exit(1);
  }
}

// Run the checks
runChecks();
