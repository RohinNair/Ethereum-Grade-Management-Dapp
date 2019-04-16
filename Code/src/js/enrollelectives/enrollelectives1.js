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
    }).then(function() {
      var studentsName = $("#studentsName");
      studentsName.empty();

      var pendidikanMoral = $("#pendidikanMoral");
      var pendidikanIslam = $("#pendidikanIslam");
      var addMaths = $("#addMaths");
      var physics = $("#physics");
      var biology = $("#biology");
      var chemistry = $("#chemistry");

      gradeInstance2.bm(1).then(function(bms) {
        var name = bms[2];

        var nameTemplate = "<td>" + name + "</td>"
        studentsName.append(nameTemplate);

      });

      //Hide PM Option once Enrolled
      gradeInstance2.pm(1).then(function(pms) {
        var enrolled = pms[5];

        if(enrolled) {
          pendidikanMoral.hide();
          pendidikanIslam.hide();
        }

      })

      //Hide PI Option once Enrolled
      gradeInstance2.pi(1).then(function(pis) {
        var enrolled = pis[5];

        if(enrolled) {
          pendidikanIslam.hide();
          pendidikanMoral.hide();
        }

      })

      //Hide AM Option once Enrolled
      gradeInstance2.am(1).then(function(ams) {
        var enrolled = ams[5];

        if(enrolled) {
          addMaths.hide();
        }

      })

      //Hide PY Option once Enrolled
      gradeInstance2.py(1).then(function(pys) {
        var enrolled = pys[5];

        if(enrolled) {
          physics.hide();
        }

      })

      //Hide BL Option once Enrolled
      gradeInstance2.bl(1).then(function(bls) {
        var enrolled = bls[5];

        if(enrolled) {
          biology.hide();
        }

      })

      //Hide CM Option once Enrolled
      gradeInstance2.cm(1).then(function(cms) {
        var enrolled = cms[5];

        if(enrolled) {
          chemistry.hide();
        }

      })
      return gradeInstance2.graders(App.account);
  }).then(function() {
      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  },

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