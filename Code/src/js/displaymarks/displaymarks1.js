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
    if(marks>=76 && marks<=79){
      grade = "A-";
    }
    else
    if(marks>=70 && marks<=75){
      grade = "B+";
    }
    else
    if(marks>=66 && marks<=69){
      grade = "B";
    }
    else
    if(marks>=60 && marks<=65){
      grade = "C+";
    }
    else
    if(marks>=50 && marks<=59){
      grade = "C";
    }
    else
    if(marks>=45 && marks<=49){
      grade = "D";
    }
    else
    if(marks>=40 && marks<=44){
      grade = "E";
    }
    else
    if(marks>=1 && marks<=39){
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
      return gradeInstance2.bmCount();
    }).then(function() {
      var studentsName = $("#studentsName");
      studentsName.empty();

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

      gradeInstance2.bm(1).then(function(bms) {
        var name = bms[2];

        var nameTemplate = "<td>" + name + "</td>"
        studentsName.append(nameTemplate);

      })

      for (var i = 1; i <= 1; i++) {
        gradeInstance2.bm(i).then(function(bms) {
          var subjectName = "Bahasa Malaysia";
          var bmmarks = bms[3];
          var grade ="-";

          //calculate grade
          grade = App.calculateGrade(bmmarks);

          // Render BM Grades
          var bmTemplate = "<tr><td>" + subjectName + "</td><td>" + bmmarks + "</td><td>" + grade + "</td></tr>"
          bmMarks.append(bmTemplate);
        });
      }

      for (var i = 1; i <= 1; i++) {
        gradeInstance2.bi(i).then(function(bis) {
          var subjectName = "Bahasa Inggeris";
          var bimarks = bis[3];
          var grade ="-";

          //calculate grade
          grade = App.calculateGrade(bimarks);

          // Render BI Grades
          var biTemplate = "<tr><td>" + subjectName + "</td><td>" + bimarks + "</td><td>" + grade + "</td></tr>"
          biMarks.append(biTemplate);
        });
      }

      for (var i = 1; i <= 1; i++) {
        gradeInstance2.sj(i).then(function(sjs) {
          var subjectName = "Sejarah";
          var sjmarks = sjs[3];
          var sjgrade ="-";

          //calculate grade
          sjgrade = App.calculateGrade(sjmarks);

          // Render Sejarah Grades
          var sjTemplate = "<tr><td>" + subjectName + "</td><td>" + sjmarks + "</td><td>" + sjgrade + "</td></tr>"
          sjMarks.append(sjTemplate);
        });
      }

      for (var i = 1; i <= 1; i++) {
        gradeInstance2.ma(i).then(function(mas) {
          var subjectName = "Mathematics";
          var mamarks = mas[3];
          var magrade ="-";

          //calculate grade
          magrade = App.calculateGrade(mamarks);

          // Render Mathematics Grades
          var maTemplate = "<tr><td>" + subjectName + "</td><td>" + mamarks + "</td><td>" + magrade + "</td></tr>"
          maMarks.append(maTemplate);
        });
      }

      for (var i = 1; i <= 1; i++) {
        gradeInstance2.pm(i).then(function(pms) {
          var subjectName = "Pendidikan Moral";
          var pmstudent = pms[2];
          var pmmarks = pms[3];
          var pmgrade ="-";
          var pmenrol = pms[5];

          if(pmenrol && pmstudent == "Adam"){
          //calculate grade
          pmgrade = App.calculateGrade(pmmarks);

          // Render Pendidikan Moral Grades
          var pmTemplate = "<tr><td>" + subjectName + "</td><td>" + pmmarks + "</td><td>" + pmgrade + "</td></tr>"
          pmMarks.append(pmTemplate);
          }
        });
      }

      for (var i = 1; i <= 1; i++) {
        gradeInstance2.pi(i).then(function(pis) {
          var subjectName = "Pendidikan Islam";
          var pistudent = pis[2];
          var pimarks = pis[3];
          var pigrade ="-";
          var pienrol = pis[5];

          if(pienrol && pistudent == "Adam"){
          //calculate grade
          pigrade = App.calculateGrade(pimarks);

          // Render Pendidikan Islam Grades
          var piTemplate = "<tr><td>" + subjectName + "</td><td>" + pimarks + "</td><td>" + pigrade + "</td></tr>"
          piMarks.append(piTemplate);
          }
        });
      }

      for (var i = 1; i <= 1; i++) {
        gradeInstance2.am(i).then(function(ams) {
          var subjectName = "Additional Mathematics";
          var ammarks = ams[3];
          var amgrade ="-";
          var amenrol = ams[5];

          if(amenrol){
          //calculate grade
          amgrade = App.calculateGrade(ammarks);

          // Render Add Maths Grades
          var amTemplate = "<tr><td>" + subjectName + "</td><td>" + ammarks + "</td><td>" + amgrade + "</td></tr>"
          amMarks.append(amTemplate);
          }
        });
      }

      for (var i = 1; i <= 1; i++) {
        gradeInstance2.py(i).then(function(pys) {
          var subjectName = "Physics";
          var pymarks = pys[3];
          var pygrade ="-";
          var pyenrol = pys[5];

          if(pyenrol){
          //calculate grade
          pygrade = App.calculateGrade(pymarks);

          // Render Physics Grades
          var pyTemplate = "<tr><td>" + subjectName + "</td><td>" + pymarks + "</td><td>" + pygrade + "</td></tr>"
          pyMarks.append(pyTemplate);
          }
        });
      }

      for (var i = 1; i <= 1; i++) {
        gradeInstance2.bl(i).then(function(bls) {
          var subjectName = "Biology";
          var blmarks = bls[3];
          var blgrade ="-";
          var blenrol = bls[5];

          if(blenrol){
          //calculate grade
          blgrade = App.calculateGrade(blmarks);

          // Render Biology Grades
          var blTemplate = "<tr><td>" + subjectName + "</td><td>" + blmarks + "</td><td>" + blgrade + "</td></tr>"
          blMarks.append(blTemplate);
          }
        });
      }

      for (var i = 1; i <= 1; i++) {
        gradeInstance2.cm(i).then(function(cms) {
          var subjectName = "Chemistry";
          var cmmarks = cms[3];
          var cmgrade ="-";
          var cmenrol = cms[5];

          if(cmenrol){
          //calculate grade
          cmgrade = App.calculateGrade(cmmarks);

          // Render Chemistry Grades
          var cmTemplate = "<tr><td>" + subjectName + "</td><td>" + cmmarks + "</td><td>" + cmgrade + "</td></tr>"
          cmMarks.append(cmTemplate);
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