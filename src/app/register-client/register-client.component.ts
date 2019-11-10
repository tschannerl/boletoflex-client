import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../_models/client';
import { ClientService } from '../_services/client.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.css']
})
export class RegisterClientComponent implements OnInit {

  registerForm: FormGroup;
  imgClient: string;
  fileImgClient: File;

  constructor( private formBuilder: FormBuilder, private clientService: ClientService, private toastr: ToastrService) {}

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
      imgClient: [null],
    });
  }

  handleFileInput(files: FileList) {
    this.fileImgClient = files.item(0);
    const reader: FileReader = new FileReader();

    reader.onloadend = (e) => {
      this.imgClient = reader.result;
    };

    reader.readAsDataURL(this.fileImgClient);

  }

  add() {
    const client: Client = {} as any;

    if (this.imgClient != null) {
      if (this.registerForm.valid) {
        console.log(this.imgClient);
        client.name = this.registerForm.controls.name.value;
        client.identify = this.registerForm.controls.identify.value;
        client.orgIdentify = this.registerForm.controls.orgIdentify.value;
        client.document = this.registerForm.controls.document.value;
        client.nationality = this.registerForm.controls.nationality.value;
        client.naturalness = this.registerForm.controls.naturalness.value;
        client.address = this.registerForm.controls.address.value;
        client.addressNumber = this.registerForm.controls.addressNumber.value;
        client.cep = this.registerForm.controls.cep.value;
        client.city = this.registerForm.controls.city.value;
        client.state = this.registerForm.controls.state.value;
        client.birth = this.registerForm.controls.birth.value;
        client.gender = this.registerForm.controls.gender.value;
        client.celNumber = this.registerForm.controls.celNumber.value;
        client.telNumber = this.registerForm.controls.telNumber.value;
        client.comNumber = this.registerForm.controls.comNumber.value;
        client.email = this.registerForm.controls.email.value;
        client.image = this.fileImgClient;

        this.clientService.add(client).pipe().subscribe(
          data => {
            console.log(data);
            this.toastr.success('Registro realizado com sucesso', 'Cadastro');
            this.registerForm.reset(undefined);
            this.imgClient = null;
          },
          error => {
            console.log('error : ' + error);
            this.toastr.error('Erro ao realizar o registro, provável existência do cliente', 'Cadastro');
          }
        );
      }
    } else {
      this.toastr.error('Favor selecionar uma foto de perfil', 'FOTO');
    }
  }
}
