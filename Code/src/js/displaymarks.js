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
      return gradeInstance2.bmCount();
    }).then(function(bmCount) {
      var studentsName = $("#studentsName");
      studentsName.empty();

      var bmMarks = $("#bmMarks");
      bmMarks.empty();
      
      var biMarks = $("#biMarks");
      biMarks.empty();

      gradeInstance2.bm(1).then(function(bms) {
        var name = bms[2];
        //var ic = student[2];

        var nameTemplate = "<td>" + name + "</td>"
        studentsName.append(nameTemplate);

      })

      for (var i = 1; i <= 1; i++) {
        gradeInstance2.bm(i).then(function(bms) {
          var bmid = bms[0];
          var studentid = bms[1];
          var studentName = bms[2];
          var bmmarks = bms[3];
          var bmgrade ="-";

          //calculate grade
          if(bmmarks>=90 && bmmarks<=100){
            bmgrade = "A+";
          }
          else
          if(bmmarks>=80 && bmmarks<=89){
            bmgrade = "A";
          }
          else
          if(bmmarks>=76 && bmmarks<=79){
            bmgrade = "A-";
          }
          else
          if(bmmarks>=70 && bmmarks<=75){
            bmgrade = "B+";
          }
          else
          if(bmmarks>=66 && bmmarks<=69){
            bmgrade = "B";
          }
          else
          if(bmmarks>=60 && bmmarks<=65){
            bmgrade = "C+";
          }
          else
          if(bmmarks>=50 && bmmarks<=59){
            bmgrade = "C";
          }
          else
          if(bmmarks>=45 && bmmarks<=49){
            bmgrade = "D";
          }
          else
          if(bmmarks>=40 && bmmarks<=44){
            bmgrade = "E";
          }
          else
          if(bmmarks>=1 && bmmarks<=39){
            bmgrade = "G";
          }

          // Render Student Subjects
          var bmTemplate = "<tr><th>" + bmid + "</th><td>" + studentid + "</td><td>" + studentName + "</td><td>" + bmmarks + "</td><td>" + bmgrade + "</td></tr>"
          bmMarks.append(bmTemplate);
        });
      }

      for (var i = 1; i <= 1; i++) {
        gradeInstance2.bi(i).then(function(bis) {
          var biid = bis[0];
          var studentid = bis[1];
          var studentName = bis[2];
          var bimarks = bis[3];
          var bigrade ="-";

          //calculate grade
          if(bimarks>=90 && bimarks<=100){
            bigrade = "A+";
          }
          else
          if(bimarks>=80 && bimarks<=89){
            bigrade = "A";
          }
          else
          if(bimarks>=76 && bimarks<=79){
            bigrade = "A-";
          }
          else
          if(bimarks>=70 && bimarks<=75){
            bigrade = "B+";
          }
          else
          if(bimarks>=66 && bimarks<=69){
            bigrade = "B";
          }
          else
          if(bimarks>=60 && bimarks<=65){
            bigrade = "C+";
          }
          else
          if(bimarks>=50 && bimarks<=59){
            bigrade = "C";
          }
          else
          if(bimarks>=45 && bimarks<=49){
            bigrade = "D";
          }
          else
          if(bimarks>=40 && bimarks<=44){
            bigrade = "E";
          }
          else
          if(bimarks>=1 && bimarks<=39){
            bigrade = "G";
          }

          // Render Student Subjects
          var biTemplate = "<tr><th>" + biid + "</th><td>" + studentid + "</td><td>" + studentName + "</td><td>" + bimarks + "</td><td>" + bigrade + "</td></tr>"
          biMarks.append(biTemplate);
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
    var subjectId = 1;
    var subjectMarks = $('#subject-marks').val()
    //var graded = true;
    var subjectIdentifier = 1;
    //var studId = 1;
    App.contracts.Grade.deployed().then(function(instance2) {
      return instance2.grade(subjectId, subjectMarks, subjectIdentifier, { from: App.account });
    }).then(function(marks) {
      // Wait for grades to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },
  /*finaliseGrade: function() {
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
  }*/
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});