pragma solidity ^0.5.0;

contract Grade {
    //Modelling a Student
    struct Student {
        uint id;
        string name;
        string subject;
        uint marks;
    }

    struct Subject {
        uint subjectId;
        string subjectName;
        uint marks;
    }

    //Read/write students
    mapping(uint => Student) public students;

    mapping(uint => Subject) public subjects;

    mapping(address => bool) public graders;

    //Store Students Count
    uint public studentsCount;

    uint public subjectsCount;

    event gradedEvent (
        uint indexed _studentId
    );

    //Constructor
    constructor () public {
        addSubject("Bahasa Malaysia");
        addSubject("Bahasa Inggeris");
        addSubject("Pendidikan Islam");
        addSubject("Pendididkan Moral");
        addSubject("Sejarah");
        addSubject("Mathematics");
        addSubject("Physics");
        addSubject("Chemistry");
        addSubject("Biology");
        addSubject("Add Maths");
        addStudent("Sempoi");
        addStudent("Bob");
        addStudent("Marley");
        addStudent("Bobo");
    }

    function addSubject (string memory _subjectName) private {
        subjectsCount++;
        subjects[subjectsCount] = Subject(subjectsCount, _subjectName, 0);
    }

    function addStudent (string memory _name) private {
        studentsCount++;
        students[studentsCount] = Student(studentsCount, _name, "Bahasa Malaysia", 0);
    }

    function grade (uint _subjectId, uint _subjectMarks) public {
        //Require that they haven't graded a student before
        //require(!graders[msg.sender]);

        //Require a valid Student
        require(_subjectId > 0 && _subjectId <= subjectsCount);

        //Require a valid grade
        require(_subjectMarks >=0 && _subjectMarks <= 100);

        //Record that teacher has graded
        //graders[msg.sender] = true;

        //Update student grade
        subjects[_subjectId].marks = _subjectMarks;

        emit gradedEvent(_subjectId);
    }
}