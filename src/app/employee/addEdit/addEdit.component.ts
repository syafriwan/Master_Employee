import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "../../providers/employee.service";
import { Employee } from "../../model/employee";
import { Router, ActivatedRoute } from "@angular/router";
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
    birthDate: "2020-10-08",
    position: {
      id: ""
    },
    idNumber: "",
    gender: ""
  };
  modalActive = false;
  toogleModal() {
    this.modalActive = !this.modalActive;
  }
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      // const date = new Date(params.birthDate);
      // this.paramEmployee.name = params.name;
      // this.paramEmployee.birthDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}` ;
      // this.paramEmployee.position = params.position;
      // this.paramEmployee.idNumber = params.idNumber;
      // this.paramEmployee.gender = params.gender;
      // console.log(this.paramEmployee)
            console.log(JSON.stringify(params.position.id))
    });
  }
  ngOnInit() {
    this.getPosition(0);
    // console.log(this.paramEmployee)
  }
  modalAction(param) {
    console.log(param);
    if (param == "no") {
      this.toogleModal();
    } else {
      this.addEmployees();
      this.toogleModal();
    }
  }
  addEmployees() {
    const date = new Date(this.paramEmployee.birthDate);
    let stringDate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
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
    this.employeeService.addEmployees(employee).subscribe(
      rs => {
        if (rs) {
          this.router.navigate(["/promise/karyawanindex"]);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  back() {
    this.router.navigate(["/promise/karyawanindex"]);
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
