// this is an enumerator for transaction type
export enum TransactionType {
  Expense = -1,
  Earning = +1
}

// this is the interface for a single transaction
export interface Transaction {
  id: String;
  name: String;
  amount: Number;
  type: TransactionType;
}