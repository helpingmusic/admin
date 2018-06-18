import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import * as store from 'store';

@Injectable()
export class AuthService {

  csrf: string;
  admin: any;

  get userToken() {
    return store.get('home>userToken');
  }
  set userToken(t: string) {
    store.set('home>userToken', t);
  }

  constructor(
    private http: HttpClient,
  ) { }

  setCSRF(csrf) {
    this.csrf = csrf;
  }

  isLoggedIn(): boolean {
    return !!this.userToken;
  }

  login({ email, password }) {
    return this.http.post('/auth/local', { email, password })
      .do((data: any) => this.userToken = data.token);
  }

  logout() {
    this.userToken = null;
  }

}
