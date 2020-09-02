import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "../../providers/employee.service";
import { Employee } from "../../model/employee";
interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: "addEdit",
  templateUrl: "./addEdit.component.html",
  styleUrls: ["./addEdit.component.css"]
})
export class AddEditComponent implements OnInit {
  foods: Food[] = [
    { value: "1", viewValue: "Programmer" },
    { value: "2", viewValue: "Tester" }
  ];
  paramEmployee = {
    name: "",
    birthDate: "",
    position: {
      id: ""
    },
    idNumber: "",
    gender: ""
  };
  constructor(private employeeService: EmployeeService) {}
  ngOnInit() {}
  addEmployees() {
    let employee = new Employee();
    employee.name = this.paramEmployee.name;
    employee.birthDate = new Date(this.paramEmployee.birthDate);
    employee.position = Number(this.paramEmployee.position.id);
    employee.idNumber = Number(this.paramEmployee.idNumber);
    employee.gender = Number(this.paramEmployee.gender);
    console.log(employee);

    // this.employeeService.addEmployees(param).subscribe(
    //   rs => {

    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
  }
  test() {
    let field = document.querySelector('[name="username"]');
    field.addEventListener("keypress", function(event) {
      var key = event.keyCode;
      if (key === 32) {
        event.preventDefault();
      }
    });
    var res = /^\d*$/.test(this.paramEmployee.idNumber);
    console.log(res);
  }
}
