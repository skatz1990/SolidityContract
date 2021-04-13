// SPDX-License-Identifier: MIT
pragma solidity >= 0.7.0 <0.9.0;

contract Lottery {
    address public manager;
    address payable[] public players;
    
    constructor() {
        manager = msg.sender;
    }
    
    function enter() public payable {
        require(msg.value > .01 ether);
        
        players.push(payable(msg.sender));
    }
    
    function random() private view returns (uint){
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }
    
    function pickWinner() public payable restricted {
        uint index = random() % players.length;
        
        // This.balance grabs the entire contract's balance
        players[index].transfer(address(this).balance);
        players = new address payable[](0);
    }
    
    // Instead of repeating the 'require(msg.sender == manager)'
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
}