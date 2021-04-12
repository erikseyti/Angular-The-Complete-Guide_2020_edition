import { OnDestroy } from '@angular/core';
import { Component,
  OnInit,
  Input,
  ViewEncapsulation,
  OnChanges,
  SimpleChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  // ViewEncapsulation.None means that any value on this component
  // will be share to the rest of the components
  encapsulation: ViewEncapsulation.Emulated
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit,
AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy{
  @Input('srvElement') element: {type: string, name: string, content: string};
  @Input() name: string;

  constructor() {
    console.log("Constructor Called!")
   }

   ngOnChanges(changes: SimpleChanges) {
     console.log('ngOnchanges called!')
     console.log(changes)
    }

    ngOnInit(): void {
      console.log("ngOnInit Called!")
    }

    ngDoCheck(): void {
      console.log('DoCheck is Called!')
    }

    ngAfterContentInit(): void {
      console.log('ngAfterContentInit Called!');
    }

    ngAfterContentChecked(): void {
      console.log('ngAfterContentChecked Called!');
    }

    ngAfterViewInit(): void {
      console.log('ngAfterViewInit Called!');
    }

    ngAfterViewChecked(): void {
      console.log('ngAfterViewChecked Called!');
    }

    ngOnDestroy(): void {
      console.log('ngOnDestroy Called!');
    }

}
