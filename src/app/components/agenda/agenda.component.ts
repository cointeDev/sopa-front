import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarGridComponent } from './components/calendar-grid/calendar-grid.component';
import { EventListComponent, AgendaEvent } from './components/event-list/event-list.component';
import { MiniCalendarComponent } from './components/mini-calendar/mini-calendar.component';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [
    CommonModule,
    CalendarGridComponent,
    EventListComponent,
    MiniCalendarComponent
  ],
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent {

  currentMonth = signal(new Date().getMonth());
  currentYear = signal(new Date().getFullYear());
  selectedDate = signal<Date | null>(new Date());

  events = signal<AgendaEvent[]>([
    { id: 1, title: 'Aula Matemática', time: '08:00', type: 'Gravado', studioId: 1 },
    { id: 2, title: 'Reunião Projeto X', time: '10:00', type: 'Ao Vivo', studioId: 2 }
  ]);

  dailyEvents = computed(() => {
    const selected = this.selectedDate();
    if (!selected) return [];

    return this.events().filter(e => {
      const eventDate = new Date();
      return (
        eventDate.getFullYear() === selected.getFullYear() &&
        eventDate.getMonth() === selected.getMonth() &&
        eventDate.getDate() === selected.getDate()
      );
    });
  });

  onDateSelected(date: Date) {
    this.selectedDate.set(date);
  }

  nextMonth() {
    const m = this.currentMonth();
    const y = this.currentYear();
    if (m === 11) {
      this.currentMonth.set(0);
      this.currentYear.set(y + 1);
    } else {
      this.currentMonth.set(m + 1);
    }
  }

  prevMonth() {
    const m = this.currentMonth();
    const y = this.currentYear();
    if (m === 0) {
      this.currentMonth.set(11);
      this.currentYear.set(y - 1);
    } else {
      this.currentMonth.set(m - 1);
    }
  }
}
