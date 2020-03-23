import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { LoginService } from '../app/Services/login.service';
import { login } from '../app/Models/login';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loginForm: FormGroup;
  OnLoad: boolean = true;
  showErrorMsg = false;
  submitted = false;
  ErrorMessage: string = "";
  username: string;
  inputPassword: string;
  login: login[];

  constructor(private formBuilder: FormBuilder, private ActivatedRoute: ActivatedRoute, private router: Router,
    private LoginService: LoginService) { }


  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      inputPassword: ['', Validators.required]
    });

  }

  get f() {
    return this.loginForm.controls;
  }


  onSubmit() {
    this.submitted = true;
    this.showErrorMsg = false;
    //return on errors
    if (this.loginForm.invalid) {
      this.constructError();
    }
    this.LoginService.getLoginData().subscribe(data => {
      this.verifyLogin(data);
    });


  }

  constructError() {
    this.showErrorMsg = true;
    this.ErrorMessage = "Username or password is incorrect";
    return;
  }

  verifyLogin(responseData) {
    const unFormattedData = of(responseData);
    unFormattedData.pipe(
      map(data => {
        return data.filter(item => {
          return (item.name === this.username && item.Passsword == this.inputPassword);
        });
      })
    ).subscribe(results => {
      if (results.length > 0) {
        this.login = results;
        this.LoginService.setloginDetails(this.login);
        this.navigateNext();
      } else {
        this.constructError();
      }

    });
  }

  navigateNext() {

    this.OnLoad = false;
    this.router.navigateByUrl('/home');
  }

  resetPassword() {
    this.submitted = true;
    this.showErrorMsg = true;
    this.ErrorMessage = "Please contact your Supervisor";
  }


}
