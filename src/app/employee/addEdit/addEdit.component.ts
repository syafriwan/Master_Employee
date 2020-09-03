import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "../../providers/employee.service";
import { Employee } from "../../model/employee";

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
    const date  = new Date(this.paramEmployee.birthDate);
    let stringDate = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
    let employee = new Employee();
    employee.name = this.paramEmployee.name;
    employee.birthDate = stringDate;
    employee.position = {
      id: Number(this.paramEmployee.position.id),
      code: "",
      name: "",
      isDelete: 0
    };
    employee.idNumber = Number(this.paramEmployee.idNumber);
    employee.gender = Number(this.paramEmployee.gender);
    console.log(employee) 

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
