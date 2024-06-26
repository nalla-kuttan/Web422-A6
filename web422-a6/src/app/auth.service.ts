import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';

import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

import User from './User';
import {RegisterUser} from './RegisterUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  public readToken(): User | null {
    const token = localStorage.getItem('access_token');

    if (token) {
      return helper.decodeToken(token);
    } else {
      return null;
    }
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    console.log(token);
    if (token) {
      console.log('token exists');
      return true;
    } else {
      console.log('no token');
      return false;
    }
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(`${environment.userAPIBase}/login`, user);
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  register(user: RegisterUser): Observable<any> {
    return this.http.post<any>(`${environment.userAPIBase}/register`, user);
  }
}