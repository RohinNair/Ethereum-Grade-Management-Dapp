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
        addCandidate("Bob");
        addCandidate("Marley");
    }

    function addStudent (string _name) private {
        studentsCount++;
        students[studentsCount] = Student(studentsCount, _name, "Bahasa Malaysia", 0);
    }
}