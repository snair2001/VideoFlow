/**
 * Configuration Management System
 * 
 * DSA CONCEPTS USED:
 * 1. Configuration Management - Centralized data structure
 * 2. Helper Functions - Utility functions with specific purposes
 * 3. Environment Variables - External configuration handling
 * 4. Object-Oriented Design - Structured data organization
 * 5. Default Values - Fallback configuration system
 * 6. Validation Functions - Boolean logic for configuration checks
 */

// Configuration file for Premium Flow application

// Pinata IPFS Configuration
// Time Complexity: O(1) for configuration access
// Space Complexity: O(1) for configuration storage
export const PINATA_CONFIG = {
  JWT: process.env.REACT_APP_PINATA_JWT || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1M2RhMTZjMy1jYzJhLTRlOTAtYWM4MS01ZTE2MDNmMGI5NWEiLCJlbWFpbCI6InBhdmFua3VtYXJrdi4yM21jYUBjYW1icmlkZ2UuZWR1LmluIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6Ijg0YTY2NGM5MmIyMmY2MWUwNTlhIiwic2NvcGVkS2V5U2VjcmV0IjoiNWI0NTljMmMzMWY5YzZhMjEyM2IyMDU1MDI0N2JjOTNiZjljOGY2MDM3NDEzNTg5Y2IzMjc5Zjk1YTJmZDE0NSIsImV4cCI6MTc4MjA0MTI5M30._sjHK_aGVSXXwSbeFZ-9qcDM3Omu4oVNxZkjJX_edUQ",
  API_URL: "https://api.pinata.cloud/pinning/pinFileToIPFS",
  GATEWAY_URL: "https://ipfs.io/ipfs/"
};

// Flow EVM Testnet Configuration
// Time Complexity: O(1) for configuration access
// Space Complexity: O(1) for configuration storage
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
// Time Complexity: O(1) for configuration access
// Space Complexity: O(1) for configuration storage
export const APP_CONFIG = {
  NAME: "Premium Flow",
  DESCRIPTION: "PayPerView Video Platform on Flow EVM",
  VERSION: "1.0.0"
};

// Default Values - Fallback configuration system
// Time Complexity: O(1) for default value access
// Space Complexity: O(1) for default value storage
export const DEFAULTS = {
  DISPLAY_TIME: 3600, // 1 hour in seconds
  MIN_PRICE: 0.001,   // Minimum price in FLOW
  MAX_FILE_SIZE: 100 * 1024 * 1024 // 100MB
};

// VALIDATION FUNCTION - Configuration check algorithm
// Time Complexity: O(1) for string comparison
// Space Complexity: O(1) for boolean result
export const isPinataConfigured = () => {
  return PINATA_CONFIG.JWT && PINATA_CONFIG.JWT !== "YOUR_PINATA_JWT_TOKEN_HERE";
};

// HELPER FUNCTION - Header generation for API calls
// Time Complexity: O(1) for object creation
// Space Complexity: O(1) for header object
export const getPinataHeaders = (contentType = "multipart/form-data") => {
  return {
    Authorization: `Bearer ${PINATA_CONFIG.JWT}`,
    "Content-Type": contentType,
  };
}; 

