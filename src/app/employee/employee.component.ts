import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "../providers/employee.service";
import { Employee } from "../model/employee";
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: "employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"]
})
export class EmployeeComponent implements OnInit {
  employees = [];
  paramDelete = new Employee();
  monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"
  ];
  modalActive = false;
  constructor(private employeeService: EmployeeService,private router: Router,) {}

  ngOnInit() {
    this.getEmployees()
  }
  toogleModal() {
    this.modalActive = !this.modalActive;
  }
  goAdd(){
    this.router.navigate(["promise/karyawaneditadd"]);
  }
  goEdit(param){
    this.router.navigate(["promise/karyawaneditadd"], { queryParams: param });
    console.log(param)
  }
  modalAction(param){
    console.log(param)
    if(param == 'no'){
      this.toogleModal()
    }else{
      this.deleteEmployess(this.paramDelete);
      this.toogleModal()
      this.getEmployees()
    }
  }
  formatDate(param) {
    let dateObj = new Date(param);
    let month = this.monthNames[dateObj.getMonth()];
    let day = String(dateObj.getDate()).padStart(2, "0");
    let year = dateObj.getFullYear();
    let output = day + "-" + month + "-" + year;
    return output;
  }
  getEmployees(param?) {
    this.employeeService.getEmployees(param).subscribe(
      rs => {
        this.employees = rs.content.map(v => {
          return { ...v, birthDate: this.formatDate(v.birthDate) };
        });
        this.employees = this.employees.filter(v => {
          return v.isDelete == 0;
        });
      },
      error => {
        console.log(error);
      }
    );
  }
 deleteEmployess(param){
    this.employeeService.deleteEmployees(param).subscribe(
      rs => {
        console.log(rs);
      },
      error => {
        console.log(error);
      }
    );
  this.ngOnInit()
  }
  sortAction(sortName, sortType) {
    let paramSort = {
      sortName: "",
      sortType: ""
    };
    paramSort.sortName = sortName;
    paramSort.sortType = sortType;
    this.getEmployees(paramSort);
  }
  deleteAction(param) {
    this.paramDelete = new Employee()
    this.paramDelete.id = param.id;
    // this.paramDelete.name = param.name;
    // this.paramDelete.birthDate = param.birthDate;
    // this.paramDelete.position = param.position;
    // this.paramDelete.idNumber = param.idNumber;
    // this.paramDelete.gender = param.gender;
    // this.paramDelete.isDelete = param.isDelete;
    this.toogleModal();
  }
}
