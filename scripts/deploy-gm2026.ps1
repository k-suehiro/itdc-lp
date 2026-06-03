# GM2026: gm2026.html を gas/ に同期 → clasp push → GitHub push
$ErrorActionPreference = 'Stop'
$Root = Split-Path $PSScriptRoot -Parent

function Test-Gm2026Changes {
    Push-Location $Root
    try {
        $status = git status --porcelain -- gm2026.html gas/gm2026.html gas/Code.gs gas/appsscript.json 2>$null
        if ($status) { return $true }
        $diff = git diff --name-only HEAD -- gm2026.html gas/ 2>$null
        if ($diff) { return $true }
        return $false
    } finally {
        Pop-Location
    }
}

if (-not (Test-Path "$Root\gm2026.html")) {
    Write-Host 'gm2026.html not found. Skip deploy.'
    exit 0
}

if (-not (Test-Gm2026Changes)) {
    Write-Host 'No GM2026 changes. Skip deploy.'
    exit 0
}

Write-Host 'Sync gm2026.html -> gas/gm2026.html'
Copy-Item "$Root\gm2026.html" "$Root\gas\gm2026.html" -Force

Write-Host 'clasp push...'
Push-Location "$Root\gas"
clasp push --force
Pop-Location

Push-Location $Root
git add gm2026.html gas/gm2026.html

$staged = git diff --cached --name-only -- gm2026.html gas/gm2026.html
if (-not $staged) {
    Write-Host 'Nothing to commit after sync.'
    exit 0
}

$msg = "Update GM2026 program page.`n`nSync to GAS via clasp."
git commit -m $msg
git push origin HEAD
Write-Host 'Deployed: clasp push + GitHub push completed.'
Pop-Location
