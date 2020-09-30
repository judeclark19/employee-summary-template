// TODO: Write code to define and export the Employee class
class Employee {
  constructor(name, id, email) {
      this.name = name;
      this.id = id;
      this.email = email;
  }
  getName(){
      return this.name;
  }

  getId(){
      return this.id;
  }

  getEmail(){
      return this.email;
  }

  getRole(){
      return "Employee";
  }
}

module.exports = Employee;




   // inquirer
    //   .prompt([
    //     {
    //       type: "input",
    //       name: "employeeName",
    //       message: "Employee's name:",
    //     },
    //   ])
    //   .then((employeeData) => {
    //     console.log(employeeData);
    //   })
    //   .catch((error) => {
    //     if (error) throw error;
    //   });