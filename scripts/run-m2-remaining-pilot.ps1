[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'

if ([string]::IsNullOrWhiteSpace($env:OPENAI_API_KEY)) {
    Write-Error 'OPENAI_API_KEY is missing in this PowerShell session.'
    exit 2
}

$env:EVE_NARRATIVE_PROVIDER = 'openai'
$env:EVE_NARRATIVE_MODEL = 'gpt-5.6-sol'
$env:EVE_NARRATIVE_PILOT_APPROVED = '1'
$env:EVE_NARRATIVE_TIMEOUT_MS = '90000'
Remove-Item Env:M2_SMOKE_ONLY -ErrorAction SilentlyContinue

& node --no-warnings --experimental-strip-types --experimental-loader ./scripts/ts-strip-loader.mjs ./scripts/m2-remaining-pilot-cli.mjs
$exitCode = $LASTEXITCODE
if ($exitCode -ne 0) {
    exit $exitCode
}
