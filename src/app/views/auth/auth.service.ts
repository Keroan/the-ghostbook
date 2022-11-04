import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'

const AUTH_API = environment.ghostbookApi;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'auth/signin',
      {
        email,
        password,
      },
      httpOptions
    );
  }

  register(username: string, email: string, password: string, role: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'auth/signup',
      {
        username,
        email,
        password,
        role,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'auth/signout', { }, httpOptions);
  }
}
