import { Store } from '@ngrx/store';
import { PlaceholderDirective } from './../shared/placeholder/placeholder.directive';
import { NgForm } from '@angular/forms';
import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy{
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective
  private closeSub: Subscription;
  private storeSub: Subscription;

  constructor(
              private componentFactoryResolver: ComponentFactoryResolver,
              private store: Store<fromApp.AppState>){}


  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.showErrorAlert(this.error);
      }
    });
  }

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


    if (this.isLoginMode) {
    //  authObservable = this.authService.login(email, password);
    this.store.dispatch(new AuthActions.LoginStart({email: email, password: password}));
    }
    else {
     this.store.dispatch(new AuthActions.SignupStart({email: email, password: password}));
    }

    form.reset();
  }

  onHandleError(){
    this.store.dispatch(new AuthActions.ClearError());
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  private showErrorAlert(message: string) {
    // Essa abordagem para gerar o modal n vai funcionar.
    // const alertCmp = new AlertComponent();
    // para fazer isso é necessario urtilizar um component factory para gera o componente
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostVievContainerRef = this.alertHost.viewContainerRef;
    hostVievContainerRef.clear();
    const componentRef = hostVievContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe( () => {
      this.closeSub.unsubscribe();
      hostVievContainerRef.clear();
    } );
  }
}
