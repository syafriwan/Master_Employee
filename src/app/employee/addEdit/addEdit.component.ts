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
  editValueNIP = "";
  positionSelection = [];
  paramEmployee = {
    id:0,
    name: "",
    birthDate: "",
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
    if (this.route.queryParams) {
      this.route.queryParams.subscribe(params => {
        this.editValueNIP = params.idNumber;
        this.paramEmployee.id = Number(params.id);
        this.paramEmployee.name = params.name;
        this.paramEmployee.birthDate = params.birthDate;
        this.paramEmployee.position.id = params.position;
        this.paramEmployee.idNumber = params.idNumber;
        this.paramEmployee.gender = params.gender;
        console.log(this.paramEmployee);
      });
    }
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
      this.addEditEmployees();
      this.toogleModal();
    }
  }
  addEditEmployees() {
    const date = new Date(this.paramEmployee.birthDate);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    const output = year + "-" + month + "-" + day;
    let employee = new Employee();
    employee.name = this.paramEmployee.name;
    employee.birthDate = output;
    employee.position.id = Number(this.paramEmployee.position.id),
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
