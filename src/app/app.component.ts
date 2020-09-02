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
  ];
  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {}

  getEmployees() {
    this.employeeService.getEmployees().subscribe(
      rs => {
        this.employees = rs.content.map(v => { 
          
        return {...v}

        })
      },
      error => {
        console.log(error);
      }
    );
  }
}
