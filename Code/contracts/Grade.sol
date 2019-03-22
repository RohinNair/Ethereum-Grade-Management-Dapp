pragma solidity ^0.5.0;

contract Grade {
    //Modelling a Student
    struct BahasaMalaysia {
        uint BMID;
        uint studentID;
        string studentName;
        uint marks;
    }

    struct BahasaInggeris {
        uint BIID;
        uint studentID;
        string studentName;
        uint marks;
    }

    /*struct Sejarah {
        uint SJID;
        uint studentID;
        string studentName;
        uint marks;
    }

    struct Mathematics {
        uint MAID;
        uint studentID;
        string studentName;
        uint marks;
    }

    struct PendidikanMoral {
        uint PMID;
        uint studentID;
        string studentName;
        uint marks;
    }

    struct PendidikanIslam {
        uint PIID;
        uint studentID;
        string studentName;
        uint marks;
    }

    struct AddMaths {
        uint AMID;
        uint studentID;
        string studentName;
        uint marks;
    }

    struct Physics {
        uint PYID;
        uint studentID;
        string studentName;
        uint marks;
    }

    struct Biology {
        uint BLID;
        uint studentID;
        string studentName;
        uint marks;
    }

    struct Chemistry {
        uint CMID;
        uint studentID;
        string studentName;
        uint marks;
    }*/

    //Read/write students
    mapping(uint => BahasaMalaysia) public bm;

    mapping(uint => BahasaInggeris) public bi;

    /*mapping(uint => Sejarah) public sj;

    mapping(uint => Mathematics) public ma;

    mapping(uint => PendidikanMoral) public pm;

    mapping(uint => PendidikanIslam) public pi;

    mapping(uint => AddMaths) public am;

    mapping(uint => Physics) public py;

    mapping(uint => Biology) public bl;

    mapping(uint => Chemistry) public cm;*/

    //This code doesn't serve any purpose
    //But when I delete it the program doesn't work
    //So it stays
    mapping(address => bool) public graders;

    //Store Subject Count

    uint public bmCount;

    uint public biCount;

    /*uint public sjCount;

    uint public maCount;

    uint public pmCount;

    uint public piCount;

    uint public amCount;

    uint public pyCount;

    uint public blCount;

    uint public cmCount;*/

    event gradedEvent (
        uint indexed _Id
    );

    //Constructor
    constructor () public {
        enrollBM(1, "Adam");
        enrollBM(2, "Steve");
        enrollBI(1, "Adam");
        enrollBI(2, "Steve");
        /*enrollSJ(1, "Adam");
        enrollSJ(2, "Steve");
        enrollMA(1, "Adam");
        enrollMA(2, "Steve");
        enrollPI(1, "Adam");
        enrollPM(2, "Steve");
        enrollAM(1, "Adam");
        enrollAM(2, "Steve");
        enrollPY(1, "Adam");
        enrollPY(2, "Steve");
        enrollBL(1, "Adam");
        enrollBL(2, "Steve");
        enrollCM(1, "Adam");
        enrollCM(2, "Steve");*/
    }

    function enrollBM (uint _studentID, string memory _studentName) private {
        bmCount++;
        bm[bmCount] = BahasaMalaysia(bmCount, _studentID, _studentName, 0);
    }

    function enrollBI (uint _studentID, string memory _studentName) private {
        biCount++;
        bi[biCount] = BahasaInggeris(biCount, _studentID, _studentName, 0);
    }

    /*function enrollSJ (uint _studentID, string memory _studentName) private {
        sjCount++;
        sj[sjCount] = Sejarah(sjCount, _studentID, _studentName, 0);
    }

    function enrollMA (uint _studentID, string memory _studentName) private {
        maCount++;
        ma[maCount] = Mathematics(maCount, _studentID, _studentName, 0);
    }

    function enrollPM (uint _studentID, string memory _studentName) private {
        pmCount++;
        pm[bmCount] = PendidikanMoral(pmCount, _studentID, _studentName, 0);
    }

    function enrollPI (uint _studentID, string memory _studentName) private {
        piCount++;
        pi[piCount] = PendidikanIslam(piCount, _studentID, _studentName, 0);
    }

    function enrollAM (uint _studentID, string memory _studentName) private {
        amCount++;
        am[amCount] = AddMaths(amCount, _studentID, _studentName, 0);
    }

    function enrollPY (uint _studentID, string memory _studentName) private {
        pyCount++;
        py[pyCount] = Physics(pyCount, _studentID, _studentName, 0);
    }

    function enrollBL (uint _studentID, string memory _studentName) private {
        blCount++;
        bl[blCount] = Biology(blCount, _studentID, _studentName, 0);
    }

    function enrollCM (uint _studentID, string memory _studentName) private {
        cmCount++;
        cm[cmCount] = Chemistry(cmCount, _studentID, _studentName, 0);
    }*/

    function grade (uint _BMID, uint _subjectMarks) public {
        //Require that the subject hasn't been graded before
        //require(subjects[_subjectId].graded == false);

        //Require a valid subject
        require(_BMID> 0 && _BMID <= bmCount);

        //Require a valid grade
        require(_subjectMarks >=0 && _subjectMarks <= 100);

        //Update student grade
        bm[_BMID].marks = _subjectMarks;

        //subjects[_subjectId].graded = _graded;

        //subjects[_subjectId].studentId = _studentId;

        emit gradedEvent(_BMID);
    }

    function gradeBI (uint _BIID, uint _subjectMarks) public {
        //Require that the subject hasn't been graded before
        //require(subjects[_subjectId].graded == false);

        //Require a valid subject
        require(_BIID> 0 && _BIID <= biCount);

        //Require a valid grade
        require(_subjectMarks >=0 && _subjectMarks <= 100);

        //Update student grade
        bi[_BIID].marks = _subjectMarks;

        //subjects[_subjectId].graded = _graded;

        //subjects[_subjectId].studentId = _studentId;

        emit gradedEvent(_BIID);
    }

    /*function finalise (uint _subjectId) public {
        //Require that they haven't graded a student before
        require(!graders[msg.sender]);

        //Record that teacher has graded
        graders[msg.sender] = true;

        emit gradedEvent(_subjectId);
    }*/
}