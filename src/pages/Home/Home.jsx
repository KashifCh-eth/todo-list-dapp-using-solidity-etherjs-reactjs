import React, { useEffect } from "react";
import { useContext, useState } from "react";
import StoreContext from "../../store/store.js";
import logo from "../../assets/logo.png";
import { ethers } from "ethers";
import { contractAddress, abi } from "../../utils/contract.js";
import AddTask from "../../components/AddTask.jsx";
 
function Home() {
  const { Walletstore, setWalletStore } = useContext(StoreContext);
  const [loder, setLoder] = useState(false);

  const connecthandeler = async () => {
    try {
      setLoder(true);
      if (typeof window.ethereum !== "undefined") {
        if (localStorage.getItem("Connected") !== "true") {
          const RequestForPremmision = await window.ethereum.request({
            method: "wallet_requestPermissions",
            params: [{ eth_accounts: {} }],
        });
       }
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const network = await provider.getNetwork();
          const networkname = network.name;
          const networkid = network.chainId;
          const address = await signer.getAddress();
          const contract = new ethers.Contract(contractAddress, abi, signer);
          setWalletStore({
            Connected: true,
            WalletAddress: address,
            Balance: 0,
            Network: networkname,
            NetworkID: networkid,
            WalletProvider: "Metamask",
            signer: signer,
            contract: contract,
            contractAddress: contractAddress,
            contractABI: abi,
          }); 
      }else{
        alert("Please Install Metamask")
      }
      setLoder(false);
      localStorage.setItem("Connected", true);
    } catch (error) {
      if (error.code === 4001) {
        // EIP-1193 userRejectedRequest error
        console.log("Permissions needed to continue.");
      } else {
        console.error(error);
      }
    }
  };

  const ChangeNetwork = async () => {
    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x13881" }],
      });
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("Connected") == "true") {
      connecthandeler();
    }
  }, []);

  return (
    <div className="flex flex-col items-center">
      <img src={logo} alt="Logo" border="0" className="w-40" />
      {Walletstore.Connected ? (
        <>
          <div className="text-2xl font-bold text-center">
            Connected to {Walletstore.WalletAddress.slice(0, 6)}...
          </div>
          {Walletstore.NetworkID == 80001 ? (
            <>
             
              <AddTask />
             
            
            </>
          ) : (
            <>
              <div className="text-2xl font-bold text-center text-red-500">
                Change Network to Mumbai Testnet
              </div>
              <button
                type="button"
                className="py-2 px-4 border"
                onClick={ChangeNetwork}
              >
                Change Network
              </button>
            </>
          )}
        </>
      ) : loder ? (
        <button type="button" className="py-2 px-4 border" disabled>
          Connecting...
        </button>
      ) : (
        <button
          type="button"
          className="py-2 px-4 border"
          onClick={connecthandeler}
        >
          Connect to Wallet
        </button>
      )}
    </div>
  );
}

export default Home;
