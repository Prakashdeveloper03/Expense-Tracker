import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-income-expense',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './incomeexpense.component.html',
})
export class IncomeExpenseComponent {
  @Input() income: number = 0;
  @Input() expenses: number = 0;
}
