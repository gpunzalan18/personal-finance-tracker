import { HttpClient } from '@angular/common/http';

export class HttpCommons {
  constructor(private http: HttpClient) {}

  public getMonthlyIncomeAndExpenses() {
    return this.http.get('http://localhost:3000/incomesAndExpenses');
  }

  public getMonthlyExpensesByCategory() {
    return this.http.get('http://localhost:3000/incomesAndExpenses/categories');
  }
}
