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

  //Render page function
  render: function() {
    var gradeInstance2;
    //Target specific HTML tags in UI
    var loader = $("#loader");
    var content = $("#content");
    var alt = $("#alt-text");

    loader.show();
    content.hide();
    alt.hide();

    // Load contract data
    App.contracts.Grade.deployed().then(function(instance2) {
      gradeInstance2 = instance2;
      return gradeInstance2.bmCount();
    }).then(function() {

      //Initialize containers to display student info
      var studentsName = $("#studentsName");
      studentsName.empty();

      //Initialize containers to display electives
      var pendidikanMoral = $("#pendidikanMoral");
      var pendidikanIslam = $("#pendidikanIslam");
      var addMaths = $("#addMaths");
      var physics = $("#physics");
      var biology = $("#biology");
      var chemistry = $("#chemistry");

      //Pull and display student's name from blockchain
      gradeInstance2.bm(1).then(function(bm) {
        var name = bm[2];

        var nameTemplate = "<td>" + name + "</td>"
        studentsName.append(nameTemplate);

      });

      //Hide PM Option once Enrolled
      gradeInstance2.pm(1).then(function(pm) {
        var enrolled = pm[5];

        if(enrolled) {
          pendidikanMoral.hide();
          pendidikanIslam.hide();
        }

      })

      //Hide PI Option once Enrolled
      gradeInstance2.pi(1).then(function(pi) {
        var enrolled = pi[5];

        if(enrolled) {
          pendidikanIslam.hide();
          pendidikanMoral.hide();
        }

      })

      //Hide AM Option once Enrolled
      gradeInstance2.am(1).then(function(am) {
        var enrolled = am[5];

        if(enrolled) {
          addMaths.hide();
        }

      })

      //Hide PY Option once Enrolled
      gradeInstance2.py(1).then(function(py) {
        var enrolled = py[5];

        if(enrolled) {
          physics.hide();
        }

      })

      //Hide BL Option once Enrolled
      gradeInstance2.bl(1).then(function(bl) {
        var enrolled = bl[5];

        if(enrolled) {
          biology.hide();
        }

      })

      //Hide CM Option once Enrolled
      gradeInstance2.cm(1).then(function(cm) {
        var enrolled = cm[5];

        if(enrolled) {
          chemistry.hide();
        }

      })
      return gradeInstance2.finaliseEnroll1(App.account);
  }).then(function(hasEnroll) {
    //Check if enrollment finalised and update UI accordingly
    if(hasEnroll){
      loader.hide();
      content.hide();
      alt.show()
    }
    else{
      loader.hide();
      content.show();
      alt.hide()
    }

    }).catch(function(error) {
      console.warn(error);
    });
  },

  //Enroll student in Pendidikan Moral
  enrollPendidikanMoral: function() {
    var electiveId = 5;
    var subjectInstanceId = 1;
    var studentId = 970224042242;
    var studentName = "Adam";
    App.contracts.Grade.deployed().then(function(instance2) {
      return instance2.elective(electiveId, subjectInstanceId, studentId, studentName, { from: App.account });
    }).then(function() {
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },

  //Enroll student in Pendidikan Islam
  enrollPendidikanIslam: function() {
    var electiveId = 6;
    var subjectInstanceId = 1;
    var studentId = 970224042242;
    var studentName = "Adam";
    App.contracts.Grade.deployed().then(function(instance2) {
      return instance2.elective(electiveId, subjectInstanceId, studentId, studentName, { from: App.account });
    }).then(function() {
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },

  //Enroll student in Additional Mathematics
  enrollAddMaths: function() {
    var electiveId = 7;
    var subjectInstanceId = 1;
    var studentId = 970224042242;
    var studentName = "Adam";
    App.contracts.Grade.deployed().then(function(instance2) {
      return instance2.elective(electiveId, subjectInstanceId, studentId, studentName, { from: App.account });
    }).then(function() {
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },

  //Enroll student in Physics
  enrollPhysics: function() {
    var electiveId = 8;
    var subjectInstanceId = 1;
    var studentId = 970224042242;
    var studentName = "Adam";
    App.contracts.Grade.deployed().then(function(instance2) {
      return instance2.elective(electiveId, subjectInstanceId, studentId, studentName, { from: App.account });
    }).then(function() {
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },

  //Enroll student in Biology
  enrollBiology: function() {
    var electiveId = 9;
    var subjectInstanceId = 1;
    var studentId = 970224042242;
    var studentName = "Adam";
    App.contracts.Grade.deployed().then(function(instance2) {
      return instance2.elective(electiveId, subjectInstanceId, studentId, studentName, { from: App.account });
    }).then(function() {
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },

  //Enroll student in Chemistry
  enrollChemistry: function() {
    var electiveId = 10;
    var subjectInstanceId = 1;
    var studentId = 970224042242;
    var studentName = "Adam";
    App.contracts.Grade.deployed().then(function(instance2) {
      return instance2.elective(electiveId, subjectInstanceId, studentId, studentName, { from: App.account });
    }).then(function() {
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },
  
  //Finalise student enrollment
  finaliseEnrollment: function() {
    var studentInstance = 1
    App.contracts.Grade.deployed().then(function(instance2) {
      return instance2.finaliseEnrollment(studentInstance, { from: App.account });
    }).then(function() {
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