import { Router } from '@angular/router';
import { AuthResponseData, AuthService } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component } from "@angular/core";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent{
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router){}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm){
    // extra security to not send a form onSubmit if form is not corresponding correctly on browser
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;

    let authObservable: Observable<AuthResponseData>;

    if (this.isLoginMode) {
     authObservable = this.authService.login(email, password);
    }
    else {
     authObservable = this.authService.signUp(email, password)
    }

    authObservable.subscribe(
      responseData => {
      console.log(responseData);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, errorMessage => {
      console.log(errorMessage);
      this.error = errorMessage;
      this.isLoading = false;
    });

    form.reset();
  }

  onHandleError(){
    this.error = null;
  }
}
