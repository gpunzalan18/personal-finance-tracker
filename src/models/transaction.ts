export class Transaction {
  constructor(
    public readonly date: string,
    public readonly description: string,
    public readonly amount: number,
    public readonly type: string,
    public readonly category: string
  ) {}
}
