import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginForm = new FormGroup({
    "username": new FormControl(''),
    "password": new FormControl('')
  })
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    console.log(`is authenticated: ${this.authService.isAuthenticated()}`);
  }

  onSubmitLoginForm() {
    console.debug('onSubmitLoginForm event listener');
    console.debug(this.loginForm.value);

    this.authService.login(
      this.loginForm.value["username"], 
      this.loginForm.value["password"])
  }

}
