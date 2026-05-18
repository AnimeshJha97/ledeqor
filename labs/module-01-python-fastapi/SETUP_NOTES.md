# Setup Notes

## Current Local Verification Status

The lab code is written, but tests were not executed in this workspace because neither `python` nor `py` is currently available from PowerShell.

Observed commands:

```powershell
python --version
py --version
```

Both failed locally.

## Fix

Install Python from https://www.python.org/downloads/ and enable:

```text
Add python.exe to PATH
```

Then reopen PowerShell and verify:

```powershell
python --version
```

After that, run:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
pytest
```

