import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "./providers/employee.service";
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
  ]
  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {}
  
  formatDate(param){
  let dateObj = new Date(param);
  let month = this.monthNames[dateObj.getMonth()];
  let day = String(dateObj.getDate()).padStart(2, "0");
  let year = dateObj.getFullYear();
  let output = day + "-" + month + "-" + year;
  return output;
  }
  getEmployees(param?){
    this.employeeService.getEmployees().subscribe(
      rs => {
        this.employees = rs.content.map(v => {  
        return {...v, birthDate: this.formatDate(v.birthDate)}
        })
      },
      error => {
        console.log(error);
      }
    );
  }
  sortAction(sortName,sortType){
  let paramEmployees = {
    sortName:"",
    sortType:""
  }
    paramEmployees.sortName = sortName;
    paramEmployees.sortType = sortType;
    this.employeeService.getEmployees(paramEmployees).subscribe(
      rs => {
        this.employees = rs.content.map(v => {  
        return {...v, birthDate: this.formatDate(v.birthDate)}
        })
      },
      error => {
        console.log(error);
      }
    );
  }
}
