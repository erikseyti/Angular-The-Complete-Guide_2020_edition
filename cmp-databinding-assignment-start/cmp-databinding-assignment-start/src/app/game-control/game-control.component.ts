import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  gameCount: any
  countValue: any;
  count = parseInt('0');
  @Output() getCount = new EventEmitter<number>();


  constructor() { }

  ngOnInit(): void {
  }

  AddGetCount(count) {
    this.getCount.emit(count);
  }


  startGame() {
    // console.log()
  //  this.count =
  // count: any;
    // console.log(Number.isInteger(this.count));
    this.gameCount = setInterval(() => {
    this.count++;
    console.log(this.count);
    this.AddGetCount(this.count);
    }, 1000);
    // this.countValue = this.count;
    // console.log(this.gameCount);
    // console.log(count);
  }

  stopGame()
  {
    clearInterval(this.gameCount);
  }

}
