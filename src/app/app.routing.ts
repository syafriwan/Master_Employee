// app.routing.ts
// App Routing as a Module
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { BookServiceComponent } from './bookservice/book.service.component';
import { AddEditComponent } from './employee/addEdit/addEdit.component';
// Routes
const routes: Routes = [
  {
    path: '',
    redirectTo: 'book/service',
    pathMatch: 'full'
  },
  {
    path: 'promise/karyawanindex',
    component: EmployeeComponent
  },
  {
    path: 'promise/karyawaneditadd',
    component: AddEditComponent
  },
  {
    path: 'book/service',
    component: BookServiceComponent
  },
  { path: '**', redirectTo: 'book/service' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export const rc = [EmployeeComponent, AddEditComponent, BookServiceComponent];
