import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "models/user";
import {Observable} from "rxjs/Observable";

@Injectable()
export class UserService {

  endpoint = '/users';

  constructor(
    private http: HttpClient,
  ) { }

  index(): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.endpoint);
  }

  getById(id: string) {
    return this.http.get<User>(`${this.endpoint}/adminGet/${id}`);
  }

}
