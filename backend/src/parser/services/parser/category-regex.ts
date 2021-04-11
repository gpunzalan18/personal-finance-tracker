import fs from "fs";
import { getCategoryRegex } from "../../../app.const";
import { Category } from "../../model/enum/categoy.enum";

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
        category: Category.RESTAURANTS,
        regex: regexList["restaurant"],
      },
      {
        category: Category.GROCERY,
        regex: regexList["grocery"],
      },
      {
        category: Category.ENTERTAINMENT,
        regex: regexList["entertainment"],
      },
      {
        category: Category.LEGAL,
        regex: regexList["legal"],
      },
      {
        category: Category.VANGUARD,
        regex: regexList["vanguard"],
      },
      {
        category: Category.OTHER,
        regex: regexList["other"],
      },
    ];
  }
}

export const categoryRegex: CategoryRegex = new CategoryRegex();
