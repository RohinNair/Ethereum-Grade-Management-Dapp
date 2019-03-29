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

      var studentsSubjects = $("#studentsSubjects");
      studentsSubjects.empty();

      var subjectsSelect = $('#subjectsSelect');
      subjectsSelect.empty();

      var electivesSelect = $("#electivesSelect");
      electivesSelect.empty();

      gradeInstance2.bm(1).then(function(bms) {
        var name = bms[2];

        var nameTemplate = "<td>" + name + "</td>"
        studentsName.append(nameTemplate);

      });
      for (var i = 1; i <= 4; i++) {
        var id = i;
        var subject;

        if (id == 1) {
          subject = "Add Maths";
        }
        if (id == 2) {
          subject = "Biology";
        }
        if (id == 3) {
          subject = "Physics";
        }
        if (id == 4) {
          subject = "Chemistry";
        }

        var electivesOption = "<option value='" + id + "' >" + subject + "</ option>"
        electivesSelect.append(electivesOption);
    }
      return gradeInstance2.graders(App.account);
  }).then(function(finalised) {
      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  },
  enrollElectives: function() {
    var electiveId = $('#electivesSelect').val();
    var studentId = 1;
    var studentName = "Adam";
    App.contracts.Grade.deployed().then(function(instance2) {
      return instance2.elective(electiveId, studentId, studentName, { from: App.account });
    }).then(function(marks) {
      // Wait for grades to update
      $("bahasaMalaysia").hide();
      //$("#loader").show();
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