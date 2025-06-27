# Premium Flow - PayPerView Video Platform

A decentralized pay-per-view video platform built on Flow EVM Testnet with IPFS storage.

## 🚀 Features

- **Pay-per-view system**: Users pay FLOW tokens to watch videos
- **Time-based access**: Videos have configurable display times
- **IPFS integration**: Videos and thumbnails stored on IPFS via Pinata
- **Flow EVM Testnet**: All transactions on Flow EVM Testnet
- **MetaMask integration**: Seamless wallet connection
- **Centralized configuration**: Easy environment variable setup

## 📋 Prerequisites

- Node.js (v14 or higher)
- MetaMask wallet
- Flow EVM Testnet tokens
- Pinata account for IPFS storage

## 🛠️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/pavankv241/Premium-Flow.git
cd Premium-Flow
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Update `.env` with your Pinata JWT token:
```env
REACT_APP_PINATA_JWT=your_actual_pinata_jwt_token_here
```

3. Get your Pinata JWT token:
   - Go to [Pinata](https://app.pinata.cloud/) and create an account
   - Navigate to API Keys section
   - Create a new API key or use existing one
   - Copy the JWT token

### 4. Get Flow EVM Testnet Tokens
1. Add Flow EVM Testnet to MetaMask:
   - Network Name: Flow EVM Testnet
   - RPC URL: https://testnet.evm.nodes.onflow.org
   - Chain ID: 0x221 (545)
   - Currency Symbol: FLOW

2. Get testnet tokens from:
   - [Flow Faucet](https://testnet-faucet-v2.onflow.org/)
   - [Flow Discord](https://discord.gg/flow) #testnet-faucet channel

### 5. Run the Application
```bash
npm start
```

The application will be available at `http://localhost:3000`

## 🎯 How to Use

### For Content Creators:
1. Connect your MetaMask wallet
2. Navigate to "Create" page
3. Upload video file and thumbnail image
4. Set price and display time
5. Click "Upload Video"

### For Viewers:
1. Connect your MetaMask wallet
2. Browse available videos
3. Pay the required FLOW tokens to watch
4. Enjoy the video for the specified duration

## 🔧 Smart Contract

The application uses a PayPerView smart contract deployed on Flow EVM Testnet:

- **Contract Address**: `0xfd82912dEd827BE2C4317bCb290b81b58Bf4CD6F`
- **Network**: Flow EVM Testnet
- **Functions**:
  - `uploadVideo()` - Upload new videos
  - `payToView()` - Pay to watch videos
  - `canView()` - Check viewing access
  - `getVideos()` - Get all videos

## 📁 Project Structure

```
src/
├── config.js              # Centralized configuration
├── contractConfig.js      # Flow EVM contract configuration
├── App.js                # Main application component
├── components/           # React components
│   ├── Create.jsx       # Video upload component
│   ├── NFTs.jsx         # Video listing component
│   ├── Cards.jsx        # Video card component
│   ├── PlayerCard.jsx   # Video player component
│   └── Nav.jsx          # Navigation component
├── .env.example         # Environment variables template
└── .env                 # Your environment variables (create this)
```

## ⚙️ Configuration

The application uses a centralized configuration system:

### Environment Variables
- `REACT_APP_PINATA_JWT` - Your Pinata JWT token for IPFS uploads

### Default Values
- Display Time: 3600 seconds (1 hour)
- Minimum Price: 0.001 FLOW
- Max File Size: 100MB

## 🚨 Important Notes

- **Environment**: This is configured for Flow EVM Testnet
- **Credentials**: Set `REACT_APP_PINATA_JWT` in your `.env` file
- **Tokens**: Ensure you have FLOW testnet tokens for transactions
- **Network**: Make sure MetaMask is connected to Flow EVM Testnet
- **Security**: Never commit your `.env` file to version control

## 🔗 Links

- [Flow EVM Testnet](https://testnet.evm.nodes.onflow.org/)
- [Pinata IPFS](https://app.pinata.cloud/)
- [Flow Faucet](https://testnet-faucet-v2.onflow.org/)

## 📝 License

This project is open source and available under the MIT License.
