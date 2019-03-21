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
      return gradeInstance2.subjectsCount();
    }).then(function(subjectsCount) {
      var studentsName = $("#studentsName");
      studentsName.empty();

      var studentsIc = $("#studentsIc");
      studentsIc.empty();

      var studentsSubjects = $("#studentsSubjects");
      studentsSubjects.empty();

      var subjectsSelect = $('#subjectsSelect');
      subjectsSelect.empty();

      //var studentsTotalMarks = $('#studentsTotalMarks');
      //studentsTotalMarks.empty();

      gradeInstance2.students(1).then(function(student) {
        var name = student[1];
        var ic = student[2];
        var subjectTaken = student[3];

        var nameTemplate = "<td>" + name + "</td>"
        studentsName.append(nameTemplate);

        var icTemplate = "<td>" + ic + "</td>"
        studentsIc.append(icTemplate);

        var subCountTemplate = subjectTaken
        subCount.append(subCountTemplate);

      })

      for (var i = 1; i <= subjectsCount; i++) {
        gradeInstance2.subjects(i).then(function(subject) {
          var id = subject[0];
          var name = subject[1];
          var marks = subject[2];
          //var studentID = subject[4];
          var grade ="-";

            //calculate grade
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
          if(marks>=40 && marks<=4){
            grade = "E";
          }
          else
          if(marks>=1 && marks<=39){
            grade = "G";
          }

          // Render Student Subjects
          var studentTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + marks + "</td><td>" + grade + "</td></tr>"
          studentsSubjects.append(studentTemplate);

          // Render Student Selection Menu
          var subjectOption = "<option value='" + id + "' >" + name + "</ option>"
          subjectsSelect.append(subjectOption);

          //var totalMarks = total;
          //studentsTotalMarks.append(total);
        });
      }
      return gradeInstance2.graders(App.account);
  }).then(function(finalised) {
    // Do not allow a teacher to grade
    if(finalised) {
      $('form').hide();
    }
      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  },
  submitGrade: function() {
    var subjectId = $('#subjectsSelect').val();
    var subjectMarks = $('#subject-marks').val()
    var graded = true;
    //var studId = 1;
    App.contracts.Grade.deployed().then(function(instance2) {
      return instance2.grade(subjectId, subjectMarks, graded, { from: App.account });
    }).then(function(marks) {
      // Wait for grades to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },
  finaliseGrade: function() {
    var subjectId = $('#subjectsSelect').val();
    App.contracts.Grade.deployed().then(function(instance2) {
      return instance2.finalise(subjectId, { from: App.account });
    }).then(function(marks) {
      // Wait for grades to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});