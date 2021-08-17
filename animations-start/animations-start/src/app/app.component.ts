import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState', [
      state(
        'normal',
        style({
          'background-color': 'red',
          transform: 'translateX(0)',
        })
      ),
      state(
        'highlighted',
        style({
          // backgroundColor: "blue",
          'background-color': 'blue',
          transform: 'translateX(100px)',
        })
      ),
      // permite a animacao funcionar em ambos as transicoes de estado.
      transition('normal <=> highlighted', animate(300)),
      // transition('normal => highlighted', animate(300)),
      // transition('highlighted => normal', animate(800))
    ]),
    trigger('wildState', [
      state(
        'normal',
        style({
          'background-color': 'red',
          transform: 'translateX(0) scale(1)',
        })
      ),
      state(
        'highlighted',
        style({
          // backgroundColor: "blue",
          'background-color': 'blue',
          transform: 'translateX(100px) scale(1)',
        })
      ),
      state(
        'shrunken',
        style({
          'background-color': 'green',
          transform: 'translateX(0px) scale(0.5)',
        })
      ),
      // permite a animacao funcionar em ambos as transicoes de estado.
      // transition('normal <=> highlighted', animate(300)),
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(800)),
      transition('shrunken <=> *', animate(500))
    ]),
  ],
})
export class AppComponent {
  state = 'normal';
  wildState = 'normal';
  list = ['Milk', 'Sugar', 'Bread'];

  onAnimate() {
    this.state === 'normal' ? this.state = 'highlighted' : this.state = 'normal';
    this.wildState === 'normal' ? this.wildState = 'highlighted' : this.wildState = 'normal';
  }

  onShrink() {
    this.wildState = 'shrunken';
  }

  onAdd(item) {
    this.list.push(item);
  }

  onDelete(item) {
    this.list.slice(this.list.indexOf(item), 1);
  }
}
