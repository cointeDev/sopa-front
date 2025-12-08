import { Component, Input, Output, EventEmitter, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'calendar-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar-grid.component.html',
  styleUrls: ['./calendar-grid.component.scss'],
})
export class CalendarGridComponent {
  @Input() currentMonth: number = new Date().getMonth();
  @Input() currentYear: number = new Date().getFullYear();

  @Input() selectedDate?: Date | null;
  @Output() dateSelected = new EventEmitter<Date>();

  daysInMonth = computed((): (number | null)[] => {
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay(); // 0..6
    const lastDate = new Date(this.currentYear, this.currentMonth + 1, 0).getDate(); // 28..31

    const days: (number | null)[] = [];

    for (let i = 0; i < firstDayOfMonth; i++) days.push(null);

    for (let d = 1; d <= lastDate; d++) days.push(d);

    while (days.length % 7 !== 0) days.push(null);

    return days;
  });

  selectDate(day: number | null) {
    if (!day) return;
    const selected = new Date(this.currentYear, this.currentMonth, day);
    this.dateSelected.emit(selected);
  }
}
