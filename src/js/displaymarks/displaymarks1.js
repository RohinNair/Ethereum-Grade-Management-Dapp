App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  //Initialize Web3
  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  //Initialize smart contract instance
  initContract: function() {
    $.getJSON("Grade.json", function(grade) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Grade = TruffleContract(grade);
      // Connect provider to interact with contract
      App.contracts.Grade.setProvider(App.web3Provider);

      App.listenForEvents();

      return App.render();
    });
  },

  //Listen for events from smart contract
  listenForEvents: function() {
    App.contracts.Grade.deployed().then(function(instance2) {
      instance2.gradedEvent({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event) {
        console.log("event triggered", event)
        // Reload when a new grade is recorded
        App.render();
      });
    });
  },

  //Calculate Grade function
  calculateGrade: function(marks) {
    var grade ="-";

    if(marks>=90 && marks<=100){
      grade = "A+";
    }
    else
    if(marks>=80 && marks<=89){
      grade = "A";
    }
    else
    if(marks>=75 && marks<=79){
      grade = "A-";
    }
    else
    if(marks>=70 && marks<=74){
      grade = "B+";
    }
    else
    if(marks>=65 && marks<=69){
      grade = "B";
    }
    else
    if(marks>=60 && marks<=64){
      grade = "C+";
    }
    else
    if(marks>=50 && marks<=59){
      grade = "C";
    }
    else
    if(marks>=40 && marks<=49){
      grade = "D";
    }
    else
    if(marks>=30 && marks<=39){
      grade = "E";
    }
    else
    if(marks>=1 && marks<=29){
      grade = "G";
    }

    return grade;
  },

  //Render page function
  render: function() {
    var gradeInstance2;
    //Target specific HTML tags in UI
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load contract data
    App.contracts.Grade.deployed().then(function(instance2) {
      gradeInstance2 = instance2;
      return gradeInstance2.totalSub1();
    }).then(function() {

      //Initialize containers to display student info
      var studentsName = $("#studentsName");
      studentsName.empty();

      var studentsId = $("#studentsId");
      studentsId.empty();

      var subCount = $("#subCount");
      subCount.empty();

      var totalMarks = $("#totalMarks");
      totalMarks.empty();

      var marksPercentage = $("#marksPercentage");
      marksPercentage.empty();

      var studentPointAverage = $("#studentPointAverage");
      studentPointAverage.empty();

      var studentRemarks = $("#studentRemarks");
      studentRemarks.empty();

      var bmMarks = $("#bmMarks");
      bmMarks.empty();
      
      var biMarks = $("#biMarks");
      biMarks.empty();

      var sjMarks = $("#sjMarks");
      sjMarks.empty();

      var maMarks = $("#maMarks");
      maMarks.empty();

      var pmMarks = $("#pmMarks");
      pmMarks.empty();

      var piMarks = $("#piMarks");
      piMarks.empty();

      var amMarks = $("#amMarks");
      amMarks.empty();

      var pyMarks = $("#pyMarks");
      pyMarks.empty();

      var blMarks = $("#blMarks");
      blMarks.empty();

      var cmMarks = $("#cmMarks");
      cmMarks.empty();
      
      //Display Student Details
      gradeInstance2.bm(1).then(function(bm) {
        
        //Store data from blockchain into variables
        var Id = bm[1];
        var name = bm[2];

        //Append pulled data to front-end
        var nameTemplate = "<td>" + name + "</td>"
        studentsName.append(nameTemplate);

        var IdTemplate = "<td>" + Id + "</td>"
        studentsId.append(IdTemplate);

      })

      //Display Student Statistics
      gradeInstance2.ss(1).then(function(ss) {

        //Store data from blockchain into variables
        var subs = ss[1];
        var total = ss[2];
        var totalGPP = ss[3];
        var average = 0;
        var studentAverage = 0;
        var teacherRemarks = ss[4];

        //Calculate and append average marks and round off to 2 DP
        average = (total/subs);
        var averageRounded = average.toFixed(2);

        //Calculate and append average pointer and round off to 2 DP
        studentAverage = (totalGPP/subs);
        var studentAverageRounded = studentAverage.toFixed(2);

        //Append pulled data to front-end
        var subTemplate = "<td>" + subs + "</td>"
        subCount.append(subTemplate);

        var totalTemplate = "<td>" + total + "</td>"
        totalMarks.append(totalTemplate);

        var percentageTemplate = "<td>" + averageRounded + " %" + "</td>"
        marksPercentage.append(percentageTemplate);

        var studentAverageTemplate = "<td>" + studentAverageRounded + "</td>"
        studentPointAverage.append(studentAverageTemplate);

        var studentRemarksTemplate = "<td>" + teacherRemarks + "</td>"
        studentRemarks.append(studentRemarksTemplate);

      })

      //Display Bahasa Malaysia Marks
        gradeInstance2.bm(1).then(function(bm) {
          var subjectName = "Bahasa Malaysia";
          var marks = bm[3];
          var grade ="-";
          var graded = bm[4];

          //Check if absent
          if(marks == 0 && graded){
            grade = "Absent";
          }
          else{
          //Calculate grade
          grade = App.calculateGrade(marks);
          }

          // Render BM Grades
          var Template = "<tr><td>" + subjectName + "</td><td>" + marks + "</td><td>" + grade + "</td></tr>"
          bmMarks.append(Template);
        });
      
        //Display Bahasa Inggeris Marks
        gradeInstance2.bi(1).then(function(bi) {
          var subjectName = "Bahasa Inggeris";
          var marks = bi[3];
          var grade ="-";
          var graded = bi[4];

          //Check if absent
          if(marks == 0 && graded){
            grade = "Absent";
          }
          else{
          //Calculate grade
          grade = App.calculateGrade(marks);
          }

          // Render BI Grades
          var Template = "<tr><td>" + subjectName + "</td><td>" + marks + "</td><td>" + grade + "</td></tr>"
          biMarks.append(Template);
        });

        //Display Sejarah Marks
        gradeInstance2.sj(1).then(function(sj) {
          var subjectName = "Sejarah";
          var marks = sj[3];
          var grade ="-";
          var graded = sj[4];

          //Check if absent
          if(marks == 0 && graded){
            grade = "Absent";
          }
          else{
          //Calculate grade
          grade = App.calculateGrade(marks);
          }

          // Render Sejarah Grades
          var Template = "<tr><td>" + subjectName + "</td><td>" + marks + "</td><td>" + grade + "</td></tr>"
          sjMarks.append(Template);
        });

        //Display Mathematics Marks
        gradeInstance2.ma(1).then(function(ma) {
          var subjectName = "Mathematics";
          var marks = ma[3];
          var grade ="-";
          var graded = ma[4];

          //Check if absent
          if(marks == 0 && graded){
            grade = "Absent";
          }
          else{
          //Calculate grade
          grade = App.calculateGrade(marks);
          }

          // Render Mathematics Grades
          var Template = "<tr><td>" + subjectName + "</td><td>" + marks + "</td><td>" + grade + "</td></tr>"
          maMarks.append(Template);
        });

        //Display Pendidikan Moral Marks
        gradeInstance2.pm(1).then(function(pm) {
          var subjectName = "Pendidikan Moral";
          var student = pm[2];
          var marks = pm[3];
          var grade ="-";
          var enrol = pm[5];
          var graded = pm[4];

          //Check if enrolled
          if(enrol && student == "Adam"){

            //Check if absent
            if(marks == 0 && graded){
              grade = "Absent";
            }
            else{
            //Calculate grade
            grade = App.calculateGrade(marks);
            }

          // Render Pendidikan Moral Grades
          var Template = "<tr><td>" + subjectName + "</td><td>" + marks + "</td><td>" + grade + "</td></tr>"
          pmMarks.append(Template);
          }
        });

        //Display Pendidikan Islam Marks
        gradeInstance2.pi(1).then(function(pi) {
          var subjectName = "Pendidikan Islam";
          var student = pi[2];
          var marks = pi[3];
          var grade ="-";
          var enrol = pi[5];
          var graded = pi[4];

          //Check if enrolled
          if(enrol && student == "Adam"){

            //Check if absent
            if(marks == 0 && graded){
              grade = "Absent";
            }
            else{
            //calculate grade
            grade = App.calculateGrade(marks);
            }

          // Render Pendidikan Moral Grades
          var Template = "<tr><td>" + subjectName + "</td><td>" + marks + "</td><td>" + grade + "</td></tr>"
          pmMarks.append(Template);
          }
        });

        //Display Additional Mathematics Marks
        gradeInstance2.am(1).then(function(am) {
          var subjectName = "Additional Mathematics";
          var marks = am[3];
          var grade ="-";
          var enrol = am[5];
          var graded = am[4];
          
          //Check if enrolled
          if(enrol){
          
            //Check if absent
            if(marks == 0 && graded){
              grade = "Absent";
            }
            else{
            //Calculate grade
            grade = App.calculateGrade(marks);
            }

          // Render Additional Mathematics Grades
          var Template = "<tr><td>" + subjectName + "</td><td>" + marks + "</td><td>" + grade + "</td></tr>"
          amMarks.append(Template);
          }
        });

        //Display Physics Marks
        gradeInstance2.py(1).then(function(py) {
          var subjectName = "Physics";
          var marks = py[3];
          var grade ="-";
          var enrol = py[5];
          var graded = py[4];

          //Check if enrolled
          if(enrol){
            
            //Check if absent
            if(marks == 0 && graded){
              grade = "Absent";
            }
            else{
            //Calculate grade
            grade = App.calculateGrade(marks);
            }

          // Render Physics Grades
          var Template = "<tr><td>" + subjectName + "</td><td>" + marks + "</td><td>" + grade + "</td></tr>"
          pyMarks.append(Template);
          }
        });

        //Display Biology Marks
        gradeInstance2.bl(1).then(function(bl) {
          var subjectName = "Biology";
          var marks = bl[3];
          var grade ="-";
          var enrol = bl[5];
          var graded = bl[4];

          //Check if enrolled
          if(enrol){
            
            //Check if absent
            if(marks == 0 && graded){
              grade = "Absent";
            }
            else{
            //Calculate grade
            grade = App.calculateGrade(marks);
            }

          // Render Biology Grades
          var Template = "<tr><td>" + subjectName + "</td><td>" + marks + "</td><td>" + grade + "</td></tr>"
          blMarks.append(Template);
          }
        });

        //Display Sejarah Marks
        gradeInstance2.cm(1).then(function(cm) {
          var subjectName = "Chemistry";
          var marks = cm[3];
          var grade ="-";
          var enrol = cm[5];
          var graded = cm[4];

          //Check if enrolled
          if(enrol){
            
            //Check if absent
            if(marks == 0 && graded){
              grade = "Absent";
            }
            else{
            //Calculate grade
            grade = App.calculateGrade(marks);
            }

          // Render Chemistry Grades
          var Template = "<tr><td>" + subjectName + "</td><td>" + marks + "</td><td>" + grade + "</td></tr>"
          cmMarks.append(Template);
          }
        });
      return gradeInstance2.graded(App.account);
  }).then(function() {
      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  },
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});