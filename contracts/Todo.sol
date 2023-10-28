// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

contract Todo{

 struct tasklist {
    string taskmessage;
 }

 mapping (address => tasklist[] ) tasklists ;

 function addTodo (string calldata TaskMessege ) public {
     tasklists[msg.sender].push(tasklist({
    
     taskmessage: TaskMessege
    }));
}

 function getTasks ()  public  view returns(tasklist[] memory){
     return tasklists[msg.sender];
}

 function updateTask (string calldata TaskMessege,uint256 _taskIndex ) public {
        tasklists[msg.sender][_taskIndex].taskmessage = TaskMessege;
}
  
 function deleteTask(uint256 _taskIndex) public {
            // delete tasklists[msg.sender][_taskIndex];
       require(_taskIndex < tasklists[msg.sender].length);
       tasklists[msg.sender][_taskIndex] = tasklists[msg.sender][tasklists[msg.sender].length-1];
       tasklists[msg.sender].pop();
}

 function deleteAllTask() public {
    delete tasklists[msg.sender];
} 

}