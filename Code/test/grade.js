var Grade = artifacts.require("./Grade.sol");

contract("Grade", function(accounts) {
  var gradeInstance;

  it("initializes with two students", function() {
    return Grade.deployed().then(function(instance) {
      return instance.studentsCount();
    }).then(function(count) {
      assert.equal(count, 2);
    });
  });

  it("it initializes the students with the correct values", function() {
    return Grade.deployed().then(function(instance) {
      gradeInstance = instance;
      return gradeInstance.students(1);
    }).then(function(student) {
      assert.equal(student[0], 1, "contains the correct id");
      assert.equal(student[1], "Bob", "contains the correct name");
      assert.equal(student[2], "Bahasa Malaysia", "contains the correct subject");
      assert.equal(student[3], 0, "contains the correct marks");
      return gradeInstance.students(2);
    }).then(function(student) {
        assert.equal(student[0], 2, "contains the correct id");
        assert.equal(student[1], "Marley", "contains the correct name");
        assert.equal(student[2], "Bahasa Malaysia", "contains the correct subject");
        assert.equal(student[3], 0, "contains the correct marks");
    });
  });
});