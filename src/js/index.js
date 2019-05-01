App = {
  loading: false,
  contracts: {},

  load: async () => {
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
    await App.render()
  },

  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */})
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadAccount: async () => {
    // Set the current blockchain account
    App.account = web3.eth.accounts[0]
  },

  loadContract: async () => {
    // Create a JavaScript version of the smart contract
    const grade = await $.getJSON('Grade.json')
    App.contracts.Grade = TruffleContract(grade)
    App.contracts.Grade.setProvider(App.web3Provider)

    // Hydrate the smart contract with values from the blockchain
    App.grade = await App.contracts.Grade.deployed()
  },

  render: async () => {
    // Prevent double render
    if (App.loading) {
      return
    }

    // Update app loading state
    App.setLoading(true)

    // Render Tasks
    await App.renderContent()

    // Update loading state
    App.setLoading(false)
  },

  //Render page function
  renderContent: async() => {

    const bmCount = await App.grade.bmCount()
    var studentsMenu = $("#studentsMenu");
    studentsMenu.empty();

    for(var i = 1; i <= bmCount; i++){
      const students = await App.grade.bm(i)
      const bmid = students[0].toNumber();
      const studentID = students[1].toNumber();
      const studentName = students[2];

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
      
      // Render UI
      var Template = "<tr><th>" + bmid + "</th><td>" + studentID + "</td><td>" 
                      + studentName + "</td><td>" + goto0 + "</td><td>" + goto1 + "</td><td>" + goto2 + "</td></tr>"
      studentsMenu.append(Template);
    }
  },

  setLoading: (boolean) => {
    App.loading = boolean
    const loader = $('#loader')
    const content = $('#content')
    if (boolean) {
      loader.show()
      content.hide()
    } else {
      loader.hide()
      content.show()
    }
  },
};

$(() => {
  $(window).load(() => {
    App.load()
  })
});