pragma solidity ^0.5.0;

contract Grade {
    //Modelling a Student
    struct Student {
        uint id;
        string name;
        string subject;
        uint marks;
    }

    //Read/write students
    mapping(uint => Student) public students;

    mapping(address => bool) public graders;

    //Store Students Count
    uint public studentsCount;

    event gradedEvent (
        uint indexed _studentId
    );

    //Constructor
    constructor () public {
        addStudent("Bob");
        addStudent("Marley");
    }

    function addStudent (string memory _name) private {
        studentsCount++;
        students[studentsCount] = Student(studentsCount, _name, "Bahasa Malaysia", 0);
    }

    function grade (uint _studentId) public {
        //Require that they haven't graded a student before
        require(!graders[msg.sender]);

        //Require a valid Student
        require(_studentId > 0 && _studentId <= studentsCount);

        //Record that teacher has graded
        graders[msg.sender] = true;

        //Update student grade
        students[_studentId].marks ++;

        emit gradedEvent(_studentId);
    }
}