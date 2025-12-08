import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mini-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mini-calendar.component.html',
  styleUrls: ['./mini-calendar.component.scss'],
})
export class MiniCalendarComponent {
  @Input() month!: number;
  @Input() year!: number;

  get monthName(): string {
    return new Date(this.year, this.month).toLocaleString('pt-BR', { month: 'long' });
  }

  get days(): number[] {
    const lastDay = new Date(this.year, this.month + 1, 0).getDate();
    return Array.from({ length: lastDay }, (_, i) => i + 1);
  }

  nextMonth() {
    if (this.month === 11) {
      this.month = 0;
      this.year++;
    } else {
      this.month++;
    }
  }

  previousMonth() {
    if (this.month === 0) {
      this.month = 11;
      this.year--;
    } else {
      this.month--;
    }
  }
}
