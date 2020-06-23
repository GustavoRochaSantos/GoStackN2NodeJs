import Transaction from '../models/Transaction';

interface Params {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {
      const balance = this.transactions.reduce((balance, item)=>{
      if(item.type ==='income')
        balance.income += item.value
      else
        balance.outcome += item.value
      
      balance.total = balance.income - balance.outcome

      return balance
    }, {income:0, outcome:0, total:0})

    return balance

  }

  public create({title, value, type}: Params): Transaction {

      const balance = this.getBalance()

      if((balance.total-value) < 0 && type === 'outcome')
        throw Error("You have not founds.")

      const transaction = new Transaction({title,value,type})

      this.transactions.push(transaction)

      return transaction
  }
}

export default TransactionsRepository;
