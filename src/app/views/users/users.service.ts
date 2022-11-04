import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

import { User } from './user.model';

import { environment } from '../../../environments/environment';

const GHOSTBOOK_API = environment.ghostbookApi;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class UsersService {

  constructor(private http: HttpClient) {}

  getFriends(id: string): Observable<any> {
    return this.http.get(
      GHOSTBOOK_API + 'user/friends/' + id,
      );
  }

  getGhosts(id: string): Observable<any> {
    return this.http.get(
      GHOSTBOOK_API + 'user/ghosts/' + id,
      );
  }

  updateUser( id:string, role:string, friends:any ): Observable<any> {
    return this.http.put(
      GHOSTBOOK_API + 'user/' + id,
      {
        id,
        role,
        friends
      },
      httpOptions
    );
  }
}
