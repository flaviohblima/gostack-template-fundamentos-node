import Transaction from '../models/Transaction'

interface Balance {
  income: number
  outcome: number
  total: number
}

interface CreateTransactionDTO {
  title: string
  value: number
  type: 'income' | 'outcome'
}

class TransactionsRepository {
  private transactions: Transaction[]

  constructor() {
    this.transactions = []
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {
    return this.transactions.reduce(
      (balaceMap, transaction) => {
        switch (transaction.type) {
          case 'income':
            return {
              ...balaceMap,
              income: balaceMap.income + transaction.value,
              total: balaceMap.total + transaction.value,
            }
          case 'outcome':
            return {
              ...balaceMap,
              outcome: balaceMap.outcome + transaction.value,
              total: balaceMap.total - transaction.value,
            }
          default:
            return balaceMap
        }
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    )
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type })

    this.transactions.push(transaction)

    return transaction
  }
}

export default TransactionsRepository
