import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.css']
})
export class RegisterClientComponent implements OnInit {

  registerForm: FormGroup;

  constructor( private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: [''],
      identify: [''],
      orgIdentify: [''],
      document: [''],
      nationality: [''],
      naturalness: [''],
      address: [''],
      addressNumber: [''],
      cep: [''],
      city: [''],
      state: [''],
      birth: [''],
      gender: [''],
      celNumber: [''],
      telNumber: [''],
      comNumber: [''],
      email: [''],
    });
  }

}
