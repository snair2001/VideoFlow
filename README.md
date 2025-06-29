

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

et-faucet-v2.onflow.org/)
   - [Flow Discord](https://discord.gg/flow) #testnet-faucet channel

### 5. Run the Application
```bash
npm start
```

The application will be available at `http://localhost:3000`


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
