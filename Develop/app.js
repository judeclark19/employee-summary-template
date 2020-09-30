// IMPORTS
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
// inquirer.registerPrompt("recursive", require("inquirer-recursive"));
const path = require("path");
const fs = require("fs");
const render = require("./lib/htmlRenderer");
const { run } = require("jest");

//VALIDATION FUNCTIONS

// function validateConfirm(input) {
//   if (input === "y" || input === "n") {
//     return true;
//   }
//   return "Please enter 'y' or 'n'.";
// }

function validateInput(input) {
  if (input) {
    return true;
  }
  return "Please enter a value.";
}

function validateEmail(email) {
  // console.log(/\S+@\S+\.\S+/.test(email));
  if (/\S+@\S+\.\S+/.test(email)) {
    return /\S+@\S+\.\S+/.test(email);
  }
  return "Please enter a valid email address.";
}

// ARRAYS
const managersArray = [];
const engineersArray = [];
const internsArray = [];
const employeesData = [];
const questionsArray = [
  {
    type: "input",
    name: "name",
    message: "Enter the employee's name:",
    validate: validateInput,
    // validate: function validateName(name) {
    //   return name !== "";
    // },
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
    validate: validateInput,
  },
  {
    type: "input",
    name: "email",
    message: "Enter the employee's email:",
    validate: validateEmail,
  },
  {
    type: "input",
    name: "officeNumber",
    message: "Enter this manager's office number:",
    validate: validateInput,
    when: function (response) {
      return response.role == "Manager";
    },
  },
  {
    type: "input",
    name: "github",
    message: "Enter this engineer's GitHub username:",
    validate: validateInput,
    when: function (response) {
      return response.role == "Engineer";
    },
  },
  {
    type: "input",
    name: "school",
    message: "Enter this intern's school name:",
    validate: validateInput,
    when: function (response) {
      return response.role == "Intern";
    },
  },
  {
    type: "list",
    name: "addAnother",
    message: "Add another employee?",
    choices: ["Yes, add another.", "No, render my new page."],
  },
];

//Path stuff, unclear
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

function runInquirer() {
  inquirer
    .prompt(questionsArray)
    .then(function (answers) {
      employeesData.push(answers);

      // console.log("employeesData:");
      // console.log("================================");
      // console.log(employeesData);

      if (answers.addAnother == "Yes, add another.") {
        runInquirer();
      } else {
        console.log("STOP INQUIRY. RESULT:");
        console.log(employeesData);

        //Filter out Managers and convert to objects
        const managersData = employeesData.filter(({ role }) => {
          return role == "Manager";
        });

        const managersArray = [];

        managersData.forEach((manager) => {
          const member = new Manager(
            manager.name,
            manager.id,
            manager.email,
            manager.officeNumber
          );
          managersArray.push(member);
        });

        //Filter out Engineers and convert to objects
        const engineersData = employeesData.filter(({ role }) => {
          return role == "Engineer";
        });

        const engineersArray = [];

        engineersData.forEach((engineer) => {
          const member = new Engineer(
            engineer.name,
            engineer.id,
            engineer.email,
            engineer.github
          );
          engineersArray.push(member);
        });

        //Filter out Engineers and convert to objects
        const internsData = employeesData.filter(({ role }) => {
          return role == "Intern";
        });

        const internsArray = [];

        internsData.forEach((intern) => {
          const member = new Intern(
            intern.name,
            intern.id,
            intern.email,
            intern.school
          );
          internsArray.push(member);
        });

        //spread them all together!
        const employeesArray = [
          ...managersArray,
          ...engineersArray,
          ...internsArray,
        ];

        console.log("New array of objects run thru classes:");
        console.log(employeesArray);

        // render them?
        const renderTeam = render(employeesArray);
        fs.writeFile(outputPath, renderTeam, function (err) {
          if (err) throw err;
          console.log("Render success");
        });
      }
    })
    .catch((error) => {
      if (error) throw error;
    });
}

runInquirer();
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
