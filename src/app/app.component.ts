import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "./providers/employee.service";
import {Employee} from "./model/employee"
@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  employees = [];
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
  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {}

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
          return v.isDelete != 0;
        });
      },
      error => {
        console.log(error);
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
    let paramDelete = new Employee()
    paramDelete.id = param.id
    paramDelete.name = param.name
    paramDelete.birthDate = new Date(param.birthDate)
    paramDelete.position = param.position
    paramDelete.idNumber = param.idNumber
    paramDelete.gender = param.gender
    paramDelete.isDelete = param.isDelete
    this.getEmployees(JSON.stringify(paramDelete));
  }
}
