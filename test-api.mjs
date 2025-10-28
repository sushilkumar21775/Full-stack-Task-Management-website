// Comprehensive Full-Stack Application Test Suite
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
const testResults = [];
let token = '';
let userId = '';
let taskId = '';

// Generate random test data
const testEmail = `test_${Date.now()}@example.com`;
const testPassword = 'Test123456';
const testName = 'Test User';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  white: '\x1b[37m',
};

function log(message, color = 'white') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testEndpoint(name, testFn) {
  process.stdout.write(`Testing: ${name}...`);
  try {
    await testFn();
    log(' ✅ PASS', 'green');
    testResults.push({ name, result: 'PASS' });
    return true;
  } catch (error) {
    log(' ❌ FAIL', 'red');
    const errorMsg = error.response?.data?.message || error.message || 'Unknown error';
    log(`  Error: ${errorMsg}`, 'yellow');
    if (error.response) {
      log(`  Status: ${error.response.status}`, 'yellow');
    }
    testResults.push({ name, result: 'FAIL', error: errorMsg });
    return false;
  }
}

async function runTests() {
  log('\n========================================', 'cyan');
  log('🧪 FULL-STACK APPLICATION TEST SUITE', 'cyan');
  log('========================================\n', 'cyan');

  log('🔍 Testing Backend Endpoints...\n', 'yellow');

  // Test 1: Health Check
  await testEndpoint('1. Health Check', async () => {
    const { data } = await axios.get('http://localhost:5000/health');
    if (data.status !== 'OK') throw new Error('Health check failed');
  });

  // Test 2: Register User
  await testEndpoint('2. User Registration', async () => {
    const { data } = await axios.post(`${API_URL}/auth/register`, {
      name: testName,
      email: testEmail,
      password: testPassword,
    });
    if (!data.token) throw new Error('No token returned');
    if (data.email !== testEmail) throw new Error('Email mismatch');
    token = data.token;
    userId = data._id;
  });

  // Test 3: Login
  await testEndpoint('3. User Login', async () => {
    const { data } = await axios.post(`${API_URL}/auth/login`, {
      email: testEmail,
      password: testPassword,
    });
    if (!data.token) throw new Error('No token returned');
    if (data.email !== testEmail) throw new Error('Email mismatch');
  });

  // Test 4: Get Current User
  await testEndpoint('4. Get Current User', async () => {
    const { data } = await axios.get(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (data.email !== testEmail) throw new Error('Email mismatch');
  });

  // Test 5: Create Task
  await testEndpoint('5. Create Task', async () => {
    const { data } = await axios.post(
      `${API_URL}/tasks`,
      {
        title: 'Test Task',
        description: 'This is a test task',
        completed: false,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (data.data.title !== 'Test Task') throw new Error('Task title mismatch');
    taskId = data.data._id;
  });

  // Test 6: Get All Tasks
  await testEndpoint('6. Get All Tasks', async () => {
    const { data } = await axios.get(`${API_URL}/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!data.data || data.data.length === 0) throw new Error('No tasks found');
  });

  // Test 7: Get Single Task
  await testEndpoint('7. Get Single Task', async () => {
    const { data } = await axios.get(`${API_URL}/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (data.data._id !== taskId) throw new Error('Task ID mismatch');
  });

  // Test 8: Update Task
  await testEndpoint('8. Update Task', async () => {
    const { data } = await axios.put(
      `${API_URL}/tasks/${taskId}`,
      {
        title: 'Updated Test Task',
        description: 'This task has been updated',
        completed: true,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (data.data.title !== 'Updated Test Task') throw new Error('Task not updated');
    if (data.data.completed !== true) throw new Error('Task completion status not updated');
  });

  // Test 9: Update User Profile
  await testEndpoint('9. Update User Profile', async () => {
    const { data } = await axios.put(
      `${API_URL}/users/${userId}`,
      {
        name: 'Updated Test User',
        email: testEmail,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (data.data.name !== 'Updated Test User') throw new Error('User name not updated');
  });

  // Test 10: Delete Task
  await testEndpoint('10. Delete Task', async () => {
    const { data } = await axios.delete(`${API_URL}/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!data.message.includes('deleted')) throw new Error('Task not deleted');
  });

  // Test 11: Delete User (Cleanup)
  await testEndpoint('11. Delete User (Self-delete should fail - Admin required)', async () => {
    try {
      await axios.delete(`${API_URL}/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      throw new Error('Should have failed - non-admin cannot delete users');
    } catch (error) {
      if (error.response?.status !== 403) throw new Error('Expected 403 Forbidden');
      // This is the expected behavior - non-admin users cannot delete accounts
    }
  });

  // Test 12: Invalid Token
  await testEndpoint('12. Invalid Token Handling', async () => {
    try {
      await axios.get(`${API_URL}/auth/me`, {
        headers: { Authorization: 'Bearer invalid_token_12345' },
      });
      throw new Error('Should have failed with invalid token');
    } catch (error) {
      if (error.response?.status !== 401) throw new Error('Expected 401 status code');
    }
  });

  // Test 13: No Token
  await testEndpoint('13. No Token Handling', async () => {
    try {
      await axios.get(`${API_URL}/tasks`);
      throw new Error('Should have failed without token');
    } catch (error) {
      if (error.response?.status !== 401) throw new Error('Expected 401 status code');
    }
  });

  // Test 14: Invalid Credentials
  await testEndpoint('14. Invalid Login Credentials', async () => {
    try {
      await axios.post(`${API_URL}/auth/login`, {
        email: 'nonexistent@example.com',
        password: 'wrongpassword',
      });
      throw new Error('Should have failed with invalid credentials');
    } catch (error) {
      if (error.response?.status !== 401) throw new Error('Expected 401 status code');
    }
  });

  // Test 15: Duplicate Registration
  await testEndpoint('15. Duplicate Registration Prevention', async () => {
    // First register a new user
    const uniqueEmail = `duplicate_${Date.now()}@example.com`;
    await axios.post(`${API_URL}/auth/register`, {
      name: 'Duplicate Test',
      email: uniqueEmail,
      password: 'Test123456',
    });

    // Try to register again with same email
    try {
      await axios.post(`${API_URL}/auth/register`, {
        name: 'Duplicate Test 2',
        email: uniqueEmail,
        password: 'Test123456',
      });
      throw new Error('Should have failed with duplicate email');
    } catch (error) {
      if (error.response?.status !== 400) throw new Error('Expected 400 status code');
    }
  });

  // Print Summary
  log('\n========================================', 'cyan');
  log('📊 TEST RESULTS SUMMARY', 'cyan');
  log('========================================\n', 'cyan');

  const passCount = testResults.filter((r) => r.result === 'PASS').length;
  const failCount = testResults.filter((r) => r.result === 'FAIL').length;
  const totalTests = testResults.length;

  log(`Total Tests: ${totalTests}`, 'white');
  log(`Passed: ${passCount}`, 'green');
  log(`Failed: ${failCount}`, 'red');
  log(`Success Rate: ${((passCount / totalTests) * 100).toFixed(2)}%\n`, 'yellow');

  if (failCount > 0) {
    log('Failed Tests:', 'red');
    testResults
      .filter((r) => r.result === 'FAIL')
      .forEach((r) => {
        log(`  - ${r.name}`, 'yellow');
        if (r.error) {
          log(`    Error: ${r.error}`, 'white');
        }
      });
  }

  log('\n========================================\n', 'cyan');

  if (passCount === totalTests) {
    log('🎉 ALL TESTS PASSED! 🎉', 'green');
    process.exit(0);
  } else {
    log('⚠️  SOME TESTS FAILED', 'yellow');
    process.exit(1);
  }
}

// Run tests
runTests().catch((error) => {
  log(`\n❌ Test suite failed: ${error.message}`, 'red');
  process.exit(1);
});
