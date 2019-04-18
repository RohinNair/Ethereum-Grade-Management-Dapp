App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

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

  render: function() {
    var gradeInstance2;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data
    App.contracts.Grade.deployed().then(function(instance2) {
      gradeInstance2 = instance2;
      return gradeInstance2.totalSub1();
    }).then(function() {
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
      gradeInstance2.bm(1).then(function(bms) {
        var Id = bms[1];
        var name = bms[2];

        var nameTemplate = "<td>" + name + "</td>"
        studentsName.append(nameTemplate);

        var IdTemplate = "<td>" + Id + "</td>"
        studentsId.append(IdTemplate);

      })

      //Display Student Statistics
      gradeInstance2.ss(1).then(function(ss) {
        var subs = ss[1];
        var total = ss[2];
        var totalGPP = ss[3];
        var average = 0;
        var studentAverage = 0;

        average = (total/subs);
        var averageRounded = average.toFixed(2);

        studentAverage = (totalGPP/subs);
        var studentAverageRounded = studentAverage.toFixed(2);

        var subTemplate = "<td>" + subs + "</td>"
        subCount.append(subTemplate);

        var totalTemplate = "<td>" + total + "</td>"
        totalMarks.append(totalTemplate);

        var percentageTemplate = "<td>" + averageRounded + " %" + "</td>"
        marksPercentage.append(percentageTemplate);

        var studentAverageTemp = "<td>" + studentAverageRounded + "</td>"
        studentPointAverage.append(studentAverageTemp);

      })

      for (var i = 1; i <= 1; i++) {
        gradeInstance2.bm(i).then(function(bms) {
          var subjectName = "Bahasa Malaysia";
          var marks = bms[3];
          var grade ="-";
          var graded = bms[4];

          if(marks == 0 && graded){
            grade = "Absent";
          }
          else{
          //calculate grade
          grade = App.calculateGrade(marks);
          }

          // Render BM Grades
          var Template = "<tr><td>" + subjectName + "</td><td>" + marks + "</td><td>" + grade + "</td></tr>"
          bmMarks.append(Template);
        });
      }

      for (var i = 1; i <= 1; i++) {
        gradeInstance2.bi(i).then(function(bis) {
          var subjectName = "Bahasa Inggeris";
          var marks = bis[3];
          var grade ="-";
          var graded = bis[4];

          if(marks == 0 && graded){
            grade = "Absent";
          }
          else{
          //calculate grade
          grade = App.calculateGrade(marks);
          }

          // Render BI Grades
          var Template = "<tr><td>" + subjectName + "</td><td>" + marks + "</td><td>" + grade + "</td></tr>"
          biMarks.append(Template);
        });
      }

      for (var i = 1; i <= 1; i++) {
        gradeInstance2.sj(i).then(function(sjs) {
          var subjectName = "Sejarah";
          var marks = sjs[3];
          var grade ="-";
          var graded = sjs[4];

          if(marks == 0 && graded){
            grade = "Absent";
          }
          else{
          //calculate grade
          grade = App.calculateGrade(marks);
          }

          // Render Sejarah Grades
          var Template = "<tr><td>" + subjectName + "</td><td>" + marks + "</td><td>" + grade + "</td></tr>"
          sjMarks.append(Template);
        });
      }

      for (var i = 1; i <= 1; i++) {
        gradeInstance2.ma(i).then(function(mas) {
          var subjectName = "Mathematics";
          var marks = mas[3];
          var grade ="-";
          var graded = mas[4];

          if(marks == 0 && graded){
            grade = "Absent";
          }
          else{
          //calculate grade
          grade = App.calculateGrade(marks);
          }

          // Render Mathematics Grades
          var Template = "<tr><td>" + subjectName + "</td><td>" + marks + "</td><td>" + grade + "</td></tr>"
          maMarks.append(Template);
        });
      }

      for (var i = 1; i <= 1; i++) {
        gradeInstance2.pm(i).then(function(pms) {
          var subjectName = "Pendidikan Moral";
          var student = pms[2];
          var marks = pms[3];
          var grade ="-";
          var enrol = pms[5];

          if(enrol && student == "Adam"){
          //calculate grade
          grade = App.calculateGrade(marks);

          // Render Pendidikan Moral Grades
          var Template = "<tr><td>" + subjectName + "</td><td>" + marks + "</td><td>" + grade + "</td></tr>"
          pmMarks.append(Template);
          }
        });
      }

      for (var i = 1; i <= 1; i++) {
        gradeInstance2.pi(i).then(function(pis) {
          var subjectName = "Pendidikan Islam";
          var student = pis[2];
          var marks = pis[3];
          var grade ="-";
          var enrol = pis[5];

          if(enrol && student == "Adam"){
          //calculate grade
          grade = App.calculateGrade(marks);

          // Render Pendidikan Islam Grades
          var Template = "<tr><td>" + subjectName + "</td><td>" + marks + "</td><td>" + grade + "</td></tr>"
          piMarks.append(Template);
          }
        });
      }

      for (var i = 1; i <= 1; i++) {
        gradeInstance2.am(i).then(function(ams) {
          var subjectName = "Additional Mathematics";
          var marks = ams[3];
          var grade ="-";
          var enrol = ams[5];

          if(enrol){
          //calculate grade
          grade = App.calculateGrade(marks);

          // Render Add Maths Grades
          var Template = "<tr><td>" + subjectName + "</td><td>" + marks + "</td><td>" + grade + "</td></tr>"
          amMarks.append(Template);
          }
        });
      }

      for (var i = 1; i <= 1; i++) {
        gradeInstance2.py(i).then(function(pys) {
          var subjectName = "Physics";
          var marks = pys[3];
          var grade ="-";
          var enrol = pys[5];

          if(enrol){
          //calculate grade
          grade = App.calculateGrade(marks);

          // Render Physics Grades
          var Template = "<tr><td>" + subjectName + "</td><td>" + marks + "</td><td>" + grade + "</td></tr>"
          pyMarks.append(Template);
          }
        });
      }

      for (var i = 1; i <= 1; i++) {
        gradeInstance2.bl(i).then(function(bls) {
          var subjectName = "Biology";
          var marks = bls[3];
          var grade ="-";
          var enrol = bls[5];

          if(enrol){
          //calculate grade
          grade = App.calculateGrade(marks);

          // Render Biology Grades
          var Template = "<tr><td>" + subjectName + "</td><td>" + marks + "</td><td>" + grade + "</td></tr>"
          blMarks.append(Template);
          }
        });
      }

      for (var i = 1; i <= 1; i++) {
        gradeInstance2.cm(i).then(function(cms) {
          var subjectName = "Chemistry";
          var marks = cms[3];
          var grade ="-";
          var enrol = cms[5];

          if(enrol){
          //calculate grade
          grade = App.calculateGrade(marks);

          // Render Chemistry Grades
          var cmTemplate = "<tr><td>" + subjectName + "</td><td>" + marks + "</td><td>" + grade + "</td></tr>"
          cmMarks.append(Template);
          }
        });
      }
      return gradeInstance2.graders(App.account);
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