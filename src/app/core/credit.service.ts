import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CreditTransaction} from "../../models/credit-transaction";

@Injectable()
export class CreditService {

  constructor(
    private http: HttpClient,
  ) { }

  getForUser(userId: string) {
    return this.http.get<Array<CreditTransaction>>(`/api/credit-transactions/users/${userId}`);
  }

  setUserCredits(userId: string, amount: number, notes: string) {
    return this.http.post<CreditTransaction>('/api/credit-transactions', { user: userId, amount, notes })
  }

}
