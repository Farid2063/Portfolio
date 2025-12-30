# Script to update projects via API
try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/projects/add" -Method POST -ContentType "application/json"
    Write-Host "Projects updated successfully!"
    Write-Host "Response: $($response | ConvertTo-Json -Depth 3)"
} catch {
    Write-Host "Error: Could not connect to server. Make sure the dev server is running on http://localhost:3000"
    Write-Host "Start the server with: npm run dev"
    exit 1
}




