import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sucess-alert',
  templateUrl: './sucess-alert.component.html',
  styleUrls: ['./sucess-alert.component.css']
})
export class SucessAlertComponent implements OnInit {

  mensagemSucesso = 'Mensagem de sucesso do sistema!';

  constructor() { }

  ngOnInit(): void {
  }

}
