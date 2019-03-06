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
    App.contracts.Grade.deployed().then(function(instance) {
      instance.gradedEvent({}, {
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
    var gradeInstance;
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
    App.contracts.Grade.deployed().then(function(instance) {
      gradeInstance = instance;
      return gradeInstance.studentsCount();
    }).then(function(studentsCount) {
      var studentsName = $("#studentsName");
      studentsName.empty();

      var studentsResults = $("#studentsResults");
      studentsResults.empty();

      var studentsSelect = $('#studentsSelect');
      studentsSelect.empty();

      //var studentsCheck = document.getElementById("admission");

      gradeInstance.students(1).then(function(student) {
        var name = student[1];

        var nameTemplate = "<th>" + name + "</th>"
        studentsName.append(nameTemplate);
      })

      for (var i = 1; i <= studentsCount; i++) {
        gradeInstance.students(i).then(function(student) {
          var id = student[0];
          var name = student[1];
          var subject = student[2];
          //var marks = student[3];
          var str = "Grade Student";
          var goto = str.link("./index2.html")

          // Render Student Grade Result
          var studentTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + subject + "</td><td>" + goto + "</td></tr>"
          studentsResults.append(studentTemplate);

          // Render Student Selection Menu
          var studentOption = "<option value='" + id + "' >" + name + "</ option>"
          studentsSelect.append(studentOption);
        });
      }
      return gradeInstance.graders(App.account);
  }).then(function(studentsCheck) {
    // Do not allow a teacher to grade
    if(studentsCheck.checked == true) {
      $('form').hide();
    }
      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  },
  submitGrade: function() {
    var studentId = $('#studentsSelect').val();
    var studentMarks = $('#student-marks').val()
    App.contracts.Grade.deployed().then(function(instance) {
      return instance.grade(studentId, studentMarks, { from: App.account });
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