import fs from "fs";
import { getCategoryRegex } from "../../app.const";
import { ExpensesCategory } from "../../model/enum/expenses-categoy.enum";

class SavingsRegex {
  public readonly list: string[];
  constructor() {
    const regexList = JSON.parse(
      fs.readFileSync(`${getCategoryRegex()}`, {
        encoding: "utf8",
      })
    );
    this.list = [regexList["savings"]];
  }
}

export const savingsRegex: SavingsRegex = new SavingsRegex();
