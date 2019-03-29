pragma solidity ^0.5.0;

contract Grade {
    //Modelling a Student
    struct BahasaMalaysia {
        uint BMID;
        uint studentID;
        string studentName;
        uint marks;
        bool graded;
    }

    struct BahasaInggeris {
        uint BIID;
        uint studentID;
        string studentName;
        uint marks;
        bool graded;
    }

    struct Sejarah {
        uint SJID;
        uint studentID;
        string studentName;
        uint marks;
        bool graded;
    }

    struct Mathematics {
        uint MAID;
        uint studentID;
        string studentName;
        uint marks;
        bool graded;
    }

    struct PendidikanMoral {
        uint PMID;
        uint studentID;
        string studentName;
        uint marks;
        bool graded;
    }

    struct PendidikanIslam {
        uint PIID;
        uint studentID;
        string studentName;
        uint marks;
        bool graded;
    }

    struct AddMaths {
        uint AMID;
        uint studentID;
        string studentName;
        uint marks;
        bool graded;
        bool elective;
    }

    struct Physics {
        uint PYID;
        uint studentID;
        string studentName;
        uint marks;
        bool graded;
        bool elective;
    }

    struct Biology {
        uint BLID;
        uint studentID;
        string studentName;
        uint marks;
        bool graded;
        bool elective;
    }

    struct Chemistry {
        uint CMID;
        uint studentID;
        string studentName;
        uint marks;
        bool graded;
        bool elective;
    }

    //Read/write students
    mapping(uint => BahasaMalaysia) public bm;

    mapping(uint => BahasaInggeris) public bi;

    mapping(uint => Sejarah) public sj;

    mapping(uint => Mathematics) public ma;

    mapping(uint => PendidikanMoral) public pm;

    mapping(uint => PendidikanIslam) public pi;

    mapping(uint => AddMaths) public am;

    mapping(uint => Physics) public py;

    mapping(uint => Biology) public bl;

    mapping(uint => Chemistry) public cm;

    mapping(address => bool) public graders;

    mapping(address => bool) public electives;

    //Store Subject Count

    uint public bmCount;

    uint public biCount;

    uint public sjCount;

    uint public maCount;

    uint public pmCount;

    uint public piCount;

    uint public amCount;

    uint public pyCount;

    uint public blCount;

    uint public cmCount;

    event gradedEvent (
        uint indexed _Id
    );

    /*Subject Codes =

        BM = 1
        BI = 2
        SJ = 3
        MA = 4
        PM = 5
        PI = 6
        AM = 7
        PY = 8
        BL = 9
        CM = 10*/

    //Constructor
    constructor () public {
        /*enrollAM(1, "Adam");
        enrollAM(2, "Steve");
        enrollPY(1, "Adam");
        enrollPY(2, "Steve");
        enrollBL(1, "Adam");
        enrollBL(2, "Steve");
        enrollCM(1, "Adam");
        enrollCM(2, "Steve");*/
        enrollCore(1, 1, "Adam");
        enrollCore(1, 2, "Steve");
        enrollCore(2, 1, "Adam");
        enrollCore(2, 2, "Steve");
        enrollCore(3, 1, "Adam");
        enrollCore(3, 2, "Steve");
        enrollCore(4, 1, "Adam");
        enrollCore(4, 2, "Steve");
        enrollCore(6, 1, "Adam");
        enrollCore(5, 2, "Steve");
    }

    function enrollCore(uint _subjectCode, uint _studentID, string memory _studentName) private {
        if (_subjectCode == 1) {
            bmCount++;
            bm[bmCount] = BahasaMalaysia(bmCount, _studentID, _studentName, 0, false);
        }

        if (_subjectCode == 2) {
            biCount++;
            bi[biCount] = BahasaInggeris(biCount, _studentID, _studentName, 0, false);
        }

        if (_subjectCode == 3) {
            sjCount++;
            sj[sjCount] = Sejarah(sjCount, _studentID, _studentName, 0, false);
        }

        if (_subjectCode == 4) {
            maCount++;
            ma[maCount] = Mathematics(maCount, _studentID, _studentName, 0, false);
        }

        if (_subjectCode == 5) {
            pmCount++;
            pm[pmCount] = PendidikanMoral(pmCount, _studentID, _studentName, 0, false);
        }

        if (_subjectCode == 6) {
            piCount++;
            pi[piCount] = PendidikanIslam(piCount, _studentID, _studentName, 0, false);
        }
    }

    /*function enrollAM (uint _studentID, string memory _studentName) private {
        amCount++;
        am[amCount] = AddMaths(amCount, _studentID, _studentName, 0, false);
    }

    function enrollPY (uint _studentID, string memory _studentName) private {
        pyCount++;
        py[pyCount] = Physics(pyCount, _studentID, _studentName, 0, false);
    }

    function enrollBL (uint _studentID, string memory _studentName) private {
        blCount++;
        bl[blCount] = Biology(blCount, _studentID, _studentName, 0, false);
    }

    function enrollCM (uint _studentID, string memory _studentName) private {
        cmCount++;
        cm[cmCount] = Chemistry(cmCount, _studentID, _studentName, 0, false);
    }*/

    function grade (uint _ID, uint _subjectMarks, uint _subjectIdentifier, bool _graded) public {
        if(_subjectIdentifier == 1) {
        //Require that the subject hasn't been graded before
        require(bm[_ID].graded == false);

        //Require a valid subject
        require(_ID> 0 && _ID <= bmCount);

        //Require a valid grade
        require(_subjectMarks >=0 && _subjectMarks <= 100);

        //Update student grade
        bm[_ID].marks = _subjectMarks;

        //Indicated subject has been graded
        bm[_ID].graded = _graded;

        emit gradedEvent(_ID);
        }

        if(_subjectIdentifier == 2) {
        //Require that the subject hasn't been graded before
        require(bi[_ID].graded == false);

        //Require a valid subject
        require(_ID> 0 && _ID <= biCount);

        //Require a valid grade
        require(_subjectMarks >=0 && _subjectMarks <= 100);

        //Update student grade
        bi[_ID].marks = _subjectMarks;

        //Indicated subject has been graded
        bi[_ID].graded = _graded;

        emit gradedEvent(_ID);
        }

        if(_subjectIdentifier == 3) {
        //Require that the subject hasn't been graded before
        require(sj[_ID].graded == false);

        //Require a valid subject
        require(_ID> 0 && _ID <= sjCount);

        //Require a valid grade
        require(_subjectMarks >=0 && _subjectMarks <= 100);

        //Update student grade
        sj[_ID].marks = _subjectMarks;

        //Indicated subject has been graded
        sj[_ID].graded = _graded;

        emit gradedEvent(_ID);
        }

        if(_subjectIdentifier == 4) {
        //Require that the subject hasn't been graded before
        require(ma[_ID].graded == false);

        //Require a valid subject
        require(_ID> 0 && _ID <= maCount);

        //Require a valid grade
        require(_subjectMarks >=0 && _subjectMarks <= 100);

        //Update student grade
        ma[_ID].marks = _subjectMarks;

        //Indicated subject has been graded
        ma[_ID].graded = _graded;

        emit gradedEvent(_ID);
        }

        if(_subjectIdentifier == 5) {
        //Require that the subject hasn't been graded before
        require(pm[_ID].graded == false);

        //Require a valid subject
        require(_ID> 0 && _ID <= pmCount);

        //Require a valid grade
        require(_subjectMarks >=0 && _subjectMarks <= 100);

        //Update student grade
        pm[_ID].marks = _subjectMarks;

        //Indicated subject has been graded
        pm[_ID].graded = _graded;

        emit gradedEvent(_ID);
        }

        if(_subjectIdentifier == 6) {
        //Require that the subject hasn't been graded before
        require(pi[_ID].graded == false);

        //Require a valid subject
        require(_ID> 0 && _ID <= piCount);

        //Require a valid grade
        require(_subjectMarks >=0 && _subjectMarks <= 100);

        //Update student grade
        pi[_ID].marks = _subjectMarks;

        //Indicated subject has been graded
        pi[_ID].graded = _graded;

        emit gradedEvent(_ID);
        }

        if(_subjectIdentifier == 7) {
        //Require that the subject hasn't been graded before
        require(am[_ID].graded == false);

        //Require a valid subject
        require(_ID> 0 && _ID <= amCount);

        //Require a valid grade
        require(_subjectMarks >=0 && _subjectMarks <= 100);

        //Update student grade
        am[_ID].marks = _subjectMarks;

        //Indicated subject has been graded
        am[_ID].graded = _graded;

        emit gradedEvent(_ID);
        }

        if(_subjectIdentifier == 8) {
        //Require that the subject hasn't been graded before
        require(py[_ID].graded == false);

        //Require a valid subject
        require(_ID> 0 && _ID <= pyCount);

        //Require a valid grade
        require(_subjectMarks >=0 && _subjectMarks <= 100);

        //Update student grade
        py[_ID].marks = _subjectMarks;

        //Indicated subject has been graded
        py[_ID].graded = _graded;

        emit gradedEvent(_ID);
        }

        if(_subjectIdentifier == 9) {
        //Require that the subject hasn't been graded before
        require(bl[_ID].graded == false);

        //Require a valid subject
        require(_ID> 0 && _ID <= blCount);

        //Require a valid grade
        require(_subjectMarks >=0 && _subjectMarks <= 100);

        //Update student grade
        bl[_ID].marks = _subjectMarks;

        //Indicated subject has been graded
        bl[_ID].graded = _graded;

        emit gradedEvent(_ID);
        }

        if(_subjectIdentifier == 10) {
        //Require that the subject hasn't been graded before
        require(cm[_ID].graded == false);

        //Require a valid subject
        require(_ID> 0 && _ID <= cmCount);

        //Require a valid grade
        require(_subjectMarks >=0 && _subjectMarks <= 100);

        //Update student grade
        cm[_ID].marks = _subjectMarks;

        //Indicated subject has been graded
        cm[_ID].graded = _graded;

        emit gradedEvent(_ID);
        }
    }

    function elective (uint _ID, uint _studentID, string memory _studentName) public {
        //Add Maths
        //Require subject has not been enrolled already
        if(_ID == 1) {
            for (uint i = 0; i < amCount; i++) {
                require(am[i].elective != true);
            }
            amCount++;
            am[amCount] = AddMaths(amCount, _studentID, _studentName, 0, false, true);
        }

        //Biology
        if(_ID == 2) {

        }

        //Physics
        if(_ID == 3) {

        }

        //Chemistry
        if(_ID == 4) {

        }
    }

    /*function finalise (uint _subjectId) public {
        //Require that they haven't graded a student before
        require(!graders[msg.sender]);

        //Record that teacher has graded
        graders[msg.sender] = true;

        emit gradedEvent(_subjectId);
    }*/
}