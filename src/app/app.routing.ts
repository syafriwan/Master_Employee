// app.routing.ts
// App Routing as a Module
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {EmployeeComponent} from "./employee/employee.component";
// Routes
const routes: Routes = [
  {
    path: "",
    component: EmployeeComponent,

  },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export const rc = [EmployeeComponent];
