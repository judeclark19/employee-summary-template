const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");

const employeesData = [
  {
    name: "a",
    role: "Manager",
    id: "a",
    email: "a",
    officeNumber: "a",
  },
  {
    name: "a1",
    role: "Manager",
    id: "a1",
    email: "a1",
    officeNumber: "a1",
  },
  {
    name: "a2",
    role: "Manager",
    id: "a2",
    email: "a2",
    officeNumber: "a2",
  },
  { name: "b", role: "Engineer", id: "b", email: "b", github: "b" },
  { name: "b1", role: "Engineer", id: "b1", email: "b1", github: "b1" },
  { name: "b2", role: "Engineer", id: "b2", email: "b2", github: "b2" },
  { name: "c", role: "Intern", id: "c", email: "c", school: "c" },
  { name: "c1", role: "Intern", id: "c1", email: "c1", school: "c1" },
  { name: "c2", role: "Intern", id: "c2", email: "c2", school: "c2" },
];

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
const employeesArray = [...managersArray, ...engineersArray, ...internsArray];

// console.logs
// console.log("Managers Array:");
// console.log(managersArray);
// console.log("================================");
// console.log("Engineers Array:");
// console.log(engineersArray);
// console.log("================================");
// console.log("Interns Array:");
// console.log(internsArray);
// console.log("================================");
console.log("All employees Array:");
console.log(employeesArray);
