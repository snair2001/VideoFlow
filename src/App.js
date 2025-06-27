import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Home from './components/Home';
import NFTs from './components/NFTs';
import Create from './components/Create';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import { toast } from 'react-toastify'
import { ethers } from 'ethers';
import { 
  CONTRACT_ADDRESS, 
  CONTRACT_ABI, 
  NETWORK_CONFIG, 
  getContract, 
  connectWallet 
} from './contractConfig';

function App() {

  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState("");
  const [marketplace, setMarketplace] = useState({});
  const [correctNetwork, setCorrectNetwork] = useState(false)
  const [chainId, setChainId] = useState(null)
  const correctChainId = NETWORK_CONFIG.chainId;
  

  window.ethereum.on("chainChanged", (newChain) => {
    setChainId(newChain);
    console.log(newChain);
    console.log(chainId);
    window.location.href = "/"; // Redirect using window.location
  });

  window.ethereum.on("accountsChanged", () => {
    window.location.href = "/"; // Redirect using window.location
  });

  const switchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: correctChainId }],
      });
    } catch (error) {
      if (error.code === 4902) {
        // Chain not added, add it
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [NETWORK_CONFIG],
          });
        } catch (addError) {
          toast.error("Failed to add Flow EVM Testnet to MetaMask", {
            position: "top-center"
          });
        }
      } else {
        toast.error((
          <div>Some error occurred while switching network <br/> Please switch to Flow EVM Testnet</div>
        ), {
          position: "top-center"
        });
      }
      console.log(error);
    }
  }

  useEffect(() => {
    if (chainId !== correctChainId) {
      console.log("curr chain: " + chainId);
      setCorrectNetwork(false);
      switchNetwork()
    } else if (chainId === correctChainId) {
      console.log("curr chain: " + chainId);
      setCorrectNetwork(true);
    }
  }, [chainId, correctChainId])

  useEffect(() => {
    setLoading(true)
    const loadProvider = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const address = await connectWallet();
          setAccount(address);
          
          const marketplacecontract = await getContract(true);
          setMarketplace(marketplacecontract);
          
          const network = await provider.getNetwork();
          setChainId(network.chainId.toString());
          console.log("Chain ID:", network.chainId.toString());
          
          if (network.chainId.toString() === correctChainId) {
            setCorrectNetwork(true);
          }
          
          setLoading(false);
        } catch (error) {
          console.error("Error loading provider:", error);
          toast.error("Failed to connect wallet", {
            position: "top-center"
          });
          setLoading(false);
        }
      } else {
        console.error("Metamask is not installed");
        toast.error("Please install MetaMask", {
          position: "top-center"
        });
        setLoading(false);
      }
    };

    loadProvider();
  }, []);

  return (
    <BrowserRouter>
      <ToastContainer />
      <div className="App min-h-screen">
        <div className='gradient-bg-welcome h-screen w-screen'>
          <Nav account={account} loading={loading} />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/all-nft" element={<NFTs marketplace={marketplace} account={account} setMarketplace={setMarketplace} />}></Route>
            <Route path="/create" element={<Create marketplace={marketplace} account={account} setMarketplace={setMarketplace} />}></Route>
          </Routes>
        </div>
      </div>

    </BrowserRouter>
  );
}

export default App;
