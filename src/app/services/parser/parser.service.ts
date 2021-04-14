import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Transaction } from '../models/transaction';
import { TransactionType } from '../models/transaction-type.enum';
import { RegexService } from '../regex/regex.service';
import { MonthlyTransactions } from '../models/monthly-transactions';
import { typedTransactions } from '../models/typed-transactions';

@Injectable({
  providedIn: 'root',
})
export class ParserService {
  readTransactionsSubject: Subject<any>;
  parseTransactionsSubject: Subject<any>;

  constructor(private regexService: RegexService) {
    this.readTransactionsSubject = new Subject();
    this.parseTransactionsSubject = new Subject();
  }

  read(data: any) {
    this.readTransactionsSubject.next(data);
  }

  parse(data: string) {
    let cleanUpData: string[] = data.toLocaleLowerCase().trim().split('\r\n');
    // let headers: string[] = cleanUpData[0].split(',');

    let monthlyTransactionsMap: Map<
      string,
      Transaction[]
    > = this.buildMonthlyTransactions(cleanUpData);

    monthlyTransactionsMap.forEach((transactions, key) => {
      typedTransactions.incomes.push(
        this.getTransactionsByType(key, transactions, TransactionType.INCOME)
      );
      typedTransactions.savings.push(
        this.getTransactionsByType(key, transactions, TransactionType.SAVINGS)
      );
      typedTransactions.expenses.push(
        this.getTransactionsByType(key, transactions, TransactionType.EXPENSES)
      );
    });

    this.parseTransactionsSubject.next(typedTransactions);
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
      let monthYearKey = `${date.substr(0, 2)}_${date.substr(6, 4)}`;

      let transactionsList: any = monthlyTransactionsMap.get(monthYearKey);
      let updatedTransaction: Transaction = new Transaction(
        date,
        transaction[1],
        Math.abs(parseInt(transaction[2])),
        transactionType,
        this.regexService.getExpensesCategory(transaction[1])
      );
      if (transactionsList == undefined) {
        monthlyTransactionsMap.set(monthYearKey, [updatedTransaction]);
      } else {
        transactionsList.push(updatedTransaction);
      }
    }

    return monthlyTransactionsMap;
  }

  private getTransactionsByType(
    monthYearKey: string,
    trasactions: Transaction[],
    transactionType: TransactionType
  ): MonthlyTransactions {
    let total: number = 0;
    let transactionsByType: Transaction[] = [];
    trasactions.forEach((transaction) => {
      if (transaction.type === transactionType) {
        total += transaction.amount;
        transactionsByType.push(transaction);
      }
    });

    return new MonthlyTransactions(
      this.getMonthForTitle(monthYearKey),
      transactionsByType,
      total
    );
  }

  private getMonthForTitle(monthYearKey: string) {
    const months: any = {
      '01_2021': 'January 2021',
      '02_2021': 'February 2021',
      '03_2021': 'March 2021',
      '04_2021': 'April 2021',
    };
    return months[monthYearKey];
  }
}
