import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Transaction } from '../models/transaction';
import { TransactionType } from '../models/transaction-type.enum';
import { RegexService } from '../regex/regex.service';
import { MonthlyTransactions } from '../models/monthly-transactions';

@Injectable({
  providedIn: 'root',
})
export class ParserService {
  transactionSybject: Subject<any>;

  constructor(private regexService: RegexService) {
    this.transactionSybject = new Subject();
  }

  read(data: any) {
    this.transactionSybject.next(data);
  }

  parse(data: string) {
    let cleanUpData: string[] = data.toLocaleLowerCase().trim().split('\r\n');
    let headers: string[] = cleanUpData[0].split(',');

    console.log(this.buildMonthlyTransactions(cleanUpData));
  }

  private buildMonthlyTransactions(data: any): Map<string, Transaction[]> {
    let monthlyTransactionsMap: Map<string, Transaction[]> = new Map();
    for (let i = 1; i < data.length; i++) {
      let transaction: string[] = data[i].replace(/"/g, '').split(',');
      let amount: number = parseInt(transaction[2]);
      let transactionType: TransactionType = TransactionType.INCOME;

      if (amount < 0) {
        if (transaction[1].match(this.regexService.getSavingsRegex())) {
          transactionType = TransactionType.SAVINGS;
        } else {
          transactionType = TransactionType.EXPENSES;
        }
      }
      const date: string = transaction[0];
      let monthYear = `${date.substr(0, 2)}_${date.substr(6, 2)}`;

      let transactionsList: any = monthlyTransactionsMap.get(monthYear);
      let updatedTransaction: Transaction = new Transaction(
        date,
        transaction[1],
        parseInt(transaction[2]),
        transactionType,
        this.regexService.getExpensesCategory(transaction[1])
      );
      if (transactionsList == undefined) {
        monthlyTransactionsMap.set(monthYear, [updatedTransaction]);
      } else {
        transactionsList.push(updatedTransaction);
      }
    }

    return monthlyTransactionsMap;
  }
}
