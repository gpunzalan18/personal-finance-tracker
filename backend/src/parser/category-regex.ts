import fs from "fs";
import { getCategoryRegex } from "../app.const";
import { Category } from "./model/enum/categoy.enum";

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
        category: Category.EATING_OUT,
        regex: regexList["eating_out"],
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
    ];
  }
}

export const categoryRegex: CategoryRegex = new CategoryRegex();
