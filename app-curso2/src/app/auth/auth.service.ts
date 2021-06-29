import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

interface AuthResponseData{
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    // Get the key on Firebase configuration on yout project
   return this.http.post<AuthResponseData>('YouApiKey',
      {email: email,
      password: password,
      returnSecureToken: true
      }
    );
  }
}
