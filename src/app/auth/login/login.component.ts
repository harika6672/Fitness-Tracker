import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      lemail: new FormControl('', [Validators.required,Validators.email]),
      lpassword: new FormControl('', [Validators.required,Validators.minLength(6)]),
    });
  }

  get f() {
     return this.loginForm.controls;
  }


  onLogin(){
    //console.log(this.loginForm.value);
    this.authService.login({
      email:this.loginForm.value.lemail,
      password:this.loginForm.value.lpassword
    });

  }



}
