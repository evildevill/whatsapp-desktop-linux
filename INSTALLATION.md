# Installation Guide for WhatsApp Desktop Client

This comprehensive guide walks you through installing the WhatsApp Desktop Client on your Linux system.

## 📋 Prerequisites

- Linux distribution (Ubuntu, Fedora, etc.)
- Terminal basics
- Snap package manager (pre-installed on most Linux distros)

## 📥 Installation Methods

### Method 1: Snap Store (Recommended)

The easiest way to install:

```bash
sudo snap install whatsapp
```

### Method 2: Build from Source

For developers or custom builds:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/evildevill/whatsapp-desktop-linux.git
   cd whatsapp-desktop-linux
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Build the Snap Package**
   ```bash
   npm run dist
   ```

4. **Install Locally**
   ```bash
   cd dist
   sudo snap install --dangerous ./whatsapp_*.snap
   ```

## 🚀 Running the Application

Launch from your app menu or terminal:

```bash
whatsapp
```

## 🗑️ Uninstallation

Remove the app easily:

```bash
sudo snap remove whatsapp
```

## 🔧 Troubleshooting

- **Permission Issues**: Ensure you have sudo access for Snap commands
- **Build Failures**: Check Node.js and npm versions
- **App Won't Start**: Verify all dependencies are installed

## 🤝 Contributing

Help improve this project! Check out our [GitHub repository](https://github.com/evildevill/whatsapp-desktop-linux) for contribution guidelines.

## 👨‍💻 Author

**Waseem Akram**  
GitHub: [@evildevill](https://github.com/evildevill)
