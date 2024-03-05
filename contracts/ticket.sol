// SPDX-License-Identifier: MIT
pragma solidity >=0.8.19;

contract ticket{
    address public manger;
    constructor() {
        
        manger=msg.sender;
    }
    uint public Price;
    mapping(address=>uint )public Guest;
    mapping(address =>bool)public Status;
 
   modifier onlyManger() 
   {
      require(msg.sender ==manger ,"Not the manager");
        _;
   }
   function Set_ticket_price(uint _price)onlyManger()public{
    Price = _price;
   }
   function Buy_ticket(uint total)public payable{
    require(total >0, "You must buy at least one ticket.");
    if(msg.value == (Price*total)){
        Guest[msg.sender]=total;
        Status[msg.sender] = true ;
        // emit Bought(msg.sender,total);
    }     
    else{
        revert("Error! Please check your amount ");
        }
          }
    function Entery()public{
        if(Status[msg.sender]){
           delete Guest[msg.sender];
           delete Status[msg.sender];
          
         }
         else{
             revert("You are not allowed to enter!");
         }
    }  
      

    
}



