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
  isLoading = false;
  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getEmployees();
  }
  toogleModal() {
    this.modalActive = !this.modalActive;
  }
  goAdd() {
    const param = {
      edit:false
    };
    this.router.navigate(["promise/karyawaneditadd"], {
      queryParams: param
    });
  }
  goEdit(params) {
    const param = {
      edit:true,
      id:params.id
    };
    this.router.navigate(["promise/karyawaneditadd"], {
      queryParams: param
    });
  }
  modalAction(param) {
    if (param == "no") {
      this.toogleModal();
    } else {
      this.deleteEmployess(this.paramDelete);
      this.toogleModal();
    }
  }
  formatDate(param) {
    let dateObj = new Date(param);
    let month = this.monthNames[dateObj.getMonth()];
    let day = String(dateObj.getDate()).padStart(2, "0");
    let year = dateObj.getFullYear();
    let output = day + " " + month + " " + year;
    return output;
  }
  getEmployees(param?) {
    this.isLoading = true
    this.employeeService.getEmployees(param).subscribe(
      rs => {
        this.employees  = Object.assign(rs.data.content)
        this.employees = rs.data.content.map(v => {
          return { ...v, birthDate: this.formatDate(v.birthDate) };
        });
        // console.log(this.employees)
        this.employees = this.employees.filter(v => {
          return v.isDelete == 0;
        });
        this.isLoading = false
      },
      error => {
        console.log(error);
        this.isLoading = false
      }
    );
  }
  deleteEmployess(param) {
    this.isLoading = true
    this.employeeService.deleteEmployees(param).subscribe(
      rs => {
        this.isLoading = false
        this.getEmployees();
      },
      error => {
        console.log(error);
        this.isLoading = false
       
      }
    );
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
    this.paramDelete = new Employee();
    this.paramDelete.id = param.id;
    this.toogleModal();
  }
}
