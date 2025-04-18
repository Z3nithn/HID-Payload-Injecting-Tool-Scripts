# 🔐 HID Payload Injecting Tool Scripts

This project demonstrates how to build a **HID (Human Interface Device) payload injector** using a **Raspberry Pi Zero W** and **P4wnP1 A.L.O.A.** OS. It allows you to automate keystroke injection into a Windows system and extract sensitive data — specifically saved **Chrome passwords** — using a custom script.

---

## 📌 Project Overview

The main goal of this tool is to:
- Automate a sequence of keyboard actions on a target Windows machine
- Inject a PowerShell payload that copies and executes a Chrome password extractor
- Save the extracted credentials (`output.csv`) back to the USB storage on the Raspberry Pi

---

## 🛠️ What You Need

### 🔧 Hardware
- Raspberry Pi Zero W
- Micro-USB cable
- MicroSD card (8GB+)

### 💿 Software
- [P4wnP1 A.L.O.A.](https://github.com/mame82/P4wnP1_aloa)


---

## ⚙️ Setup Instructions

### 1️⃣ Flash and Boot P4wnP1
- Flash P4wnP1 A.L.O.A. onto the microSD card using tools like Balena Etcher.
- Insert the SD card into Raspberry Pi Zero W and power it via USB to your PC.

### 2️⃣ Access Web Interface
- Connect to the P4wnP1 Wi-Fi AP or open the interface at `http://172.24.0.1`.
- Enable:
  - HID Keyboard
  - USB Mass Storage

### 3️⃣ Prepare USB Mass Storage
- Create a folder for USB mass storage on your Pi.
- you can use the storage for the copy and pasting any files.
- 
### 4️⃣ Create HID Payload Script
- In the P4wnP1 web UI, go to the Payloads section.
- Create a new HID script that:
  - Opens PowerShell using `GUI + R`
  - Detects the USB drive
  - You can use any hid script

> You can create the HID script using JavaScript format provided in P4wnP1. Adjust delays and paths according to your setup.

### 5️⃣ Trigger the Payload
- Create an action trigger for your payload (e.g., on USB connection).
- Plug the Pi into a target Windows system to start the injection.

---


