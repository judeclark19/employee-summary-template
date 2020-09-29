// IMPORTS
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
inquirer.registerPrompt("recursive", require("inquirer-recursive"));
const path = require("path");
const fs = require("fs");
const render = require("./lib/htmlRenderer");

// ARRAYS
const managersArray = [];
const engineersArray = [];
const internsArray = [];
// const employeesArray = [];
const questionsArray = [
  {
    type: "input",
    name: "name",
    message: "Enter the employee's name:",
  },
  {
    type: "list",
    name: "role",
    message: "Choose the employee's role:",
    choices: ["Manager", "Engineer", "Intern"],
  },
  {
    type: "input",
    name: "id",
    message: "Enter the employee's ID:",
  },
  {
    type: "input",
    name: "email",
    message: "Enter the employee's email:",
  },
  {
    type: "input",
    name: "officeNumber",
    message: "Enter this manager's office number:",
    when: function (response) {
      return response.role == "Manager";
    },
  },
  {
    type: "input",
    name: "github",
    message: "Enter this engineer's GitHub username:",
    when: function (response) {
      return response.role == "Engineer";
    },
  },
  {
    type: "input",
    name: "school",
    message: "Enter this intern's school name:",
    when: function (response) {
      return response.role == "Intern";
    },
  },

  // {
  //   type: "confirm",
  //   name: "addAnother",
  //   message: "Add another employee to the page?",
  // },
];

//Path stuff, unclear
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

inquirer
  .prompt([
    {
      type: "recursive",
      message: "Add a new employee to the page?",
      name: "employeesData",
      prompts: questionsArray,
    },
  ])
  .then(function (answers) {
    // if (answers.recursive) {
    //   employeesArray.push(answers);
    //   console.log(employeesArray);
    // }
    employeesData = answers.employeesData;
    console.log(employeesData);
    // render(employeesArray);

    // const renderTeam = render(employeesArray);
    // fs.writeFile(outputPath, renderTeam, function (err) {
    //   if (err) throw err;
    //   console.log("successfully written");
    // });
  })
  .catch((error) => {
    if (error) throw error;
  });
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
