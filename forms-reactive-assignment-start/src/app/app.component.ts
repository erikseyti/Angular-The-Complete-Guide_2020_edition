import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  assignForm: FormGroup;
  allProjectStatus = ['Stable','Critical','Finished']
  forbiddenNamePrototypes = ['POC', 'Prototype', 'V0.1']




  ngOnInit(): void {
    this.assignForm = new FormGroup({
      'projectName': new FormControl('', [Validators.required, this.forbiddenNamePrototype.bind(this)],
      this.forbiddenNameTest ),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'projectStatus': new FormControl('Stable')
    });
    // throw new Error('Method not implemented.');
  }
  onSubmit()
  {
    console.log(this.assignForm.value);
  }

  forbiddenNamePrototype(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenNamePrototypes.indexOf(control.value) !== -1 ){
      return {'NameIsPrototype': true}
    }
    return null
  }

  forbiddenNameTest(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout( () => {
        if(control.value === 'test')
        {
          resolve({'forbiddenNameTest': true});
        } else {
          resolve(null)
        }
      }, 1500)
    } )
    return promise;
  }

}
