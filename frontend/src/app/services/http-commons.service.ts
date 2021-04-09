
import { HttpClient } from '@angular/common/http';

export class HttpCommons {
  constructor(private http: HttpClient) {}

  getMonthlyIncomeAndExpenses() {
    return this.http.get('http://localhost:3000/sharedChecking');
  }

  getMonthlyExpensesByCategory() {
    return this.http.get('http://localhost:3000/sharedChecking/categories');
  }
}
