import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  formValidMeassage: string | undefined;
  LoginForm!: FormGroup;
  reportUsers: any[];
  buttonDisable: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private service: LoginService) {
    this.reportUsers = new Array<any>();
  }

  ngOnInit(): void {
    this.LoginForm = this.fb.group({
      Email: [null, Validators.required],
    })

    this.readAllPracticeReportUsers();

  }
  logIn() {
    if (this.LoginForm.valid) {
      let email = this.LoginForm.get('Email')?.value;
      let element = this.reportUsers.find((element: any) => element.emailID === email);

      console.log(element);

      // Check if user is part of Civica India
      if (!email.endsWith('@civica2.com')) {
        alert('Authentication failed. You must be a part of Civica India to access this application.');
        return;
      }

      // Check if user's role and email are present in the system's database
      if (element && (element.roleID == 1 || element.roleID == 2 || element.roleID == 3)) {
        // Check if user's role is Practice manager
        if (element.roleID == 1) {
          console.log("Practice manager: " + JSON.stringify(element.roleID));
          // navigate to quarter report page
          this.router.navigate(['./practice']);
        }
        // Check if user's role is Delivery manager or Practice champion
        else if (element.roleID == 2 || element.roleID == 3) {
          console.log("Delivery manager/ Practice champion: " + JSON.stringify(element.roleID));
          // navigate to practice report / all report page
          this.router.navigate(['./practice']);
        }

        let localData = localStorage.getItem('userId');
        let localDataStringify = localData && JSON.stringify(localData);
        if (localDataStringify) {
          localStorage.removeItem('userId');
        }
        localStorage.setItem('userId', JSON.stringify(element.practiceReportUserID));

      }
      else {
        // If the authentication fails
        alert("The system policy user service failed the login. Access is denied.");
      }
    }
    else {
      Object.values(this.LoginForm.controls).forEach(control => {
        control.markAsTouched();
        control.markAsDirty();
      });
      this.formValidMeassage = "Please Enter Email!";
      setTimeout(() => { this.formValidMeassage = undefined }, 5000);
    }
  }
  readAllPracticeReportUsers() {
    this.service.getPracticeReportUsers().subscribe(
      (data: any) => {
        this.reportUsers = data.data;
      },
      (error) => {
        console.error("error massage: " + error);
      }
    )
  };



}

