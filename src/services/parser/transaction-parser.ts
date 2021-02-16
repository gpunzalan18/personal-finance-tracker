import { Category } from "../../model/enum/categoy.enum";
import { Transaction } from "../../model/helpers/transaction";
import { TransactionType } from "../../model/enum/transaction-type.enum";

import { categoryBuilder } from "../data-builder/category-builder";

class TransactionParser {
  public parseTransactionsByKeyWords(
    inputDataString: string,
    start: string,
    end: string,
    transactionType: TransactionType
  ): Transaction[] {
    const data: any = inputDataString.split(start)[1].split(end);

    let stringList: string[] = data[0].split("\n");

    let transactions: Transaction[] = this.parseTrasactions(
      stringList,
      transactionType
    );

    return transactions;
  }

  private parseTrasactions(
    transactionStringList: string[],
    transactionType: TransactionType
  ): Transaction[] {
    let transactions: Transaction[] = [];
    transactionStringList.forEach((transactionString) => {
      const date: string = transactionString.substring(0, 8);
      let amountIndex: number;
      if (
        date.match(
          new RegExp(
            /^(0[1-9]|1[012])[\/](0[1-9]|[12][0-9]|3[01])[\/](1[8-9]|2[0-9])$/
          )
        )
      ) {
        const description = transactionString.substring(8, amountIndex);
        let category: Category = null;
        switch (transactionType) {
          case TransactionType.INCOME:
            if (transactionString.match(new RegExp(/Confirmation# \d{10}/g))) {
              amountIndex = transactionString.lastIndexOf("#") + 12;
            } else {
              amountIndex = transactionString.lastIndexOf("CHKG") + 4;
            }
            break;
          case TransactionType.EXPENSES:
            amountIndex = transactionString.lastIndexOf("-");
            category = categoryBuilder.retrieveCategory(description);
            break;
        }

        const amount = transactionString
          .substring(amountIndex)
          .replace("$", "")
          .replace("-", "")
          .replace(",", "");
        transactions.push(
          new Transaction(
            date,
            description,
            Math.round(Number(amount)),
            category
          )
        );
      }
    });
    return transactions;
  }
}

export const tansactionParser: TransactionParser = new TransactionParser();
