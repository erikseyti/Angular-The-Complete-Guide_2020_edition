// import { ServersComponent } from './../../../../app-curso/src/app/servers/servers.component';
// import { ServerComponent } from './../../../../app-curso/src/app/server/server.component';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output('bpCreated') bluePrintCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  // newServerName = '';
  newServerContent = '';

  constructor() { }

  ngOnInit(): void {
  }

  onAddServer(nameInput: HTMLInputElement) {
    console.log(nameInput.value);
    this.serverCreated.emit({
      serverName: nameInput.value,
      serverContent: this.newServerContent
    });
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    this.bluePrintCreated.emit({
      serverName: nameInput.value,
      serverContent: this.newServerContent
      }
    );
  }

}
