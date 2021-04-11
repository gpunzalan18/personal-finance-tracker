import { Category } from "../enum/categoy.enum";
import { TransactionType } from "../enum/transaction-type.enum";

export class Transaction {
  constructor(
    public readonly date: string,
    public readonly description: string,
    public readonly amount: number,
    public readonly type: TransactionType,
    public readonly category: Category
  ) {}
}
