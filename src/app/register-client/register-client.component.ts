import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  streamVideo: any;

  @ViewChild ('video', {static: false})
  public video: ElementRef;

  @ViewChild ('btnVideo', {static: false})
  public btnVideo: ElementRef;

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

  initCaptureVideo(event) {
    console.log('Iniciando captura do video');

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia && event.srcElement.innerHTML === 'Tirar uma Foto') {
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
          this.streamVideo = stream;
          this.imgClient = null;
          try {
            this.video.nativeElement.srcObject = stream;
          } catch (error) {
            this.video.nativeElement.src = window.URL.createObjectURL(stream);
          }
          this.video.nativeElement.play();
          event.srcElement.innerHTML = 'Capturar a Foto';
        });
    } else if (event.srcElement.innerHTML === 'Capturar a Foto') {
      event.srcElement.innerHTML = 'Tirar uma Foto';
      const canvas = document.createElement('canvas');
      canvas.width = 640;
      canvas.height = 480;
      canvas.getContext('2d').drawImage(this.video.nativeElement, 0, 0, canvas.width, canvas.height);
      this.imgClient = canvas.toDataURL();
      this.fileImgClient = new File([this.dataURItoBlob(canvas.toDataURL())], 'imageClient', {type: 'image/jpg'});

      this.video.nativeElement.srcObject = null;
      this.video.nativeElement.src = null;
      this.video.nativeElement.pause();
      if (this.streamVideo.getTracks().length > 0) {this.streamVideo.getTracks()[0].stop(); }
    }
  }

  dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpg' });
    return blob;
  }


  handleFileInput(files: FileList) {
    if (!this.video.nativeElement.paused) {
      this.video.nativeElement.pause();
      this.video.nativeElement.src = null;
      this.video.nativeElement.src = '';
    }
    this.fileImgClient = files.item(0);
    const reader: FileReader = new FileReader();

    reader.onloadend = (e) => {
      this.imgClient = reader.result.toString();
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
