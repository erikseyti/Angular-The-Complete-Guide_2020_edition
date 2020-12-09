import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username = ''
  desabilitado = true;

  desabilitarBotao($event)
  {
    console.log($event.target.value);
    if($event.target.value !=''){
      this.desabilitado = false;
    }
    else{
      this.desabilitado = true;
    }
  }

  limparNome($event)
  {
    this.username = '';
    this.desabilitado = true;
  }


}
