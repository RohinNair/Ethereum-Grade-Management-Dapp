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

  calculateGrade: function(marks) {
    var grade ="-";

    if(marks>=90 && marks<=100){
      grade = "A+";
    }
    else
    if(marks>=80 && marks<=89){
      grade = "A";
    }
    else
    if(marks>=75 && marks<=79){
      grade = "A-";
    }
    else
    if(marks>=70 && marks<=74){
      grade = "B+";
    }
    else
    if(marks>=65 && marks<=69){
      grade = "B";
    }
    else
    if(marks>=60 && marks<=64){
      grade = "C+";
    }
    else
    if(marks>=50 && marks<=59){
      grade = "C";
    }
    else
    if(marks>=40 && marks<=49){
      grade = "D";
    }
    else
    if(marks>=30 && marks<=39){
      grade = "E";
    }
    else
    if(marks>=1 && marks<=29){
      grade = "G";
    }

    return grade;
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

    var studentsName = $("#studentsName");
    studentsName.empty();

    var studentsId = $("#studentsId");
    studentsId.empty();

    var subCount = $("#subCount");
    subCount.empty();

    var totalMarks = $("#totalMarks");
    totalMarks.empty();

    var marksPercentage = $("#marksPercentage");
    marksPercentage.empty();

    var studentPointAverage = $("#studentPointAverage");
    studentPointAverage.empty();

    var studentRemarks = $("#studentRemarks");
    studentRemarks.empty();

    var bmMarks = $("#bmMarks");
    bmMarks.empty();
    
    var biMarks = $("#biMarks");
    biMarks.empty();

    var sjMarks = $("#sjMarks");
    sjMarks.empty();

    var maMarks = $("#maMarks");
    maMarks.empty();

    var pmMarks = $("#pmMarks");
    pmMarks.empty();

    var piMarks = $("#piMarks");
    piMarks.empty();

    var amMarks = $("#amMarks");
    amMarks.empty();

    var pyMarks = $("#pyMarks");
    pyMarks.empty();

    var blMarks = $("#blMarks");
    blMarks.empty();

    var cmMarks = $("#cmMarks");
    cmMarks.empty();

    const student = await App.grade.bm(1)
    var Id = student[1];
    var name = student[2];

        //Append pulled data to front-end
        var nameTemplate = "<td>" + name + "</td>"
        studentsName.append(nameTemplate);

        var IdTemplate = "<td>" + Id + "</td>"
        studentsId.append(IdTemplate);

    const ss = await App.grade.ss(1)
    //Store data from blockchain into variables
    var subs = ss[1];
    var total = ss[2];
    var totalGPP = ss[3];
    var average = 0;
    var studentAverage = 0;
    var teacherRemarks = ss[4];

    //Calculate and append average marks and round off to 2 DP
    average = (total/subs);
    var averageRounded = average.toFixed(2);

    //Calculate and append average pointer and round off to 2 DP
    studentAverage = (totalGPP/subs);
    var studentAverageRounded = studentAverage.toFixed(2);

    //Append pulled data to front-end
    var subTemplate = "<td>" + subs + "</td>"
    subCount.append(subTemplate);

    var totalTemplate = "<td>" + total + "</td>"
    totalMarks.append(totalTemplate);

    var percentageTemplate = "<td>" + averageRounded + " %" + "</td>"
    marksPercentage.append(percentageTemplate);

    var studentAverageTemplate = "<td>" + studentAverageRounded + "</td>"
    studentPointAverage.append(studentAverageTemplate);

    var studentRemarksTemplate = "<td>" + teacherRemarks + "</td>"
    studentRemarks.append(studentRemarksTemplate);

    const bm = await App.grade.bm(1)

          var subjectName = "Bahasa Malaysia";
          var marks = bm[3];
          var grade ="-";
          var graded = bm[4];

          //Check if absent
          if(marks == 0 && graded){
            grade = "Absent";
          }
          else{
          //Calculate grade
          grade = App.calculateGrade(marks);
          }

          // Render BM Grades
          var Template = "<tr><td>" + subjectName + "</td><td>" + marks + "</td><td>" + grade + "</td></tr>"
          bmMarks.append(Template);

    const bi = await App.grade.bi(1)

          var subjectName = "Bahasa Inggeris";
          var marks = bi[3];
          var grade ="-";
          var graded = bi[4];

          //Check if absent
          if(marks == 0 && graded){
            grade = "Absent";
          }
          else{
          //Calculate grade
          grade = App.calculateGrade(marks);
          }

          // Render BI Grades
          var Template = "<tr><td>" + subjectName + "</td><td>" + marks + "</td><td>" + grade + "</td></tr>"
          biMarks.append(Template);

    const sj = await App.grade.sj(1)
          var subjectName = "Sejarah";
          var marks = sj[3];
          var grade ="-";
          var graded = sj[4];

          //Check if absent
          if(marks == 0 && graded){
            grade = "Absent";
          }
          else{
          //Calculate grade
          grade = App.calculateGrade(marks);
          }

          // Render Sejarah Grades
          var Template = "<tr><td>" + subjectName + "</td><td>" + marks + "</td><td>" + grade + "</td></tr>"
          sjMarks.append(Template);
    
    const ma = await App.grade.ma(1)
          var subjectName = "Mathematics";
          var marks = ma[3];
          var grade ="-";
          var graded = ma[4];

          //Check if absent
          if(marks == 0 && graded){
            grade = "Absent";
          }
          else{
          //Calculate grade
          grade = App.calculateGrade(marks);
          }

          // Render Mathematics Grades
          var Template = "<tr><td>" + subjectName + "</td><td>" + marks + "</td><td>" + grade + "</td></tr>"
          maMarks.append(Template);

    const pm = await App.grade.pm(1)
          var subjectName = "Pendidikan Moral";
          var pmstudent = pm[2];
          var marks = pm[3];
          var grade ="-";
          var enrol = pm[5];
          var graded = pm[4];

          //Check if enrolled
          if(enrol && pmstudent == "Adam"){

            //Check if absent
            if(marks == 0 && graded){
              grade = "Absent";
            }
            else{
            //Calculate grade
            grade = App.calculateGrade(marks);
            }

          // Render Pendidikan Moral Grades
          var Template = "<tr><td>" + subjectName + "</td><td>" + marks + "</td><td>" + grade + "</td></tr>"
          pmMarks.append(Template);
          }

    const pi = await App.grade.pi(1)
          var subjectName = "Pendidikan Islam";
          var pistudent = pi[2];
          var marks = pi[3];
          var grade ="-";
          var enrol = pi[5];
          var graded = pi[4];

          //Check if enrolled
          if(enrol && pistudent == "Adam"){

            //Check if absent
            if(marks == 0 && graded){
              grade = "Absent";
            }
            else{
            //calculate grade
            grade = App.calculateGrade(marks);
            }

          // Render Pendidikan Moral Grades
          var Template = "<tr><td>" + subjectName + "</td><td>" + marks + "</td><td>" + grade + "</td></tr>"
          pmMarks.append(Template);
          }

    const am = await App.grade.am(1)
          var subjectName = "Additional Mathematics";
          var marks = am[3];
          var grade ="-";
          var enrol = am[5];
          var graded = am[4];
          
          //Check if enrolled
          if(enrol){
          
            //Check if absent
            if(marks == 0 && graded){
              grade = "Absent";
            }
            else{
            //Calculate grade
            grade = App.calculateGrade(marks);
            }

          // Render Additional Mathematics Grades
          var Template = "<tr><td>" + subjectName + "</td><td>" + marks + "</td><td>" + grade + "</td></tr>"
          amMarks.append(Template);
          }

    const py = await App.grade.py(1)
          var subjectName = "Physics";
          var marks = py[3];
          var grade ="-";
          var enrol = py[5];
          var graded = py[4];

          //Check if enrolled
          if(enrol){
            
            //Check if absent
            if(marks == 0 && graded){
              grade = "Absent";
            }
            else{
            //Calculate grade
            grade = App.calculateGrade(marks);
            }

          // Render Physics Grades
          var Template = "<tr><td>" + subjectName + "</td><td>" + marks + "</td><td>" + grade + "</td></tr>"
          pyMarks.append(Template);
          }

    const bl = await App.grade.bl(1)
          var subjectName = "Biology";
          var marks = bl[3];
          var grade ="-";
          var enrol = bl[5];
          var graded = bl[4];

          //Check if enrolled
          if(enrol){
            
            //Check if absent
            if(marks == 0 && graded){
              grade = "Absent";
            }
            else{
            //Calculate grade
            grade = App.calculateGrade(marks);
            }

          // Render Biology Grades
          var Template = "<tr><td>" + subjectName + "</td><td>" + marks + "</td><td>" + grade + "</td></tr>"
          blMarks.append(Template);
          }

    const cm = await App.grade.cm(1)
          var subjectName = "Chemistry";
          var marks = cm[3];
          var grade ="-";
          var enrol = cm[5];
          var graded = cm[4];

          //Check if enrolled
          if(enrol){
            
            //Check if absent
            if(marks == 0 && graded){
              grade = "Absent";
            }
            else{
            //Calculate grade
            grade = App.calculateGrade(marks);
            }

          // Render Chemistry Grades
          var Template = "<tr><td>" + subjectName + "</td><td>" + marks + "</td><td>" + grade + "</td></tr>"
          cmMarks.append(Template);
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