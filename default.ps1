# configure psake
if ($psake) {
    $psake.log_error = $true
    $psake.use_exit_on_error = $false
    $psake.write_build_summary = $true
}

Set-Variable -scope global -name working_dir                -value (Resolve-Path .)

task default -depends docs

function Stop-ProcessWhereCommandLineMatches {
    param(
        $name,
        $commandLine = $working_dir,
        $processName = ""
    )

    $matches = Get-WmiObject Win32_Process | Select-Object ProcessId, ProcessName, CommandLine
    $matches = $matches | Where-Object { "$($_.CommandLine)".Contains($commandLine) }
    $matches = $matches | Where-Object { "$($_.ProcessName)".Contains($processName) }
    if ($matches.Count -lt 1) {
        return;
    }

    Write-Host "Stopping $($matches.Count) $name ..."
    $matches = $matches | Foreach-Object {
        Write-Host "* Stopping: $($_.ProcessName) ($($_.ProcessId))"
        try {
            $p = Get-Process -Id $_.ProcessId -ea SilentlyContinue
            if ($p) {
                Stop-Process $p -ErrorAction SilentlyContinue
            }
        } catch {}
    }
}


task docs -description "outputs all available tasks" {
    $psake.write_build_summary = $false
    psake -docs -nologo
}

task init:frontend -description "cleanup dist folder" {
    $nodeModulesMissing = -not (Test-Path "$working_dir\node_modules");
    $yarnCheckFailed = $false

    if ($nodeModulesMissing) {
        Write-Host "Directory 'node_modules' is missing ..."
    }

    if (-not $nodeModulesMissing) {
        Write-Host "Executing 'yarn check' ..."
        $yarnCheck = ""
        try {
            $yarnCheck = . yarn check 2>&1
        } catch {
            $yarnCheck += "$_"
        }

        $yarnCheckFailed = "$yarnCheck".contains("not installed") -or "$yarnCheck".contains("wrong version");
        if ($yarnCheckFailed) {
            Write-Host "Yarn integrity check failed: $yarnCheck"
        }
    }

    if ($nodeModulesMissing -or $yarnCheckFailed) {
        Invoke-Task yarn
    }

    Pop-Location
}

task frontend -depends init:frontend -description "release build of client-side code" {
    yarn dev
}

task frontend:release -depends init:release -description "release build of client-side code" {
    yarn prod
}

task frontend:clean -depends init:frontend -description "clean frontend solutions" {
    Remove-Item "$working_dir\node_modules" -Recurse -Force -Ea SilentlyContinue
    yarn cache clean
}

task yarn -description "update node_module packages" {
    yarn install --check-files
}

task watch {
    Start-Process powershell.exe "& yarn watch"
}

task watch:stop {
    Stop-ProcessWhereCommandLineMatches "watcher scripts" "watcher.ps1"
    Stop-ProcessWhereCommandLineMatches "node processes" "$working_dir" "node.exe"
    Stop-ProcessWhereCommandLineMatches "cmder tabs" "/OMITHOOKSWARN"
}
