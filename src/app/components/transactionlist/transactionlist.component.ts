import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactionlist.component.html',
})
export class TransactionListComponent {
  @Input() transactions: any[] = [];
  @Output() transactionDeleted = new EventEmitter<number>();

  onTransactionDeleted(id: number) {
    this.transactionDeleted.emit(id);
  }
}
