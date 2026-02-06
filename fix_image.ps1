 $base64Path = "E:\CODESPACES\FINAL YEAR\WHISTLE\supabase\functions\send-onboarding-email\whistle_base64.txt"
$targetFile = "E:\CODESPACES\FINAL YEAR\WHISTLE\supabase\functions\send-onboarding-email\index.ts"

# Clean base64 - remove first and last line (headers)
$lines = Get-Content $base64Path
# Check if headers exist, if so strip them. If not, assume raw base64.
if ($lines[0] -match "^-----BEGIN") {
    $clean = $lines[1..($lines.Count-2)] -join ""
} else {
    $clean = $lines -join ""
}

# Read target file
$content = Get-Content $targetFile -Raw

# Replace placeholder
$newContent = $content -replace "__IMAGE_PLACEHOLDER__", $clean

# Write back
Set-Content -Path $targetFile -Value $newContent -Encoding UTF8
Write-Host "Image injected successfully."
