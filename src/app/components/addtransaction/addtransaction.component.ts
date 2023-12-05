import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './addtransaction.component.html',
})
export class AddtransactionComponent {
  @Output() transactionSubmitted = new EventEmitter<{
    text: string;
    amount: number;
  }>();

  text = '';
  amount = '';

  constructor(private snackbarService: SnackbarService) {}

  onSubmit() {
    if (!this.text && !this.amount) {
      this.snackbarService.showSnackbar('Both fields must be filled.');
      return;
    }

    if (!this.text) {
      this.snackbarService.showSnackbar('Text field must be filled.');
      return;
    }

    if (!this.amount) {
      this.snackbarService.showSnackbar('Amount field must be filled.');
      return;
    }

    const transactionData = {
      text: this.text,
      amount: parseFloat(this.amount),
    };

    this.transactionSubmitted.emit(transactionData);
    this.text = '';
    this.amount = '';
  }
}
