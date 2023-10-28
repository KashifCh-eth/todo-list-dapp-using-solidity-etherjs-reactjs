import { useState } from "react";
import { useContext } from "react";
import StoreContext from "../store/store.js";
import TaskList from "./TaskList.jsx";
 
function AddTask() {
  const [task, setTask] = useState("");
  const [loder, setLoder] = useState(false);

  const { Walletstore, setWalletStore } = useContext(StoreContext);

  const addTaskHandelr = async () => {
   try{
    if (Walletstore.Connected == true) {
      if (Walletstore.NetworkID == 80001) {
        setLoder(true);
        const contract = Walletstore.contract;
        const TaskHash = await contract.addTodo(task);
        const receipt = await TaskHash.wait();
        console.log(`Task Hash: ${ TaskHash.hash }`);
        if(receipt){
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

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Add Task"
          className="border-2 border-gray-400 rounded-lg p-2 m-2 "
          onChange={(e) => {
            setTask(e.target.value);
          }}
        />
        {loder ? (
          <button type="button" className="py-2 px-4 border" disabled>
            Adding please wait...
          </button>
        ) : (
          <button
            type="button"
            className="py-2 px-4 border"
            onClick={addTaskHandelr}
          >
            Add Task
          </button>
        )}
        <div>
          <TaskList />
      
        </div>
      </div>
    </>
  );
}

export default AddTask;
