import { Category } from "../enum/categoy.enum";

export class Transaction {
  constructor(
    public readonly date: string,
    public readonly description: string,
    public readonly amount: number,
    public readonly category: Category
  ) {}
}
