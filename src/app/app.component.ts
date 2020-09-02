import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "./providers/employee.service";
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit   {
    employees = [
      {
birthDate: "2020-06-07T17:00:00.000+00:00",
gender: 1,
id: 1,
idNumber: 1,
isDelete: 1,
name: "rahma",
position: {
  code: "PRG",
id: 3,
isDelete: 0,
name: "Programmer",
}
      }
    ];

    constructor(
        private employeeService: EmployeeService
    ) { }

    ngOnInit() {
  
    }

    getEmployees() {
    
      this.employeeService.getEmployees().subscribe(rs => {
          console.log(rs);
          this.employees = rs.content;
         console.log(this.employees[0].name )
        },
        error => {
          console.log(error);
     
        }
      );
    }
  }
