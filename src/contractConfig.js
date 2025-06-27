import { ethers } from "ethers";
import { FLOW_CONFIG } from './config';

// Export ethers functions for convenience
export const { parseEther, formatEther } = ethers.utils;

// Contract address on Flow EVM Testnet (newly deployed)
export const CONTRACT_ADDRESS = FLOW_CONFIG.CONTRACT_ADDRESS;

// Contract ABI
export const CONTRACT_ABI = [
  {
    "inputs": [],
    "name": "getVideos",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "uploaders",
        "type": "address[]"
      },
      {
        "internalType": "string[]",
        "name": "videoHashes",
        "type": "string[]"
      },
      {
        "internalType": "string[]",
        "name": "thumbnailHashes",
        "type": "string[]"
      },
      {
        "internalType": "uint256[]",
        "name": "prices",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "displayTimes",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "videoId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "canView",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "videoId",
        "type": "uint256"
      }
    ],
    "name": "payToView",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_videoHash",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_thumbnailHash",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_price",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_displayTime",
        "type": "uint256"
      }
    ],
    "name": "uploadVideo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "videos",
    "outputs": [
      {
        "internalType": "address",
        "name": "uploader",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "videoHash",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "thumbnailHash",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "displayTime",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Flow EVM Testnet configuration
export const NETWORK_CONFIG = {
  chainId: FLOW_CONFIG.CHAIN_ID,
  chainName: FLOW_CONFIG.CHAIN_NAME,
  rpcUrls: [FLOW_CONFIG.RPC_URL],
  nativeCurrency: FLOW_CONFIG.NATIVE_CURRENCY,
  blockExplorerUrls: [FLOW_CONFIG.BLOCK_EXPLORER]
};

// Get contract instance
export const getContract = async (withSigner = false) => {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('MetaMask is not installed');
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  
  if (withSigner) {
    const signer = provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  }
  
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
};

// Connect wallet
export const connectWallet = async () => {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('MetaMask is not installed');
  }

  try {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });
    
    // Switch to Flow EVM Testnet
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: NETWORK_CONFIG.chainId }],
    });
    
    return accounts[0];
  } catch (error) {
    if (error.code === 4902) {
      // Chain not added, add it
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [NETWORK_CONFIG],
      });
      return await connectWallet();
    }
    throw error;
  }
}; 