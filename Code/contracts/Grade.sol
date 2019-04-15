pragma solidity ^0.5.0;

contract Grade {
    //Modelling Subjects
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
        bool elective;
    }

    struct PendidikanIslam {
        uint PIID;
        uint studentID;
        string studentName;
        uint marks;
        bool graded;
        bool elective;
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

    struct StudentStats {
        uint studId;
        uint totalSubs;
        uint totalMarks;
    }

    /*struct UserAcc {
        uint UAID;
        string username;
        string password;
    }*/

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

    mapping (uint => StudentStats) public ss;

    //mapping(uint => UserAcc) public userAcc;

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

    uint public ssCount;

    uint public totalSub1;

    uint public totalSub2;

    uint public totalMarks1;

    uint public totalMarks2;

    //uint public userAccCount;

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

        /*User Accounts =

        Student = Adam97/6367c48dd193d56ea7b0baad25b19455e529f5ee(abc123)
        University = Nathan68/fe98a77a071167088b8aa1465639c92224456363(nathan68123)
        Teacher*/

    //Constructor
    constructor () public {
        studStats(0, 0);
        studStats(0, 0);
        enrollCore(1, 970224042242, "Adam");
        enrollCore(1, 970113014543, "Steve");
        enrollCore(2, 970224042242, "Adam");
        enrollCore(2, 970113014543, "Steve");
        enrollCore(3, 970224042242, "Adam");
        enrollCore(3, 970113014543, "Steve");
        enrollCore(4, 970224042242, "Adam");
        enrollCore(4, 970113014543, "Steve");
        enrollElective(5);
        enrollElective(5);
        enrollElective(6);
        enrollElective(6);
        enrollElective(7);
        enrollElective(7);
        enrollElective(8);
        enrollElective(8);
        enrollElective(9);
        enrollElective(9);
        enrollElective(10);
        enrollElective(10);
        /*userLogin("Adam97", "abc123");
        userLogin("Nathan68", "123abc");*/
    }

    /*function userLogin(string memory _userName, string memory _password) private {
        userAccCount++;
        userAcc[userAccCount] = UserAcc(userAccCount, _userName, _password);
    }*/

    function studStats(uint _totalSubs, uint _totalMarks) private {
        ssCount++;
        ss[ssCount] = StudentStats(ssCount, _totalSubs, _totalMarks);
    }

    function enrollCore(uint _subjectCode, uint _studentID, string memory _studentName) private {
        if (_subjectCode == 1) {
            bmCount++;
            bm[bmCount] = BahasaMalaysia(bmCount, _studentID, _studentName, 0, false);
            if (bmCount == 1){
                totalSub1++;
                ss[bmCount].totalSubs = totalSub1;
            }
            if (bmCount == 2){
                totalSub2++;
                ss[bmCount].totalSubs = totalSub2;
            }
        }

        if (_subjectCode == 2) {
            biCount++;
            bi[biCount] = BahasaInggeris(biCount, _studentID, _studentName, 0, false);
            if (biCount == 1){
                totalSub1++;
                ss[biCount].totalSubs = totalSub1;
            }
            if (biCount == 2){
                totalSub2++;
                ss[biCount].totalSubs = totalSub2;
            }
        }

        if (_subjectCode == 3) {
            sjCount++;
            sj[sjCount] = Sejarah(sjCount, _studentID, _studentName, 0, false);
            if (sjCount == 1){
                totalSub1++;
                ss[sjCount].totalSubs = totalSub1;
            }
            if (sjCount == 2){
                totalSub2++;
                ss[sjCount].totalSubs = totalSub2;
            }
        }

        if (_subjectCode == 4) {
            maCount++;
            ma[maCount] = Mathematics(maCount, _studentID, _studentName, 0, false);
            if (maCount == 1){
                totalSub1++;
                ss[maCount].totalSubs = totalSub1;
            }
            if (maCount == 2){
                totalSub2++;
                ss[maCount].totalSubs = totalSub2;
            }
        }
    }

    function enrollElective(uint _subjectCode) private {
        if (_subjectCode == 5) {
            pmCount++;
            pm[pmCount] = PendidikanMoral(pmCount, 0, "-", 0, false, false);
        }

        if (_subjectCode == 6) {
            piCount++;
            pi[piCount] = PendidikanIslam(piCount, 0, "-", 0, false, false);
        }

        if (_subjectCode == 7) {
            amCount++;
            am[amCount] = AddMaths(amCount, 0, "-", 0, false, false);
        }

        if (_subjectCode == 8) {
            blCount++;
            bl[blCount] = Biology(blCount, 0, "-", 0, false, false);
        }

        if (_subjectCode == 9) {
            pyCount++;
            py[pyCount] = Physics(pyCount, 0, "-", 0, false, false);
        }

        if (_subjectCode == 10) {
            cmCount++;
            cm[cmCount] = Chemistry(cmCount, 0, "-", 0, false, false);
        }
    }

    function elective (uint _ID, uint _subjectInstanceId, uint _studentID, string memory _studentName) public {
        //Add Maths
        if(_ID == 1) {
        //Require subject has not been enrolled already
        require(am[_subjectInstanceId].elective == false);
        
        am[_subjectInstanceId].studentID = _studentID;
        am[_subjectInstanceId].studentName = _studentName;
        am[_subjectInstanceId].elective = true;
        /*if (_subjectInstanceId == 1){
                totalSub1++;
        }
        if (_subjectInstanceId == 2){
                totalSub2++;
        }*/
        if (_subjectInstanceId == 1){
                totalSub1++;
                ss[_subjectInstanceId].totalSubs = totalSub1;
        }
        if (_subjectInstanceId == 2){
                totalSub2++;
                ss[_subjectInstanceId].totalSubs = totalSub2;
        }
        emit gradedEvent(_ID);
        }

        //Biology
        if(_ID == 2) {
        //Require subject has not been enrolled already
        require(bl[_subjectInstanceId].elective == false);

        bl[_subjectInstanceId].studentID = _studentID;
        bl[_subjectInstanceId].studentName = _studentName;
        bl[_subjectInstanceId].elective = true;
        if (_subjectInstanceId == 1){
                totalSub1++;
                ss[_subjectInstanceId].totalSubs = totalSub1;
        }
        if (_subjectInstanceId == 2){
                totalSub2++;
                ss[_subjectInstanceId].totalSubs = totalSub2;
        }
        emit gradedEvent(_ID);
        }

        //Physics
        if(_ID == 3) {
        //Require subject has not been enrolled already
        require(py[_studentID].elective == false);

        py[_subjectInstanceId].studentID = _studentID;
        py[_subjectInstanceId].studentName = _studentName;
        py[_subjectInstanceId].elective = true;
        if (_subjectInstanceId == 1){
                totalSub1++;
                ss[_subjectInstanceId].totalSubs = totalSub1;
        }
        if (_subjectInstanceId == 2){
                totalSub2++;
                ss[_subjectInstanceId].totalSubs = totalSub2;
        }
        emit gradedEvent(_ID);
        }

        //Chemistry
        if(_ID == 4) {
        //Require subject has not been enrolled already
        require(cm[_subjectInstanceId].elective == false);

        cm[_subjectInstanceId].studentID = _studentID;
        cm[_subjectInstanceId].studentName = _studentName;
        cm[_subjectInstanceId].elective = true;
        if (_subjectInstanceId == 1){
                totalSub1++;
                ss[_subjectInstanceId].totalSubs = totalSub1;
        }
        if (_subjectInstanceId == 2){
                totalSub2++;
                ss[_subjectInstanceId].totalSubs = totalSub2;
        }
        emit gradedEvent(_ID);
        }

        //Pendidikan Moral
        if(_ID == 5) {
        //Require subject has not been enrolled already
        require(pm[_subjectInstanceId].elective == false);

        pm[_subjectInstanceId].studentID = _studentID;
        pm[_subjectInstanceId].studentName = _studentName;
        pm[_subjectInstanceId].elective = true;
        if (_subjectInstanceId == 1){
                totalSub1++;
                ss[_subjectInstanceId].totalSubs = totalSub1;
        }
        if (_subjectInstanceId == 2){
                totalSub2++;
                ss[_subjectInstanceId].totalSubs = totalSub2;
        }
        emit gradedEvent(_ID);
        }

        //Pendidikan Islam
        if(_ID == 6) {
        //Require subject has not been enrolled already
        require(pi[_subjectInstanceId].elective == false);

        pi[_subjectInstanceId].studentID = _studentID;
        pi[_subjectInstanceId].studentName = _studentName;
        pi[_subjectInstanceId].elective = true;
        if (_subjectInstanceId == 1){
                totalSub1++;
                ss[_subjectInstanceId].totalSubs = totalSub1;
        }
        if (_subjectInstanceId == 2){
                totalSub2++;
                ss[_subjectInstanceId].totalSubs = totalSub2;
        }
        emit gradedEvent(_ID);
        }
    }

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

        //Total the Marks
        ss[_ID].totalMarks += _subjectMarks;

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

        //Total the Marks
        ss[_ID].totalMarks += _subjectMarks;

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

        //Total the Marks
        ss[_ID].totalMarks += _subjectMarks;

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

        //Total the Marks
        ss[_ID].totalMarks += _subjectMarks;

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

        //Total the Marks
        ss[_ID].totalMarks += _subjectMarks;

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

        //Total the Marks
        ss[_ID].totalMarks += _subjectMarks;

        emit gradedEvent(_ID);
        }

        if(_subjectIdentifier == 7) {
        //Require that the subject hasn't been graded before
        require(am[_ID].graded == false);

        //Require that the student is enrolled in the elective
        require(am[_ID].elective == true);

        //Require a valid subject
        require(_ID> 0 && _ID <= amCount);

        //Require a valid grade
        require(_subjectMarks >=0 && _subjectMarks <= 100);

        //Update student grade
        am[_ID].marks = _subjectMarks;

        //Indicated subject has been graded
        am[_ID].graded = _graded;

        //Total the Marks
        ss[_ID].totalMarks += _subjectMarks;

        emit gradedEvent(_ID);
        }

        if(_subjectIdentifier == 8) {
        //Require that the subject hasn't been graded before
        require(py[_ID].graded == false);

        //Require that the student is enrolled in the elective
        require(py[_ID].elective == true);

        //Require a valid subject
        require(_ID> 0 && _ID <= pyCount);

        //Require a valid grade
        require(_subjectMarks >=0 && _subjectMarks <= 100);

        //Update student grade
        py[_ID].marks = _subjectMarks;

        //Indicated subject has been graded
        py[_ID].graded = _graded;

        //Total the Marks
        ss[_ID].totalMarks += _subjectMarks;

        emit gradedEvent(_ID);
        }

        if(_subjectIdentifier == 9) {
        //Require that the subject hasn't been graded before
        require(bl[_ID].graded == false);

        //Require that the student is enrolled in the elective
        require(bl[_ID].elective == true);

        //Require a valid subject
        require(_ID> 0 && _ID <= blCount);

        //Require a valid grade
        require(_subjectMarks >=0 && _subjectMarks <= 100);

        //Update student grade
        bl[_ID].marks = _subjectMarks;

        //Indicated subject has been graded
        bl[_ID].graded = _graded;

        //Total the Marks
        ss[_ID].totalMarks += _subjectMarks;

        emit gradedEvent(_ID);
        }

        if(_subjectIdentifier == 10) {
        //Require that the subject hasn't been graded before
        require(cm[_ID].graded == false);

        //Require that the student is enrolled in the elective
        require(cm[_ID].elective == true);

        //Require a valid subject
        require(_ID> 0 && _ID <= cmCount);

        //Require a valid grade
        require(_subjectMarks >=0 && _subjectMarks <= 100);

        //Update student grade
        cm[_ID].marks = _subjectMarks;

        //Indicated subject has been graded
        cm[_ID].graded = _graded;

        //Total the Marks
        ss[_ID].totalMarks += _subjectMarks;

        emit gradedEvent(_ID);
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