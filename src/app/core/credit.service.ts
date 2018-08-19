import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AllowanceTransaction, CreditTransaction} from "../../models/credit-transaction";

@Injectable()
export class CreditService {

  constructor(
    private http: HttpClient,
  ) { }

  getForUser(userId: string) {
    return this.http.get<{ transactions: Array<CreditTransaction>, allowances: Array<AllowanceTransaction>}>(`/api/credit-transactions/users/${userId}`);
  }

  setUserCredits(userId: string, amount: number, notes: string) {
    return this.http.post<CreditTransaction>('/api/credit-transactions', { user: userId, amount, notes })
  }

  createAllowance(body) {
    return this.http.post<Array<AllowanceTransaction>>('/api/credit-transactions/allowances', body);
  }

  updateAllowance(allowanceId, body) {
    return this.http.put<AllowanceTransaction>(`/api/credit-transactions/allowances/${allowanceId}`, body);
  }

  deleteAllowance(allowanceId) {
    return this.updateAllowance(allowanceId, { status: 'cancelled' });
  }

}
