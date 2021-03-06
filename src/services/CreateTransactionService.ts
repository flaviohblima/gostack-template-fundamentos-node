import TransactionsRepository from '../repositories/TransactionsRepository'
import Transaction from '../models/Transaction'

interface Request {
  title: string
  value: number
  type: 'income' | 'outcome'
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository
  }

  public execute({ title, value, type }: Request): Transaction {
    const balance = this.transactionsRepository.getBalance()

    if (type === 'outcome' && balance.total < value) {
      throw new Error(
        'Transaction not allowed. The value onverflows your total balance.',
      )
    }

    return this.transactionsRepository.create({ title, value, type })
  }
}

export default CreateTransactionService
