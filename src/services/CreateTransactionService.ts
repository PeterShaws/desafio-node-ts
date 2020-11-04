import Transaction from '../models/Transaction';
import { TransactionType } from '../models/TransactionType';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: TransactionType;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: CreateTransactionDTO): Transaction {
    switch (true) {
      case !['income', 'outcome'].includes(type):
        throw new Error('Invalid transaction type');
      case Number.isNaN(value) || value <= 0:
        throw new Error('Invalid value');
      case type === 'outcome' &&
        value > this.transactionsRepository.getBalance().total:
        throw new Error('Excessive outcome');
      case !title:
        throw new Error('Invalid title');
      default:
        break;
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transaction;
  }
}

export default CreateTransactionService;
