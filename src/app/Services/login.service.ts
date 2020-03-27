import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { login } from '../Models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginDetails: BehaviorSubject<login[]> = new BehaviorSubject<any>({
  });

  constructor(private http: HttpClient) {
  }

  //get complete team data
  public getLoginData(): Observable<any> {
    return this.http.get("https://5e72ed33942d92001611b168.mockapi.io/dashboard/api/login");
  }

  //passing data between components:

  setloginDetails(loginDetails: login[]) {
    localStorage.setItem('adminID', (loginDetails[0].id).toString());
    localStorage.setItem("loginInfo", JSON.stringify(loginDetails));
    this.loginDetails.next(loginDetails);
  }

  getloginDetails() {
    return this.loginDetails.asObservable();
  }

}
