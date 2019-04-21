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
    var alt = $("#alt-text");

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

      var bahasaMalaysia = $('#bahasaMalaysia');

      var bahasaInggeris = $('#bahasaInggeris');

      var sejarah = $('#sejarah');

      var mathematics = $('#mathematics');

      var pendidikanMoral = $('#pendidikanMoral');

      var pendidikanIslam = $('#pendidikanIslam');

      var addMaths = $('#addMaths');

      var physics = $('#physics');

      var biology = $('#biology');

      var chemistry = $('#chemistry');

      var studentRemark = $('#studentRemark');

      gradeInstance2.bm(1).then(function(bms) {
        var name = bms[2];

        var nameTemplate = "<td>" + name + "</td>"
        studentsName.append(nameTemplate);

      })
      //Hide BM Input Box Once Graded
      gradeInstance2.bm(1).then(function(bms) {
        var graded = bms[4];

        if(graded) {
          bahasaMalaysia.hide();
        }

      })
      //Hide BI Input Box Once Graded
      gradeInstance2.bi(1).then(function(bis) {
        var graded = bis[4];

        if(graded) {
          bahasaInggeris.hide();
        }

      })
      //Hide SJ Input Box Once Graded
      gradeInstance2.sj(1).then(function(sjs) {
        var graded = sjs[4];

        if(graded) {
          sejarah.hide();
        }

      })
      //Hide MA Input Box Once Graded
      gradeInstance2.ma(1).then(function(mas) {
        var graded = mas[4];

        if(graded) {
          mathematics.hide();
        }

      })
      
      //Hide PM Input Box Once Graded
      gradeInstance2.pm(1).then(function(pms) {
        var graded = pms[4];
        var enrolled = pms[5];

        if(!enrolled){
          pendidikanMoral.hide();
        }
        if(graded) {
          pendidikanMoral.hide();
        }

      })
      //Hide PI Input Box Once Graded
      gradeInstance2.pi(1).then(function(pis) {
        var graded = pis[4];
        var enrolled = pis[5];

        if(!enrolled){
          pendidikanIslam.hide();
        }
        if(graded) {
          pendidikanIslam.hide();
        }

      })
      //Hide AM Input Box Once Graded
      gradeInstance2.am(1).then(function(ams) {
        var graded = ams[4];
        var enrolled = ams[5];

        if(!enrolled){
          addMaths.hide();
        }
        if(graded) {
          addMaths.hide();
        }

      })
      //Hide PY Input Box Once Graded
      gradeInstance2.py(1).then(function(pys) {
        var graded = pys[4];
        var enrolled = pys[5];

        if(!enrolled){
          physics.hide();
        }

        if(graded) {
          physics.hide();
        }

      })
      //Hide BL Input Box Once Graded
      gradeInstance2.bl(1).then(function(bls) {
        var graded = bls[4];
        var enrolled = bls[5];

        if(!enrolled){
          biology.hide();
        }

        if(graded) {
          biology.hide();
        }

      })
      //Hide CM Input Box Once Graded
      gradeInstance2.cm(1).then(function(cms) {
        var graded = cms[4];
        var enrolled = cms[5];

        if(!enrolled){
          chemistry.hide();
        }

        if(graded) {
          chemistry.hide();
        }

      })

      gradeInstance2.ss(1).then(function(ss) {
        var remarked = ss[5];

        if(remarked){
          studentRemark.hide();
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
  submitbmGrade: function() {
    //student within subject instance
    var studentID = 1;
    //value of marks input
    var subjectMarks = $('#bm-marks').val()
    //subject Identifier
    var subjectIdentifier = 1;
    App.contracts.Grade.deployed().then(function(instance2) {
      return instance2.grade(studentID, subjectMarks, subjectIdentifier, { from: App.account });
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
    var studentID = 1;
    //value of marks input
    var subjectMarks = $('#bi-marks').val()
    //subject Identifier
    var subjectIdentifier = 2;
    App.contracts.Grade.deployed().then(function(instance2) {
      return instance2.grade(studentID, subjectMarks, subjectIdentifier, { from: App.account });
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
    var studentID = 1;
    //value of marks input
    var subjectMarks = $('#sj-marks').val()
    //subject Identifier
    var subjectIdentifier = 3;
    App.contracts.Grade.deployed().then(function(instance2) {
      return instance2.grade(studentID, subjectMarks, subjectIdentifier, { from: App.account });
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
    var studentID = 1;
    //value of marks input
    var subjectMarks = $('#ma-marks').val()
    //subject Identifier
    var subjectIdentifier = 4;
    App.contracts.Grade.deployed().then(function(instance2) {
      return instance2.grade(studentID, subjectMarks, subjectIdentifier, { from: App.account });
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
    var studentID = 1;
    //value of marks input
    var subjectMarks = $('#pm-marks').val()
    //subject Identifier
    var subjectIdentifier = 5;
    App.contracts.Grade.deployed().then(function(instance2) {
      return instance2.grade(studentID, subjectMarks, subjectIdentifier, { from: App.account });
    }).then(function() {
      // Wait for grades to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },
  submitpiGrade: function() {
    //student within subject instance
    var studentID = 1;
    //value of marks input
    var subjectMarks = $('#pi-marks').val()
    //subject Identifier
    var subjectIdentifier = 6;
    App.contracts.Grade.deployed().then(function(instance2) {
      return instance2.grade(studentID, subjectMarks, subjectIdentifier, { from: App.account });
    }).then(function() {
      // Wait for grades to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },
  submitamGrade: function() {
    //student within subject instance
    var studentID = 1;
    //value of marks input
    var subjectMarks = $('#am-marks').val()
    //subject Identifier
    var subjectIdentifier = 7;
    App.contracts.Grade.deployed().then(function(instance2) {
      return instance2.grade(studentID, subjectMarks, subjectIdentifier, { from: App.account });
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
    var studentID = 1;
    //value of marks input
    var subjectMarks = $('#py-marks').val()
    //subject Identifier
    var subjectIdentifier = 8;
    App.contracts.Grade.deployed().then(function(instance2) {
      return instance2.grade(studentID, subjectMarks, subjectIdentifier, { from: App.account });
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
    var studentID = 1;
    //value of marks input
    var subjectMarks = $('#bl-marks').val()
    //subject Identifier
    var subjectIdentifier = 9;
    App.contracts.Grade.deployed().then(function(instance2) {
      return instance2.grade(studentID, subjectMarks, subjectIdentifier, { from: App.account });
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
    var studentID = 1;
    //value of marks input
    var subjectMarks = $('#cm-marks').val()
    //subject Identifier
    var subjectIdentifier = 10;
    App.contracts.Grade.deployed().then(function(instance2) {
      return instance2.grade(studentID, subjectMarks, subjectIdentifier, { from: App.account });
    }).then(function() {
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },
  submitStudentRemark: function() {
    //student within subject instance
    var studentID = 1;
    //value of marks input
    var studentRemark = $('#student-Remark').val()
    App.contracts.Grade.deployed().then(function(instance2) {
      return instance2.remarks(studentID, studentRemark, { from: App.account });
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