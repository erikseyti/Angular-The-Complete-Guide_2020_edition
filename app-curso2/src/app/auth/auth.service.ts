import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponseData{
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  kind: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  user = new BehaviorSubject<User>(null);


  constructor(private http: HttpClient,
              private router: Router) {}

  signUp(email: string, password: string) {
    // Get the key on Firebase configuration on yout project
   return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]',
      {email: email,
      password: password,
      returnSecureToken: true
      }
    ).pipe(
      catchError(
        this.handleError
    ), tap(responseData => {
      this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken ,+responseData.expiresIn);
    }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]',
    {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(
        this.handleError
    ), tap(responseData => {
      this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken ,+responseData.expiresIn);
    }));
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
  }

  private handleAuthentication(email: string, userId: string , token: string, expiresIn: number) {
    const experationDate = new Date(new Date().getTime() + (+expiresIn*1000));
    const user = new User(
      email,
      userId,
      token,
      experationDate);
      this.user.next(user);
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'an Unknow error ocurred!'
      if (!errorResponse.error || !errorResponse.error.error){

        return throwError(errorMessage);
      }
      switch (errorResponse.error.error.message) {
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

      return throwError(errorMessage);
  }
}
