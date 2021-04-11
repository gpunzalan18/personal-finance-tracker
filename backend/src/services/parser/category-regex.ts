import fs from "fs";
import { getCategoryRegex } from "../../app.const";
import { ExpensesCategory } from "../../model/enum/expenses-categoy.enum";

class CategoryRegex {
  public list: any[];
  constructor() {
    const regexList = JSON.parse(
      fs.readFileSync(`${getCategoryRegex()}`, {
        encoding: "utf8",
      })
    );
    this.list = [
      {
        category: ExpensesCategory.BILLS,
        regex: regexList["bills"],
      },
      {
        category: ExpensesCategory.GROCERY,
        regex: regexList["grocery"],
      },
      {
        category: ExpensesCategory.ENTERTAINMENT,
        regex: regexList["entertainment"],
      },
      {
        category: ExpensesCategory.RESTAURANT,
        regex: regexList["restaurant"],
      },
      {
        category: ExpensesCategory.LEGAL,
        regex: regexList["legal"],
      },
      {
        category: ExpensesCategory.GIVE,
        regex: regexList["give"],
      },
    ];
  }
}

export const categoryRegex: CategoryRegex = new CategoryRegex();
