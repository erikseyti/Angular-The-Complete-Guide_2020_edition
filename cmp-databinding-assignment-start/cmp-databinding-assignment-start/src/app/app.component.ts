import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  countList = [];
  // count: any
  // countValue: any;

  AddCountList(count: number) {
    console.log(count);
    this.countList.push(count);
    console.log(this.countList);
  }



  // startGame()
  // {
    // let count = 0;
  // count: any;
  // console.log(Number.isInteger(this.count));
    // this.gameCount = setInterval(function() {console.log(count++)}, 1000);
    // this.countValue = count;
    // console.log(this.gameCount);
    // console.log(count);
  // }

  // stopGame()
  // {
  //   // clearInterval(this.gameCount);
  // }
}
