import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-warning-alert',
  templateUrl: './warning-alert.component.html',
  styleUrls: ['./warning-alert.component.css']
})
export class WarningAlertComponent implements OnInit {

  mensagemAlerta = 'Mensagem de alerta padrão do sistema.';

  constructor() { }

  ngOnInit(): void {
  }

}
