import React from "react";
import { useState } from "react";
import { useContext } from "react";
import StoreContext from "../../store/store.js";

function Task({ task, index }) {
  const { Walletstore, setWalletStore } = useContext(StoreContext);
  const [EditIndex, setEditIndex] = useState(false);
  const [EditValue, setEditValue] = useState("");
  const [loder, setLoder] = useState(false);
  const[loderone , setLoderone] = useState(false);
 
  const DeleteHandler = async (index) => {
   try{
    if (Walletstore.Connected == true) {
      if (Walletstore.NetworkID == 80001) {
        setLoder(true);
        
        const contract = Walletstore.contract;
        const task = await contract.deleteTask(index);
        const isDone = await task.wait();
        if (isDone) {
          setLoder(false);
          location.reload();
        }
      } else {
        console.log("Connect to Mumbai Testnet");
      }
    } else {
      console.log("Connect to wallet first");
    }
   }catch(error){
     console.log(error.message);
      setLoder(false);
   }
  };

  const EditHandler = async (index, task) => {
    setEditIndex(true);
    setEditValue(task);
  };

  const SaveHandler = async (index, task) => {
  try{
    if (Walletstore.Connected == true) {
      if (Walletstore.NetworkID == 80001) {
        setLoderone(true);
        const contract = Walletstore.contract;
        const task = await contract.updateTask(EditValue, index);
        const isDone = await task.wait();
        if (isDone) {
          setEditIndex(false);
          setLoderone(false);
          setEditValue("");
          location.reload();
        }
       } else {
        console.log("Connect to Mumbai Testnet");
      }
    } else {
      console.log("Connect to wallet first");
    }
  }catch(error){
    console.log(error.message);
    setLoderone(false);
  }
  };

  return (
    <div className="flex p-4 border justify-between m-2">
      {/* <h1 className=' text-red-500'>{task}</h1> */}
      {EditIndex ? (
        <>
          <input
            type="text"
            value={EditValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-32 py-2 px-1 border outline-none border-red-500"
          />
         {
          loderone ? <>
          <button type="button" onClick={() => SaveHandler(index, task)} disabled>Saving...</button>
          </> : <button type="button" onClick={() => SaveHandler(index, task)}>Save!</button>
         }
        </>
      ) : (
        <>
          <h1 className=" text-red-500">{task}</h1>
          <button type="button" onClick={() => EditHandler(index, task)}>
            Edit!
          </button>
        </>
      )}

      {loder ? (
        <button type="button" className="" disabled>
          Deleting...
        </button>
      ) : (
        <button type="button" onClick={() => DeleteHandler(index)}>
          Delete!
        </button>
      )}
    </div>
  );
}

export default Task;
