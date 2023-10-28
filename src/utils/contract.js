const contractAddress = "0x83992e68Bf6961A2EEbaAE649f09E42c960251AD"; //  contract address
const abi = [
  {
    inputs: [{ internalType: "string", name: "TaskMessege", type: "string" }],
    name: "addTodo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "deleteAllTask",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_taskIndex", type: "uint256" }],
    name: "deleteTask",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getTasks",
    outputs: [
      {
        components: [
          { internalType: "string", name: "taskmessage", type: "string" },
        ],
        internalType: "struct MyTodo.tasklist[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "TaskMessege", type: "string" },
      { internalType: "uint256", name: "_taskIndex", type: "uint256" },
    ],
    name: "updateTask",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
]; //   contract ABI

export { contractAddress, abi };
