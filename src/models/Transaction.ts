import { v4 as uuid } from 'uuid';
import { TransactionType } from './TransactionType';

class Transaction {
  id: string;

  title: string;

  value: number;

  type: TransactionType;

  constructor({ title, value, type }: Omit<Transaction, 'id'>) {
    this.id = uuid();
    this.title = title;
    this.value = value;
    this.type = type;
  }
}

export default Transaction;
