<#
  scripts/download-images.ps1
  Downloads every photo listed in scripts/images.json from Pexels into public/images/,
  resized for the web (compressed JPEG at the width listed for each slot).

  Usage, from the project root in PowerShell:
    .\scripts\download-images.ps1              # only the photos the site uses
    .\scripts\download-images.ps1 -All         # also download the alternates
  If PowerShell blocks the script, run it once with:
    powershell -ExecutionPolicy Bypass -File .\scripts\download-images.ps1
#>
param(
  [switch]$All
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$outDir = Join-Path $root 'public\images'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$list = (Get-Content (Join-Path $PSScriptRoot 'images.json') -Raw | ConvertFrom-Json).images
if (-not $All) { $list = $list | Where-Object { $_.used } }

$ok = 0
foreach ($img in $list) {
  # Pexels CDN: auto=compress shrinks the file, w= resizes to the slot width.
  $url = "https://images.pexels.com/photos/$($img.id)/pexels-photo-$($img.id).jpeg?auto=compress&cs=tinysrgb&w=$($img.width)"
  $dest = Join-Path $outDir $img.file
  try {
    Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing -Headers @{ 'Accept' = 'image/jpeg' }
    $kb = [math]::Round((Get-Item $dest).Length / 1KB)
    Write-Host ("OK   {0,-28} {1,5} KB  ({2})" -f $img.file, $kb, $img.photographer) -ForegroundColor Green
    $ok++
  } catch {
    Write-Host ("FAIL {0,-28} {1}" -f $img.file, $_.Exception.Message) -ForegroundColor Red
  }
}

Write-Host "`n$ok of $($list.Count) photos saved to $outDir"
Write-Host 'Credits for each photo are in README.md (Image credits) and scripts/images.json.'
