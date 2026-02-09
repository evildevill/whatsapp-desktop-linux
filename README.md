# WhatsApp Desktop Client

[![Get it from the Snap Store](https://snapcraft.io/en/dark/install.svg)](https://snapcraft.io/whatsapp-desktop-linux)

A sleek, unofficial desktop client for WhatsApp, built with Electron. Experience seamless messaging on your Linux desktop with real-time notifications and media sharing.

![Banner](https://raw.githubusercontent.com/evildevill/whatsapp-desktop-linux/main/screenshots/banner.jpeg)

## ✨ Features

- 🚀 **Cross-Platform**: Compatible with Linux, Windows, and macOS
- 💬 **Instant Messaging**: Stay connected with friends and family
- 📎 **Media Sharing**: Share photos, videos, and documents effortlessly
- 🔔 **Desktop Notifications**: Never miss a message
- 🔒 **Secure**: Built on WhatsApp's web interface

![Screenshot](https://github.com/evildevill/whatsapp-desktop-linux/blob/main/screenshots/image1.png)

## 📥 Installation

### From Snap Store (Recommended)

```bash
sudo snap install whatsapp-desktop-linux
```

### Build from Source

1. **Clone the Repository**
   ```bash
   git clone https://github.com/evildevill/whatsapp-desktop-linux.git
   cd whatsapp-desktop-linux
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Locally** (Optional)
   ```bash
   npm start
   ```

4. **Build the Snap Package**
   ```bash
   npm run dist
   ```

5. **Install the Package**
   ```bash
   cd dist
   sudo snap install --dangerous ./whatsapp_*.snap
   ```

## 🚀 Usage

Launch the app from your applications menu or via terminal:

```bash
whatsapp-desktop-linux
```

## 🗑️ Uninstallation

To remove the app:

```bash
sudo snap remove whatsapp-desktop-linux
```

## 🤝 Contributing

We welcome contributions! Feel free to:

- Report bugs
- Suggest features
- Submit pull requests

Fork the repo and get started!

## 📄 License

Licensed under the MIT License. See [LICENSE](./LICENSE) for details.

## 🙏 Acknowledgments

- **Electron** - The framework powering this app
- **WhatsApp** - For the amazing messaging platform

## 👨‍💻 Author

**Waseem Akram**  
GitHub: [@evildevill](https://github.com/evildevill)
