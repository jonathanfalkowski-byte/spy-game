[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'

if ([string]::IsNullOrWhiteSpace($env:OPENAI_API_KEY)) {
    Write-Output 'OPENAI_API_KEY is missing in this PowerShell session.'
    exit 1
}

$env:EVE_NARRATIVE_PROVIDER = 'openai'
$env:EVE_NARRATIVE_MODEL = 'gpt-5.6-sol'
$env:EVE_NARRATIVE_PILOT_APPROVED = '1'
$env:M2_SMOKE_ONLY = '1'
if ([string]::IsNullOrEmpty($env:EVE_NARRATIVE_TIMEOUT_MS)) {
    $env:EVE_NARRATIVE_TIMEOUT_MS = '90000'
}

$repoRoot = Split-Path -Parent $PSScriptRoot
$reportPath = Join-Path $repoRoot 'qa\reports\m2-1-pilot-latest.json'

Push-Location $repoRoot
try {
    # Capture, but never print, child output: it may contain credentials.
    # Windows PowerShell wraps native stderr as NativeCommandError records;
    # those must not terminate this script before we capture npm's exit code.
    $previousErrorActionPreference = $ErrorActionPreference
    $previousNativeErrorPreference = $PSNativeCommandUseErrorActionPreference
    try {
        $ErrorActionPreference = 'Continue'
        $PSNativeCommandUseErrorActionPreference = $false
        $pilotOutput = @(& npm.cmd run qa:narrative:pilot 2>&1)
        $pilotExitCode = $LASTEXITCODE
    }
    finally {
        $ErrorActionPreference = $previousErrorActionPreference
        $PSNativeCommandUseErrorActionPreference = $previousNativeErrorPreference
    }
    if ($pilotExitCode -ne 0) {
        $providerTimedOut = @($pilotOutput | Where-Object {
            $_.ToString() -match '^Provider error: PROVIDER_TIMEOUT(?:\s|$)'
        }).Count -gt 0
        if ($providerTimedOut) {
            # Only interpolate a validated number, never arbitrary child/env text.
            $timeoutMs = 0
            if ([int]::TryParse($env:EVE_NARRATIVE_TIMEOUT_MS, [ref]$timeoutMs) -and
                $timeoutMs -ge 1000 -and $timeoutMs -le 120000) {
                Write-Output "EVE M2 smoke failed: provider timeout after $timeoutMs ms."
            }
            else {
                Write-Output 'EVE M2 smoke failed: provider timeout.'
            }
            Write-Output 'No automatic retry was attempted.'
        }
        else {
            Write-Output "EVE M2 smoke failed: npm exited with code $pilotExitCode."
        }
        exit $pilotExitCode
    }
}
finally {
    Pop-Location
}

if (-not (Test-Path -LiteralPath $reportPath -PathType Leaf)) {
    Write-Error 'M2 pilot report was not created.'
    exit 1
}

try {
    $report = Get-Content -LiteralPath $reportPath -Raw | ConvertFrom-Json
}
catch {
    Write-Error 'M2 pilot report could not be parsed as JSON.'
    exit 1
}

Write-Output "generatedAt: $($report.generatedAt)"
Write-Output "mode: $($report.mode)"
Write-Output "provider: $($report.provider)"
Write-Output "model: $($report.model)"
Write-Output "plannedCalls: $($report.plannedCalls)"
Write-Output "attemptedExternalCalls: $($report.attemptedExternalCalls)"
Write-Output "completedExternalCalls: $($report.completedExternalCalls)"
Write-Output "failedExternalCalls: $($report.failedExternalCalls)"
Write-Output "skippedAfterFailFast: $($report.skippedAfterFailFast)"

$first = @($report.results)[0]
if ($null -eq $first) {
    Write-Error 'M2 pilot report contains no results.'
    exit 1
}

$firstResult = $first.result
$findingCount = if ($null -eq $firstResult.findings) { 0 } else { @($firstResult.findings).Count }
$rejectedCount = if ($null -eq $firstResult.rejected) { 0 } else { @($firstResult.rejected).Count }
$errorCode = if ($null -eq $firstResult.error) { '<none>' } else { $firstResult.error.code }
$errorStatus = if ($null -eq $firstResult.error -or $null -eq $firstResult.error.status) { '<none>' } else { $firstResult.error.status }
$usage = $firstResult.usage
$inputTokens = if ($null -eq $usage -or $null -eq $usage.inputTokens) { '<unavailable>' } else { $usage.inputTokens }
$outputTokens = if ($null -eq $usage -or $null -eq $usage.outputTokens) { '<unavailable>' } else { $usage.outputTokens }
$reasoningTokens = if ($null -eq $usage -or $null -eq $usage.reasoningTokens) { '<unavailable>' } else { $usage.reasoningTokens }
$totalTokens = if ($null -eq $usage -or $null -eq $usage.totalTokens) { '<unavailable>' } else { $usage.totalTokens }
$estimatedCost = if ($null -eq $firstResult.estimatedCostUsd) { '<unavailable>' } else { $firstResult.estimatedCostUsd }

Write-Output 'firstResult:'
Write-Output "  routeId: $($first.routeId)"
Write-Output "  reviewer: $($first.reviewer)"
Write-Output "  findingCount: $findingCount"
Write-Output "  rejectedCount: $rejectedCount"
Write-Output "  errorCode: $errorCode"
Write-Output "  errorStatus: $errorStatus"
Write-Output "  inputTokens: $inputTokens"
Write-Output "  outputTokens: $outputTokens"
Write-Output "  reasoningTokens: $reasoningTokens"
Write-Output "  totalTokens: $totalTokens"
Write-Output "  estimatedCostUsd: $estimatedCost"

if ($findingCount -gt 0) {
    Write-Output 'findings:'
    $firstResult.findings | ConvertTo-Json -Depth 20
}

if ($rejectedCount -gt 0) {
    Write-Output 'rejected:'
    $firstResult.rejected | ConvertTo-Json -Depth 20
}
