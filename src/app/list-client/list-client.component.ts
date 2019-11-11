import { Component, OnInit } from '@angular/core';
import { Client } from '../_models/client';
import { MatTableDataSource } from '@angular/material/table';
import { ClientService } from '../_services/client.service';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css'],
  animations: [
      trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class ListClientComponent implements OnInit {
  clients: Client[];
  columnsToDisplay = ['name', 'document', 'identify', 'email'];
  labelToDisplay = {name: 'Nome', document: 'CPF/CNPJ', identify: 'Identidade', email: 'Email'};
  expandedElement: Client | null;

  constructor(private clientService: ClientService, private toastr: ToastrService) { }

  ngOnInit() {
    this.listAllClients();
  }

  listAllClients() {
    this.clientService.getAllClients()
    .pipe()
    .subscribe(
      data => {
        this.clients = data;
        console.log(data);
      },
      error => {
        console.log('error : ' + error);
      });
  }

  approved(id: number) {
    this.clientService.approved(id.toString(), 'true').pipe().subscribe(
      data => {
        this.toastr.success('Cliente aprovado', 'Aprovado');
      },
      error => {
        console.log('error : ' + error);
      });
  }

  notapproved(id: number) {
    this.clientService.approved(id.toString(), 'false').pipe().subscribe(
      data => {
        this.toastr.warning('Cliente não aprovado', 'Não Aprovado');
      },
      error => {
        console.log('error : ' + error);
      });
  }

}
