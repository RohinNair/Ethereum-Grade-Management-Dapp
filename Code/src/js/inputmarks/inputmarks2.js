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

      /*var studentsTotalMarks = $('#studentsTotalMarks');
      studentsTotalMarks.empty();*/

      gradeInstance2.bm(2).then(function(bms) {
        var name = bms[2];

        var nameTemplate = "<td>" + name + "</td>"
        studentsName.append(nameTemplate);

      })
      return gradeInstance2.graders(App.account);
  }).then(function() {
      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  },
  submitbmGrade: function() {
    //student within subject instance
    var subjectId = 2;
    //value of marks input
    var subjectMarks = $('#bm-marks').val()
    //subject Identifier
    var subjectIdentifier = 1;
    //Indicate subject has been graded and cannot overwrite
    var graded = true;
    App.contracts.Grade.deployed().then(function(instance2) {
      return instance2.grade(subjectId, subjectMarks, subjectIdentifier, graded, { from: App.account });
    }).then(function() {
      // Wait for grades to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },
  submitbiGrade: function() {
    //student within subject instance
    var subjectId = 2;
    //value of marks input
    var subjectMarks = $('#bi-marks').val()
    //subject Identifier
    var subjectIdentifier = 2;
    //Indicate subject has been graded and cannot overwrite
    var graded = true;
    App.contracts.Grade.deployed().then(function(instance2) {
      return instance2.grade(subjectId, subjectMarks, subjectIdentifier, graded, { from: App.account });
    }).then(function() {
      // Wait for grades to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },
  submitsjGrade: function() {
    //student within subject instance
    var subjectId = 2;
    //value of marks input
    var subjectMarks = $('#sj-marks').val()
    //subject Identifier
    var subjectIdentifier = 3;
    //Indicate subject has been graded and cannot overwrite
    var graded = true;
    App.contracts.Grade.deployed().then(function(instance2) {
      return instance2.grade(subjectId, subjectMarks, subjectIdentifier, graded, { from: App.account });
    }).then(function() {
      // Wait for grades to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },
  submitmaGrade: function() {
    //student within subject instance
    var subjectId = 2;
    //value of marks input
    var subjectMarks = $('#ma-marks').val()
    //subject Identifier
    var subjectIdentifier = 4;
    //Indicate subject has been graded and cannot overwrite
    var graded = true;
    App.contracts.Grade.deployed().then(function(instance2) {
      return instance2.grade(subjectId, subjectMarks, subjectIdentifier, graded, { from: App.account });
    }).then(function() {
      // Wait for grades to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },
  submitpmGrade: function() {
    //student within subject instance
    var subjectId = 1;
    //value of marks input
    var subjectMarks = $('#pm-marks').val()
    //subject Identifier
    var subjectIdentifier = 5;
    //Indicate subject has been graded and cannot overwrite
    var graded = true;
    App.contracts.Grade.deployed().then(function(instance2) {
      return instance2.grade(subjectId, subjectMarks, subjectIdentifier, graded, { from: App.account });
    }).then(function() {
      // Wait for grades to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },
  /*submitpiGrade: function() {
    //student within subject instance
    var subjectId = 2;
    //value of marks input
    var subjectMarks = $('#pi-marks').val()
    //subject Identifier
    var subjectIdentifier = 6;
    //Indicate subject has been graded and cannot overwrite
    var graded = true;
    App.contracts.Grade.deployed().then(function(instance2) {
      return instance2.grade(subjectId, subjectMarks, subjectIdentifier, graded, { from: App.account });
    }).then(function() {
      // Wait for grades to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },*/
  submitamGrade: function() {
    //student within subject instance
    var subjectId = 2;
    //value of marks input
    var subjectMarks = $('#am-marks').val()
    //subject Identifier
    var subjectIdentifier = 7;
    //Indicate subject has been graded and cannot overwrite
    var graded = true;
    App.contracts.Grade.deployed().then(function(instance2) {
      return instance2.grade(subjectId, subjectMarks, subjectIdentifier, graded, { from: App.account });
    }).then(function() {
      // Wait for grades to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },
  submitpyGrade: function() {
    //student within subject instance
    var subjectId = 2;
    //value of marks input
    var subjectMarks = $('#py-marks').val()
    //subject Identifier
    var subjectIdentifier = 8;
    //Indicate subject has been graded and cannot overwrite
    var graded = true;
    App.contracts.Grade.deployed().then(function(instance2) {
      return instance2.grade(subjectId, subjectMarks, subjectIdentifier, graded, { from: App.account });
    }).then(function() {
      // Wait for grades to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },
  submitblGrade: function() {
    //student within subject instance
    var subjectId = 2;
    //value of marks input
    var subjectMarks = $('#bl-marks').val()
    //subject Identifier
    var subjectIdentifier = 9;
    //Indicate subject has been graded and cannot overwrite
    var graded = true;
    App.contracts.Grade.deployed().then(function(instance2) {
      return instance2.grade(subjectId, subjectMarks, subjectIdentifier, graded, { from: App.account });
    }).then(function() {
      // Wait for grades to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },
  submitcmGrade: function() {
    //student within subject instance
    var subjectId = 2;
    //value of marks input
    var subjectMarks = $('#cm-marks').val()
    //subject Identifier
    var subjectIdentifier = 10;
    //Indicate subject has been graded and cannot overwrite
    var graded = true;
    App.contracts.Grade.deployed().then(function(instance2) {
      return instance2.grade(subjectId, subjectMarks, subjectIdentifier, graded, { from: App.account });
    }).then(function() {
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
    }).then(function() {
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