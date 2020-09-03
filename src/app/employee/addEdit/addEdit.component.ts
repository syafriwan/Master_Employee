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
  isNumberNIP = false;
  isUniqeuNIP = false;
  positionSelection = [];
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
  ngOnInit() {
    this.getPosition(0);
  }
  addEmployees() {
    let employee = new Employee();
    employee.name = this.paramEmployee.name;
    employee.birthDate = new Date(this.paramEmployee.birthDate);
    employee.position = Number(this.paramEmployee.position.id);
    employee.idNumber = Number(this.paramEmployee.idNumber);
    employee.gender = Number(this.paramEmployee.gender);
    console.log(employee);

    // this.employeeService.addEmployees(employee).subscribe(
    //   rs => {
    //       console.log(rs)
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
  }
  getPosition(param) {
    this.employeeService.getPositionEmployees(param).subscribe(
      rs => {
        this.positionSelection = rs.positionList;
      },
      error => {
        console.log(error);
      }
    );
  }

  test() {
    const field = document.querySelector('[name="username"]');
    field.addEventListener("keypress", function(event) {
    const key = event.keyCode;
      if (key === 32) {
        event.preventDefault();
      }
    });
    this.isNumberNIP = /^\d*$/.test(this.paramEmployee.idNumber);
    console.log(this.isNumberNIP);
    this.employeeService.getEmployees().subscribe(
      rs => {
        this.isUniqeuNIP = rs.content.every(v => {
          return v.idNumber != this.paramEmployee.idNumber;
        });
      },
      error => {
        console.log(error);
      }
    );
  }
}
