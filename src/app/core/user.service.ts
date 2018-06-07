import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "models/user";
import {Observable} from "rxjs/Observable";
import {Subscription} from "../../models/subscription";

@Injectable()
export class UserService {

  endpoint = '/api/users';

  constructor(
    private http: HttpClient,
  ) { }

  index(): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.endpoint)
      .map(users => users.map(u => new User(u)));
  }

  getById(id: string) {
    return this.http.get<User>(`${this.endpoint}/${id}`)
      .map(u => new User(u));
  }

  updateSubscription(subId: string, updates: any) {
    return this.http.put<Subscription>(`/api/subscriptions/${subId}/update`, updates);
  }

}
