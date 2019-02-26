pragma solidity ^0.5.0;

contract Grade {
    //Read/write subject
    string public subject;

    //Constructor
    constructor () public {
        subject = "Bahasa Malaysia";
    }
}