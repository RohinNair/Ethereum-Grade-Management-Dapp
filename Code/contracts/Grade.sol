pragma solidity ^0.5.0;

contract Grade {
    //Modelling a Student
    struct Student {
        uint id;
        string name;
        string subject;
        uint marks;
    }

    mapping(uint => Student) public students;

    uint public studentsCount;

    //Constructor
    constructor () public {
        addStudent("Bob");
        addStudent("Marley");
    }

    function addStudent (string memory _name) private {
        studentsCount++;
        students[studentsCount] = Student(studentsCount, _name, "Bahasa Malaysia", 0);
    }
}