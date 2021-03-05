import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate;
  minDate;
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setFullYear(this.minDate.getFullYear()-30);
    this.maxDate.setFullYear(this.maxDate.getFullYear()-6);
  }

  onSubmit(form:NgForm){
      this.authService.registerUser({
        email:form.value.email,
        password:form.value.password
      })
  }

}
