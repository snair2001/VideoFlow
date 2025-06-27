// Configuration file for Premium Flow application

// Pinata IPFS Configuration
export const PINATA_CONFIG = {
  JWT: process.env.REACT_APP_PINATA_JWT || "YOUR_PINATA_JWT_TOKEN_HERE",
  API_URL: "https://api.pinata.cloud/pinning/pinFileToIPFS",
  GATEWAY_URL: "https://ipfs.io/ipfs/"
};

// Flow EVM Testnet Configuration
export const FLOW_CONFIG = {
  CONTRACT_ADDRESS: '0xfd82912dEd827BE2C4317bCb290b81b58Bf4CD6F',
  CHAIN_ID: "0x221",
  CHAIN_NAME: "Flow EVM Testnet",
  RPC_URL: "https://testnet.evm.nodes.onflow.org",
  BLOCK_EXPLORER: "https://evm-testnet.flowscan.io",
  NATIVE_CURRENCY: {
    name: "FLOW",
    symbol: "FLOW",
    decimals: 18
  }
};

// Application Configuration
export const APP_CONFIG = {
  NAME: "Premium Flow",
  DESCRIPTION: "PayPerView Video Platform on Flow EVM",
  VERSION: "1.0.0"
};

// Default Values
export const DEFAULTS = {
  DISPLAY_TIME: 3600, // 1 hour in seconds
  MIN_PRICE: 0.001,   // Minimum price in FLOW
  MAX_FILE_SIZE: 100 * 1024 * 1024 // 100MB
};

// Helper function to check if Pinata is configured
export const isPinataConfigured = () => {
  return PINATA_CONFIG.JWT && PINATA_CONFIG.JWT !== "YOUR_PINATA_JWT_TOKEN_HERE";
};

// Helper function to get Pinata headers
export const getPinataHeaders = (contentType = "multipart/form-data") => {
  return {
    Authorization: `Bearer ${PINATA_CONFIG.JWT}`,
    "Content-Type": contentType,
  };
}; 