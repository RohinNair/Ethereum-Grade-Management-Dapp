pragma solidity ^0.5.0;

contract Election {
    //Read/write subject
    string public subject;

    //Constructor
    constructor () public {
        subject = "Bahasa Malaysia";
    }
}