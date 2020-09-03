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
  isNumberNIP = true;
  isUniqueNIP = true;
  isEdit = false;
  idOnEdit: any;
  nipOnEdit: any;
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
  modalActive = false;
  isLoading = false;
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.route.queryParams) {
      this.route.queryParams.subscribe(params => {
        params.edit == "true" ? (this.isEdit = true) : (this.isEdit = false);
        this.idOnEdit = Number(params.id) || 0;
        console.log(params);
      });
    }
  }
  toogleModal() {
    this.modalActive = !this.modalActive;
  }
  ngOnInit() {
    if (this.isEdit) {
      this.getPosition(this.idOnEdit);
    } else {
      this.getPosition(0);
    }
  }
  modalAction(param) {
    if (param == "no") {
      this.toogleModal();
    } else {
      this.addEditEmployees();
      this.toogleModal();
    }
  }
  titleCase(str) {
   let splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
   splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   return splitStr.join(' '); 
 }
  addEditEmployees() {
    const date = new Date(this.paramEmployee.birthDate);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    const output = year + "-" + month + "-" + day;
    let employee = new Employee();
    
    employee.name = this.titleCase(this.paramEmployee.name);
    employee.birthDate = output;
    employee.position = {
      id: this.paramEmployee.position.id
    },
    employee.idNumber = this.paramEmployee.idNumber;
    employee.gender = this.paramEmployee.gender;
    console.log(employee);
    if (this.isEdit) {
      employee.id = this.idOnEdit.toString()
      this.isLoading = true
      this.employeeService.editEmployees(employee).subscribe(
        rs => {
          if (rs.status == 200) {
            this.router.navigate(["/promise/karyawanindex"]);
          }
          this.isLoading = false
        },
        error => {
          console.log(error);
          this.isLoading = false
        }
      );
    }
    else{
      this.isLoading = true
       this.employeeService.addEmployees(employee).subscribe(
        rs => {
        if (rs.status == 200) {
            this.router.navigate(["/promise/karyawanindex"]);
          }
         this.isLoading = false
        },
        error => {
          console.log(error);
          this.isLoading = false
        }
      );
    }
  }
  back() {
    this.router.navigate(["/promise/karyawanindex"]);
  }
  getPosition(param) {
    this.isLoading = true;
    this.employeeService.getPositionEmployees(param).subscribe(
      rs => {
        this.positionSelection = rs.data.positionList;
        if (this.isEdit) {
          this.paramEmployee.name = rs.data.employee.name;
          this.paramEmployee.birthDate = rs.data.employee.birthDate;
          this.paramEmployee.position.id = rs.data.employee.position.id.toString();
          this.paramEmployee.idNumber = rs.data.employee.idNumber.toString();
          this.paramEmployee.gender = rs.data.employee.gender.toString();
          this.nipOnEdit = rs.data.employee.idNumber;
        }
        this.isLoading = false
      },
      error => {
        console.log(error);
        this.isLoading = false
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
    this.isLoading = true
    this.employeeService.getEmployees().subscribe(
      rs => {
        this.isUniqueNIP = rs.data.content.every(v => {
          return v.idNumber != this.paramEmployee.idNumber;
        });
        this.isLoading = false
        // console.log(this.isNumberNIP)
        console.log(this.isUniqueNIP)
      },
      error => {
        console.log(error);
        this.isLoading = false
      }
    );
  }
}
