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

  //Render page function
  render: function() {
    var gradeInstance;
    //Target specific HTML tags in UI
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load contract data
    App.contracts.Grade.deployed().then(function(instance) {
      gradeInstance = instance;
      return gradeInstance.bmCount();
    }).then(function(bmCount) {
      var studentsMenu = $("#studentsMenu");
      studentsMenu.empty();

      //Display hyperlinks
      for (var i = 1; i <= bmCount; i++) {
        gradeInstance.bm(i).then(function(bms) {
          var bmid = bms[0];
          var studentid = bms[1];
          var studentName = bms[2];
          links0 = [
            "",
            '<a href="./enrollelectives1.html">Enroll</a>',
            '<a href="./enrollelectives2.html">Enroll</a>'
          ];
          links1 = [
            "",
            '<a href="./inputmarks1.html">Grade</a>',
            '<a href="./inputmarks2.html">Grade</a>'
          ];
          links2 = [
            "",
            '<a href="./displaymarks1.html">View</a>',
            '<a href="./displaymarks2.html">View</a>'
          ];
          var goto0 = links0[bmid];
          var goto1 = links1[bmid];
          var goto2 = links2[bmid];
          // Render Student Menu
          var studentTemplate = "<tr><th>" + bmid + "</th><td>" + studentid + "</td><td>" 
                                + studentName + "</td><td>" + goto0 + "</td><td>" + goto1 + "</td><td>" + goto2 + "</td></tr>"
          studentsMenu.append(studentTemplate);
        });
      }
      return gradeInstance.graded(App.account);
  }).then(function() {
      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});