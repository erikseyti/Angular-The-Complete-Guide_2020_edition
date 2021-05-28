import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('form') formSubmmited: NgForm
  subscriptions = ['Basic', 'Advanced', 'Pro']
  defaultSubscription = 'Advanced'


  submitForm(){
    console.log(this.formSubmmited);
  }

}

