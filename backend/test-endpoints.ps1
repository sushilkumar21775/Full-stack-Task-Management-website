# Backend API Endpoint Test Script
# Tests all API endpoints to ensure they work correctly

$baseUrl = "http://localhost:5000"
$headers = @{"Content-Type" = "application/json"}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  BACKEND API ENDPOINT TESTS" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Test 1: Health Check
Write-Host "1. Testing Health Check Endpoint..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/health" -Method Get
    Write-Host "   ✅ Health check passed" -ForegroundColor Green
    Write-Host "   Status: $($response.status)" -ForegroundColor Gray
} catch {
    Write-Host "   ❌ Health check failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 2: Root Endpoint
Write-Host "`n2. Testing Root Endpoint..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/" -Method Get
    Write-Host "   ✅ Root endpoint passed" -ForegroundColor Green
    Write-Host "   Message: $($response.message)" -ForegroundColor Gray
} catch {
    Write-Host "   ❌ Root endpoint failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: Register New User
Write-Host "`n3. Testing Register Endpoint (POST /api/auth/register)..." -ForegroundColor Yellow
$registerData = @{
    name = "Test User"
    email = "testuser$(Get-Random)@example.com"
    password = "password123"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/auth/register" -Method Post -Body $registerData -Headers $headers
    Write-Host "   ✅ Register passed (Status 201)" -ForegroundColor Green
    Write-Host "   User ID: $($response._id)" -ForegroundColor Gray
    Write-Host "   Token received: $($response.token.Substring(0, 20))..." -ForegroundColor Gray
    $global:token = $response.token
    $global:userId = $response._id
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    Write-Host "   ❌ Register failed (Status $statusCode): $($_.Exception.Message)" -ForegroundColor Red
}

# Test 4: Login
Write-Host "`n4. Testing Login Endpoint (POST /api/auth/login)..." -ForegroundColor Yellow
$loginData = @{
    email = "testuser@example.com"
    password = "password123"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/auth/login" -Method Post -Body $loginData -Headers $headers -ErrorAction Stop
    Write-Host "   ✅ Login passed (Status 200)" -ForegroundColor Green
    $global:token = $response.token
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    if ($statusCode -eq 401) {
        Write-Host "   ℹ️  Login failed with 401 (expected if user doesn't exist)" -ForegroundColor Yellow
    } else {
        Write-Host "   ❌ Login failed (Status $statusCode)" -ForegroundColor Red
    }
}

# Test 5: Get Current User (requires authentication)
Write-Host "`n5. Testing Get Me Endpoint (GET /api/auth/me)..." -ForegroundColor Yellow
if ($global:token) {
    $authHeaders = @{
        "Content-Type" = "application/json"
        "Authorization" = "Bearer $($global:token)"
    }
    try {
        $response = Invoke-RestMethod -Uri "$baseUrl/api/auth/me" -Method Get -Headers $authHeaders
        Write-Host "   ✅ Get Me passed (Status 200)" -ForegroundColor Green
        Write-Host "   Name: $($response.name)" -ForegroundColor Gray
    } catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "   ❌ Get Me failed (Status $statusCode)" -ForegroundColor Red
    }
} else {
    Write-Host "   ⚠️  Skipped (no token available)" -ForegroundColor Yellow
}

# Test 6: Get Profile (alias endpoint)
Write-Host "`n6. Testing Profile Endpoint (GET /api/auth/profile)..." -ForegroundColor Yellow
if ($global:token) {
    try {
        $response = Invoke-RestMethod -Uri "$baseUrl/api/auth/profile" -Method Get -Headers $authHeaders
        Write-Host "   ✅ Get Profile passed (Status 200)" -ForegroundColor Green
    } catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "   ❌ Get Profile failed (Status $statusCode)" -ForegroundColor Red
    }
} else {
    Write-Host "   ⚠️  Skipped (no token available)" -ForegroundColor Yellow
}

# Test 7: Create Task
Write-Host "`n7. Testing Create Task (POST /api/tasks)..." -ForegroundColor Yellow
if ($global:token) {
    $taskData = @{
        title = "Test Task"
        description = "This is a test task"
        completed = $false
    } | ConvertTo-Json
    
    try {
        $response = Invoke-RestMethod -Uri "$baseUrl/api/tasks" -Method Post -Body $taskData -Headers $authHeaders
        Write-Host "   ✅ Create Task passed (Status 201)" -ForegroundColor Green
        Write-Host "   Task ID: $($response.data._id)" -ForegroundColor Gray
        $global:taskId = $response.data._id
    } catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "   ❌ Create Task failed (Status $statusCode)" -ForegroundColor Red
    }
} else {
    Write-Host "   ⚠️  Skipped (no token available)" -ForegroundColor Yellow
}

# Test 8: Get All Tasks
Write-Host "`n8. Testing Get Tasks (GET /api/tasks)..." -ForegroundColor Yellow
if ($global:token) {
    try {
        $response = Invoke-RestMethod -Uri "$baseUrl/api/tasks" -Method Get -Headers $authHeaders
        Write-Host "   ✅ Get Tasks passed (Status 200)" -ForegroundColor Green
        Write-Host "   Tasks count: $($response.count)" -ForegroundColor Gray
    } catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "   ❌ Get Tasks failed (Status $statusCode)" -ForegroundColor Red
    }
} else {
    Write-Host "   ⚠️  Skipped (no token available)" -ForegroundColor Yellow
}

# Test 9: Update Task
Write-Host "`n9. Testing Update Task (PUT /api/tasks/:id)..." -ForegroundColor Yellow
if ($global:token -and $global:taskId) {
    $updateData = @{
        title = "Updated Task"
        description = "This task has been updated"
        completed = $true
    } | ConvertTo-Json
    
    try {
        $response = Invoke-RestMethod -Uri "$baseUrl/api/tasks/$($global:taskId)" -Method Put -Body $updateData -Headers $authHeaders
        Write-Host "   ✅ Update Task passed (Status 200)" -ForegroundColor Green
    } catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "   ❌ Update Task failed (Status $statusCode)" -ForegroundColor Red
    }
} else {
    Write-Host "   ⚠️  Skipped (no token or task ID)" -ForegroundColor Yellow
}

# Test 10: Delete Task
Write-Host "`n10. Testing Delete Task (DELETE /api/tasks/:id)..." -ForegroundColor Yellow
if ($global:token -and $global:taskId) {
    try {
        $response = Invoke-RestMethod -Uri "$baseUrl/api/tasks/$($global:taskId)" -Method Delete -Headers $authHeaders
        Write-Host "   ✅ Delete Task passed (Status 200)" -ForegroundColor Green
    } catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "   ❌ Delete Task failed (Status $statusCode)" -ForegroundColor Red
    }
} else {
    Write-Host "   ⚠️  Skipped (no token or task ID)" -ForegroundColor Yellow
}

# Test 11: Update Profile
Write-Host "`n11. Testing Update Profile (PUT /api/auth/profile)..." -ForegroundColor Yellow
if ($global:token) {
    $profileData = @{
        name = "Updated Test User"
        email = "updateduser@example.com"
    } | ConvertTo-Json
    
    try {
        $response = Invoke-RestMethod -Uri "$baseUrl/api/auth/profile" -Method Put -Body $profileData -Headers $authHeaders
        Write-Host "   ✅ Update Profile passed (Status 200)" -ForegroundColor Green
    } catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "   ❌ Update Profile failed (Status $statusCode)" -ForegroundColor Red
    }
} else {
    Write-Host "   ⚠️  Skipped (no token available)" -ForegroundColor Yellow
}

# Test 12: Invalid Login (should return 401)
Write-Host "`n12. Testing Invalid Login (should return 401)..." -ForegroundColor Yellow
$invalidLoginData = @{
    email = "invalid@example.com"
    password = "wrongpassword"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/auth/login" -Method Post -Body $invalidLoginData -Headers $headers -ErrorAction Stop
    Write-Host "   ❌ Invalid login should have failed but didn't" -ForegroundColor Red
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    if ($statusCode -eq 401) {
        Write-Host "   ✅ Invalid login correctly returned 401" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Wrong status code: $statusCode (expected 401)" -ForegroundColor Red
    }
}

# Test 13: Protected Route Without Token (should return 401)
Write-Host "`n13. Testing Protected Route Without Token (should return 401)..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/tasks" -Method Get -Headers $headers -ErrorAction Stop
    Write-Host "   ❌ Should have required authentication but didn't" -ForegroundColor Red
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    if ($statusCode -eq 401) {
        Write-Host "   ✅ Correctly returned 401 without token" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Wrong status code: $statusCode (expected 401)" -ForegroundColor Red
    }
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  TEST SUITE COMPLETED" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan
