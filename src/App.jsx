 import StoreContext from './store/store.js'
 import Home from "./pages/Home/Home.jsx"
 import { useState } from 'react'

function App() {
  const [Walletstore, setWalletStore] = useState({
      Connected:false,
      WalletAddress:"",
      Balance:0,
      Network:"",
      NetworkID:0,
      WalletProvider:"",
      signer:"",
      contract:"",
      contractAddress:"",
      contractABI:"",
  })   
  return (
    <>
    <StoreContext.Provider value={{Walletstore , setWalletStore}}>
     <Home />
    </StoreContext.Provider>
    </>
  )
}

export default App
