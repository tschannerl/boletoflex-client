import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from '../_services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;


  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
    });
  }

  login() {
    this.loginService.login(this.loginForm.controls.username.value, this.loginForm.controls.password.value).pipe().subscribe(
      data => {
        this.router.navigate(['/listClients']);
      },
      error => {
        console.log('error : ' + error);
        this.toastr.error('Usuário não autorizado', 'Login');
      }
    );
  }

}
