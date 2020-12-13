import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayPassword = true
  displayLog = []
  contadorLogs = 0

  trocarVisibilidade()
  {
    this.displayPassword = !this.displayPassword;
    this.contadorLogs = this.contadorLogs +1
    this.displayLog.push( new Date());
  }
  corDeFundo(log)
  {
    if(log >=4)
    {
      return 'blue';
    }
  }
}
