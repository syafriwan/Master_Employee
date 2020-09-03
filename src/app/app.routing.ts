
// app.routing.ts
// App Routing as a Module
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {EmployeeComponent} from "./employee/employee.component";
import {AddEditComponent} from "./employee/addEdit/addEdit.component";
// Routes
const routes: Routes = [
  {
    path: "promise/karyawanindex",
    component: EmployeeComponent,
  },
  {
    path: "promise/karyawaneditadd",
    component: AddEditComponent,
  },
  { path: "**", redirectTo: "promise/karyawanindex"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export const rc = [EmployeeComponent,AddEditComponent];
