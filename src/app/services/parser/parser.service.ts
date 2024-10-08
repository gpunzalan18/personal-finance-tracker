import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Transaction } from '../../models/transaction';
import { TransactionType } from '../../models/transaction-type.enum';
import { RegexService } from '../regex/regex.service';
import { StoreService } from '../store/store.service';
import { MonthlyTransactions } from '../../models/monthly-transactions';

@Injectable({
  providedIn: 'root',
})
export class ParserService {
  readTransactionsSubject: Subject<any>;
  parseTransactionsSubject: Subject<any>;

  constructor(
    private regexService: RegexService,
    private storeService: StoreService
  ) {
    this.readTransactionsSubject = new Subject();
    this.parseTransactionsSubject = new Subject();
  }

  read(data: any) {
    this.readTransactionsSubject.next(data);
  }

  parseTransactions(data: string) {
    try {
      let cleanUpData: string[] = data.toLocaleLowerCase().trim().split('\n');
      this.storeService.resetStore();
      let monthlyTransactionsMap: Map<string, Transaction[]> =
        this.buildMonthlyTransactions(cleanUpData);

      monthlyTransactionsMap.forEach((transactions, key) => {
        this.storeService.typedTransactions.incomes.push(
          this.getTransactionsByType(key, transactions, TransactionType.INCOME)
        );
        this.storeService.typedTransactions.savings?.push(
          this.getTransactionsByType(key, transactions, TransactionType.SAVINGS)
        );
        this.storeService.typedTransactions.expenses.push(
          this.getTransactionsByType(
            key,
            transactions,
            TransactionType.EXPENSES
          )
        );
      });
      this.buildCategorizedExpenses(
        this.storeService.typedTransactions.expenses
      );
      this.parseTransactionsSubject.next(this.storeService.typedTransactions);
    } catch (e) {
      console.error('ERR - failed to parse transactions.');
      alert(
        'Something went wrong. Please make sure you upload a valid transaction file, or use the "Demo" option to see the correct format.'
      );
      window.location.reload();
    }
  }

  public buildCategorizedExpenses(expenses: MonthlyTransactions[]) {
    expenses.forEach((mt, monthIndex) => {
      let map: any = new Map<string, number>();
      mt.transactions.forEach((t) => {
        if (map.get(t.category)) {
          let val: number = map.get(t.category) + t.amount;
          map.set(t.category, val);
        } else {
          map.set(t.category, t.amount);
        }
        this.storeService.addAmountToCategorizedTransactions(map, monthIndex);
      });
    });
  }

  private buildMonthlyTransactions(data: any): Map<string, Transaction[]> {
    let monthlyTransactionsMap: Map<string, Transaction[]> = new Map();
    for (let i = 1; i < data.length; i++) {
      let transaction: string[] = data[i].replace(/"/g, '').split(',');
      let amount: number = parseInt(transaction[2].replace(/$/g, ''));
      let transactionType: TransactionType = TransactionType.INCOME;

      if (amount < 0) {
        if (transaction[1].match(this.regexService.getSavingsRegex())) {
          transactionType = TransactionType.SAVINGS;
        } else {
          transactionType = TransactionType.EXPENSES;
        }
      } else if (
        transaction[1].match(this.regexService.getSavingsLoanRegex())
      ) {
        transactionType = TransactionType.EXPENSES;
      }
      const date: string = transaction[0].trim();
      let monthYearKey = `${date.substr(0, 2)}_${date.substr(6, 4)}`;

      let transactionsList: any = monthlyTransactionsMap.get(monthYearKey);
      const category: string = this.regexService.getExpensesCategory(
        transaction[1]
      );
      let updatedTransaction: Transaction = new Transaction(
        date,
        transaction[1],
        Math.abs(amount),
        transactionType,
        category
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
    const [month, year] = monthYearKey.split('_');
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const monthIndex = parseInt(month, 10) - 1; // Convert month to 0-based index
    if (monthIndex < 0 || monthIndex > 11 || isNaN(monthIndex)) {
      throw new Error('Invalid month provided.');
    }

    return `${monthNames[monthIndex]} ${year}`;
  }
}
