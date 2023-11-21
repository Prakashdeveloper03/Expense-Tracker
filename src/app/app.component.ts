import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { SnackbarService } from '../services/snackbar.service';

import { HeaderComponent } from './header/header.component';
import { BalanceComponent } from './balance/balance.component';
import { IncomeExpenseComponent } from './incomeexpense/incomeexpense.component';
import { AddtransactionComponent } from './addtransaction/addtransaction.component';
import { TransactionListComponent } from './transactionlist/transactionlist.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    BalanceComponent,
    IncomeExpenseComponent,
    AddtransactionComponent,
    TransactionListComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  transactions: any[] = [];
  total: number = 0;
  income: number = 0;
  expenses: number = 0;

  constructor(private snackbarService: SnackbarService) {}

  ngOnInit() {
    const savedTransactions = JSON.parse(
      localStorage.getItem('transactions') || '[]',
    );
    this.transactions = savedTransactions;

    this.total = this.transactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0,
    );

    this.income = this.transactions
      .filter((transaction) => transaction.amount > 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0)
      .toFixed(2);

    this.expenses = this.transactions
      .filter((transaction) => transaction.amount < 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0)
      .toFixed(2);
  }

  handleTransactionSubmitted(transactionData: {
    text: string;
    amount: number;
  }) {
    const newTransaction = {
      id: this.generateUniqueId(),
      text: transactionData.text,
      amount: transactionData.amount,
    };

    this.transactions.push(newTransaction);
    this.saveTransactionsToLocalStorage(this.transactions);
    this.snackbarService.showSnackbar('Transaction added.');
  }

  handleTransactionDeleted(id: number) {
    this.transactions = this.transactions.filter(
      (transaction) => transaction.id !== id,
    );
    this.saveTransactionsToLocalStorage(this.transactions);
    this.snackbarService.showSnackbar('Transaction deleted.');
  }

  generateUniqueId(): number {
    return Math.floor(Math.random() * 1000000);
  }

  saveTransactionsToLocalStorage(updatedTransactions: any[]) {
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
    this.total = updatedTransactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0,
    );
    this.income = updatedTransactions
      .filter((transaction) => transaction.amount > 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0)
      .toFixed(2);
    this.expenses = updatedTransactions
      .filter((transaction) => transaction.amount < 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0)
      .toFixed(2);
  }
}
