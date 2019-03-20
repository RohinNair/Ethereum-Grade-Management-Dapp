pragma solidity ^0.5.0;

contract Grade {
    //Modelling a Student
    struct Student {
        uint id;
        string name;
        uint icno;
        uint subjectCount;
    }

    struct Subject {
        uint subjectId;
        string subjectName;
        uint marks;
        bool graded;
        //uint studentId;
    }

    //Read/write students
    mapping(uint => Student) public students;

    mapping(uint => Subject) public subjects;

    mapping(address => bool) public graders;

    //Store Students Count
    uint public studentsCount;

    uint public subjectsCount;

    event gradedEvent (
        uint indexed _subjectId
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
        addStudent("Bob", 970225015607, 10);
        addStudent("Marley", 980223024302, 10);
    }

    function addSubject (string memory _subjectName) private {
        subjectsCount++;
        subjects[subjectsCount] = Subject(subjectsCount, _subjectName, 0, false);
    }

    function addStudent (string memory _name, uint _icno, uint _subjectCount) private {
        studentsCount++;
        students[studentsCount] = Student(studentsCount, _name, _icno, _subjectCount);
    }

    function grade (uint _subjectId, uint _subjectMarks, bool _graded) public {
        //Require that the subject hasn't been graded before
        require(subjects[_subjectId].graded == false);

        //Require a valid subject
        require(_subjectId > 0 && _subjectId <= subjectsCount);

        //Require a valid grade
        require(_subjectMarks >=0 && _subjectMarks <= 100);

        //Update student grade
        subjects[_subjectId].marks = _subjectMarks;

        subjects[_subjectId].graded = _graded;

        //subjects[_subjectId].studentId = _studentId;

        emit gradedEvent(_subjectId);
    }

    function finalise (uint _subjectId) public {
        //Require that they haven't graded a student before
        require(!graders[msg.sender]);

        //Record that teacher has graded
        graders[msg.sender] = true;

        emit gradedEvent(_subjectId);
    }
}