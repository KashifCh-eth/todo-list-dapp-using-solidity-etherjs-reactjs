import React from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import StoreContext from "../store/store.js";
import Task from "./SubTask/Task.jsx";
 
// import Task from "./Task.jsx";

function TaskList() {
  const { Walletstore, setWalletStore } = useContext(StoreContext);
  const [task, setTask] = useState([]);
  const [loderone, setLoderone] = useState(false);
  const [EditIndex, setEditIndex] = useState(false);
  const [EditValue , setEditValue] = useState("");
  // const [tasklist , setTaskList] = useState([]);

  const getTask = async () => {
    if (Walletstore.Connected == true) {
      if (Walletstore.NetworkID == 80001) {
        const contract = Walletstore.contract;
        const task = await contract.getTasks();
        setTask(task.flat());
      } else {
        console.log("Connect to Mumbai Testnet");
      }
    } else {
      console.log("Connect to wallet first");
    }
  };

  const AllDeleteHandler = async () => {
    if (Walletstore.Connected == true) {
      if (Walletstore.NetworkID == 80001) {
        setLoderone(true);
        const contract = Walletstore.contract;
        const task = await contract.deleteAllTask();
        const isDone = await task.wait();
        if(isDone){
          setLoderone(false);
          location.reload();
        }

      } else {
        console.log("Connect to Mumbai Testnet");
      }
    } else {
      console.log("Connect to wallet first");
    }
  };


  const EditHandler = async (task, index) => {
    setEditIndex(true);
   
    // console.log(task, index); 

  }

  // const SaveHandler = async (index) => {
  //   if (Walletstore.Connected == true) {
  //     if (Walletstore.NetworkID == 80001) {
  //       setLoder(true);
  //       const contract = Walletstore.contract;
  //       const task = await contract.updateTask(EditValue,index);
  //       const isDone = await task.wait();
  //       if(isDone){
  //         setLoder(false);
  //         location.reload();
  //       }
  //     } else {
  //       console.log("Connect to Mumbai Testnet");
  //     }
  //   }
  //   // setEditIndex(false);
  //   // setEditValue("");
  //   // console.log(task, index);
  // }
  useEffect(() => {
    getTask();
  }, []);


 
  return (
    <div className=" relative">
   
      {task.length > 0 ? (
        task.map((task, index) => {
          
          return (
            <> 
              <Task task={task} index={index} />
            </>
          );
        })
      ) : (
        <>
          <div>
            <p className="text-center text-2xl">No Task Found</p>
          </div>
        </>
      )}
      <div className="  ">
      
      </div>
      <div className="flex justify-center">
        {task.length > 0 ? (
          loderone ? (
            <button
              type="button"
              className="py-2 px-4 border bg-blue-700 text-white"
              disabled
            >
              Deleting please wait...
            </button>
          ) : (
            <button
              type="button"
              className="py-2 px-4 border bg-blue-600 text-white hover:bg-red-400  duration-200"
              onClick={AllDeleteHandler}
            >
              Delete All Task
            </button>
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default TaskList;
