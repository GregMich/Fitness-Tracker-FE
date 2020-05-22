import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authenticationFailed = false;

  loginForm = new FormGroup({
    "username": new FormControl(''),
    "password": new FormControl('')
  })
  constructor(private authService: AuthService,
      private router: Router) { }

  ngOnInit(): void {
    console.log(`is authenticated: ${this.authService.isLoggedIn()}`);
  }

  onSubmitLoginForm() {
    console.debug('onSubmitLoginForm event listener');
    console.debug(this.loginForm.value);

    this.authService.login(
      this.loginForm.value["username"], 
      this.loginForm.value["password"])
        .subscribe(res => {
          console.log(res);
          this.router.navigateByUrl("/");
        },
        error => {
          console.error(error);
          if (error.status == 401) {
            console.warn('Authentication Failed');
            this.authenticationFailed = true;
          } else {
            throw(error)
          }
        })
  }

  testIsLoggedIn() {
    console.log(this.authService.getToken());
  }

}
