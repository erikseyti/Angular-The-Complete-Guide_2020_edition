import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import * as AuthActions from './auth.actions';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

export interface AuthResponseData{
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  kind: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
        environment.firebaseAPIKey,
      {
        email: authData.payload.email,
        password: authData.payload.password,
        returnSecureToken: true
      })
      .pipe(
        map(resData => {
          const experationDate = new Date(new Date().getTime() + (+resData.expiresIn*1000));
          return new AuthActions.Login({
            email: resData.email,
            userId: resData.localId,
            token: resData.idToken,
            expirationDate: experationDate
          });
        }),
        catchError(errorRes => {
        // ...
        // nao mande um erro dentro desse observable, pq para funcionar corretamente o effects,
        // ele deve sempre se manter vivo.
        let errorMessage = 'an Unknow error ocurred!';
        if (!errorRes.error || !errorRes.error.error){

        return of(new AuthActions.Loginfail(errorMessage));
      }
        switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email already exists.';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'This email does not exists.';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'This password is not correct.';
          break;
      }



        return of(new AuthActions.Loginfail(errorMessage));
      }));
    }),

  );

  @Effect({dispatch: false})
  AuthSucess = this.actions$.pipe(ofType(AuthActions.LOGIN), tap(() =>{
    this.router.navigate(['/']);
  }));

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router) {}
}
