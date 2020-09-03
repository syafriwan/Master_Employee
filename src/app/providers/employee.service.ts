import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getEmployees(param?): Observable<any> {
    let url = `http://localhost:8080/employees?sort=${
      param ? param.sortName : ""
    },${param ? param.sortType : ""}`;
    let response: any;
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
      // 'X-Requested-Url': url,
      // 'X-Requested-Method': 'POST',
      // 'Authorization': Authorization
    });
    let options = { headers: headers };

    return this.http.get(url, options).pipe(map(this.extractData));
  }
  deleteEmployees(body): Observable<any> {
    console.log(JSON.stringify(body));
    let url = `http://localhost:8080/employeeDelete`;
    let response: any;
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
      // 'X-Requested-Url': url,
      // 'X-Requested-Method': 'POST',
      // 'Authorization': Authorization
    });
    let options = { headers: headers };

    return this.http
      .post(url, JSON.stringify(body), options)
      .pipe(map(this.extractData));
  }
  addEmployees(body): Observable<any> {
    console.log(JSON.stringify(body));
    let url = `http://localhost:8080/employeeAdd`;
    let response: any;
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
      // 'X-Requested-Url': url,
      // 'X-Requested-Method': 'POST',
      // 'Authorization': Authorization
    });
    let options = { headers: headers };

    return this.http
      .post(url, JSON.stringify(body), options)
      .pipe(map(this.extractData));
  }
  editEmployees(body): Observable<any> {
    console.log(JSON.stringify(body));
    let url = `http://localhost:8080/employeeEdit`;
    let response: any;
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
      // 'X-Requested-Url': url,
      // 'X-Requested-Method': 'POST',
      // 'Authorization': Authorization
    });
    let options = { headers: headers };

    return this.http
      .post(url, JSON.stringify(body), options)
      .pipe(map(this.extractData));
  }
  getPositionEmployees(body): Observable<any> {
    let url = `http://localhost:8080/employeePosition/${body}`;
    let response: any;
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
      // 'X-Requested-Url': url,
      // 'X-Requested-Method': 'POST',
      // 'Authorization': Authorization
    });
    let options = { headers: headers };

    return this.http.get(url, options).pipe(map(this.extractData));
  }
  private extractData(body: any) {
    return Object.assign(body);
  }
  private handleError(error: HttpErrorResponse | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    let errObj: any;

    if (error instanceof HttpErrorResponse) {
      const err = error.message || JSON.stringify(error);
      errMsg = `${error.status} - ${error.statusText || ""} ${err}`;
      errObj = error.message;
    } else {
      errMsg = error.message ? error.message : error.toString();
      const body = error.message || "";
      errObj = body;
    }
    return Observable.throw(error.status);
  }
}
