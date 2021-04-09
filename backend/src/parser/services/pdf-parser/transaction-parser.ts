import { Category } from "../../model/enum/categoy.enum";
import { Transaction } from "../../model/helpers/transaction";
import { TransactionType } from "../../model/enum/transaction-type.enum";

import { categoryBuilder } from "../data-builder/category-builder";

class TransactionParser {
  public async parseTransactionsByKeyWords(
    inputDataString: string,
    start: string,
    end: string,
    transactionType: TransactionType
  ): Promise<Transaction[]> {
    const data: any = inputDataString.split(start)[1].split(end);
    let stringList: string[] = await this.parseData(data)
    let cleanedStringList: string[] = [];

    //clean up multiline descriptions
    let targetIndex: number = -1
    stringList.forEach((str, index) => {
      const date: string = str.substring(0, 8);
      if (
        date.match(
          new RegExp(
            /^(0[1-9]|1[012])[\/](0[1-9]|[12][0-9]|3[01])[\/](1[8-9]|2[0-9])$/
          )
        )
      ) {
        targetIndex++;
        cleanedStringList.push(str);
      } else if (str != '') {
        cleanedStringList[targetIndex] += str;;
      } 
    });

    let transactions: Transaction[] = this.parseTrasactions(
      cleanedStringList,
      transactionType
    );

    return transactions;
  }

  private async parseData(data: any[]): Promise<string[]> {
    return data[0].split("\n");
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
              // BofA Transfer
              amountIndex = transactionString.lastIndexOf("#") + 12;
            } else if (
              transactionString.match(new RegExp(/\d{10} DEPOSIT/g)) &&
              transactionString.match(new RegExp(/\*MOBILE/g))
            ) {
              //mobile deposits
              amountIndex =
                transactionString.lastIndexOf("*MOBILE       ") + 16;
            } else {
              // Checking to Checking Transfer
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
