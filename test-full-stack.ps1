# Full-Stack Application Automated Test Script
# Tests all API endpoints and functionality

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "🧪 FULL-STACK APPLICATION TEST SUITE" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$API_URL = "http://localhost:5000/api"
$testResults = @()
$testEmail = "test_$(Get-Random)@example.com"
$testPassword = "Test123456"
$testName = "Test User"
$token = ""
$userId = ""
$taskId = ""

function Test-Endpoint {
    param(
        [string]$Name,
        [scriptblock]$Test
    )
    
    Write-Host "Testing: $Name" -NoNewline
    try {
        & $Test
        Write-Host " ✅ PASS" -ForegroundColor Green
        $script:testResults += @{ Name = $Name; Result = "PASS" }
        return $true
    } catch {
        Write-Host " ❌ FAIL" -ForegroundColor Red
        Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Yellow
        $script:testResults += @{ Name = $Name; Result = "FAIL"; Error = $_.Exception.Message }
        return $false
    }
}

Write-Host "🔍 Testing Backend Endpoints...`n" -ForegroundColor Yellow

# Test 1: Health Check
Test-Endpoint "1. Health Check" {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/health" -Method GET
    if ($response.status -ne "OK") {
        throw "Health check failed"
    }
}

# Test 2: Register User
Test-Endpoint "2. User Registration" {
    $body = @{
        name = $testName
        email = $testEmail
        password = $testPassword
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "$API_URL/auth/register" -Method POST -Body $body -ContentType "application/json"
    
    if (-not $response.token) {
        throw "No token returned"
    }
    if ($response.email -ne $testEmail) {
        throw "Email mismatch"
    }
    
    $script:token = $response.token
    $script:userId = $response._id
}

# Test 3: Login
Test-Endpoint "3. User Login" {
    $body = @{
        email = $testEmail
        password = $testPassword
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "$API_URL/auth/login" -Method POST -Body $body -ContentType "application/json"
    
    if (-not $response.token) {
        throw "No token returned"
    }
    if ($response.email -ne $testEmail) {
        throw "Email mismatch"
    }
}

# Test 4: Get Current User (Me)
Test-Endpoint "4. Get Current User" {
    $headers = @{
        "Authorization" = "Bearer $script:token"
    }
    
    $response = Invoke-RestMethod -Uri "$API_URL/auth/me" -Method GET -Headers $headers
    
    if ($response.email -ne $testEmail) {
        throw "Email mismatch"
    }
}

# Test 5: Create Task
Test-Endpoint "5. Create Task" {
    $headers = @{
        "Authorization" = "Bearer $script:token"
        "Content-Type" = "application/json"
    }
    
    $body = @{
        title = "Test Task"
        description = "This is a test task"
        completed = $false
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "$API_URL/tasks" -Method POST -Headers $headers -Body $body
    
    if ($response.data.title -ne "Test Task") {
        throw "Task title mismatch"
    }
    
    $script:taskId = $response.data._id
}

# Test 6: Get All Tasks
Test-Endpoint "6. Get All Tasks" {
    $headers = @{
        "Authorization" = "Bearer $script:token"
    }
    
    $response = Invoke-RestMethod -Uri "$API_URL/tasks" -Method GET -Headers $headers
    
    if ($response.data.Count -eq 0) {
        throw "No tasks found"
    }
}

# Test 7: Get Single Task
Test-Endpoint "7. Get Single Task" {
    $headers = @{
        "Authorization" = "Bearer $script:token"
    }
    
    $response = Invoke-RestMethod -Uri "$API_URL/tasks/$script:taskId" -Method GET -Headers $headers
    
    if ($response.data._id -ne $script:taskId) {
        throw "Task ID mismatch"
    }
}

# Test 8: Update Task
Test-Endpoint "8. Update Task" {
    $headers = @{
        "Authorization" = "Bearer $script:token"
        "Content-Type" = "application/json"
    }
    
    $body = @{
        title = "Updated Test Task"
        description = "This task has been updated"
        completed = $true
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "$API_URL/tasks/$script:taskId" -Method PUT -Headers $headers -Body $body
    
    if ($response.data.title -ne "Updated Test Task") {
        throw "Task not updated"
    }
    if ($response.data.completed -ne $true) {
        throw "Task completion status not updated"
    }
}

# Test 9: Update User Profile
Test-Endpoint "9. Update User Profile" {
    $headers = @{
        "Authorization" = "Bearer $script:token"
        "Content-Type" = "application/json"
    }
    
    $body = @{
        name = "Updated Test User"
        email = $testEmail
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "$API_URL/users/$script:userId" -Method PUT -Headers $headers -Body $body
    
    if ($response.data.name -ne "Updated Test User") {
        throw "User name not updated"
    }
}

# Test 10: Get All Users (Admin)
Test-Endpoint "10. Get All Users" {
    $headers = @{
        "Authorization" = "Bearer $script:token"
    }
    
    try {
        $response = Invoke-RestMethod -Uri "$API_URL/users" -Method GET -Headers $headers
        # Success - user might be admin
    } catch {
        # Expected for non-admin users
        if ($_.Exception.Response.StatusCode -eq 403) {
            # This is expected for non-admin users
            throw "Expected 403 for non-admin (This is correct behavior)"
        }
    }
}

# Test 11: Delete Task
Test-Endpoint "11. Delete Task" {
    $headers = @{
        "Authorization" = "Bearer $script:token"
    }
    
    $response = Invoke-RestMethod -Uri "$API_URL/tasks/$script:taskId" -Method DELETE -Headers $headers
    
    if ($response.message -notlike "*deleted*") {
        throw "Task not deleted"
    }
}

# Test 12: Delete User (Cleanup)
Test-Endpoint "12. Delete User (Cleanup)" {
    $headers = @{
        "Authorization" = "Bearer $script:token"
    }
    
    $response = Invoke-RestMethod -Uri "$API_URL/users/$script:userId" -Method DELETE -Headers $headers
    
    if ($response.message -notlike "*deleted*") {
        throw "User not deleted"
    }
}

# Test 13: Invalid Token
Test-Endpoint "13. Invalid Token Handling" {
    $headers = @{
        "Authorization" = "Bearer invalid_token_12345"
    }
    
    try {
        Invoke-RestMethod -Uri "$API_URL/auth/me" -Method GET -Headers $headers
        throw "Should have failed with invalid token"
    } catch {
        if ($_.Exception.Response.StatusCode -ne 401) {
            throw "Expected 401 status code"
        }
    }
}

# Test 14: No Token
Test-Endpoint "14. No Token Handling" {
    try {
        Invoke-RestMethod -Uri "$API_URL/tasks" -Method GET
        throw "Should have failed without token"
    } catch {
        if ($_.Exception.Response.StatusCode -ne 401) {
            throw "Expected 401 status code"
        }
    }
}

# Test 15: Invalid Credentials
Test-Endpoint "15. Invalid Login Credentials" {
    $body = @{
        email = "nonexistent@example.com"
        password = "wrongpassword"
    } | ConvertTo-Json
    
    try {
        Invoke-RestMethod -Uri "$API_URL/auth/login" -Method POST -Body $body -ContentType "application/json"
        throw "Should have failed with invalid credentials"
    } catch {
        if ($_.Exception.Response.StatusCode -ne 401) {
            throw "Expected 401 status code"
        }
    }
}

# Print Summary
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "📊 TEST RESULTS SUMMARY" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$passCount = ($testResults | Where-Object { $_.Result -eq "PASS" }).Count
$failCount = ($testResults | Where-Object { $_.Result -eq "FAIL" }).Count
$totalTests = $testResults.Count

Write-Host "Total Tests: $totalTests" -ForegroundColor White
Write-Host "Passed: $passCount" -ForegroundColor Green
Write-Host "Failed: $failCount" -ForegroundColor Red
Write-Host "Success Rate: $([math]::Round(($passCount / $totalTests) * 100, 2))%`n" -ForegroundColor Yellow

if ($failCount -gt 0) {
    Write-Host "Failed Tests:" -ForegroundColor Red
    $testResults | Where-Object { $_.Result -eq "FAIL" } | ForEach-Object {
        Write-Host "  - $($_.Name)" -ForegroundColor Yellow
        if ($_.Error) {
            Write-Host "    Error: $($_.Error)" -ForegroundColor Gray
        }
    }
}

Write-Host "`n========================================`n" -ForegroundColor Cyan

if ($passCount -eq $totalTests) {
    Write-Host "🎉 ALL TESTS PASSED! 🎉" -ForegroundColor Green
    exit 0
} else {
    Write-Host "⚠️  SOME TESTS FAILED" -ForegroundColor Yellow
    exit 1
}
