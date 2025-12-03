import { Component, OnInit, Input, signal, Signal } from '@angular/core'; 
import { CommonModule, DatePipe } from '@angular/common';


export interface AgendaEvent {
  id: number;
  data: Date;
  titulo: string;
  tipo: 'gravacao' | 'prazo';
  studioId: 'mossoro' | 'natal' | 'rei';
  responsavelId?: string;
}

export interface EventStudioColorMap { [key: string]: string; }

const studioColorMap: EventStudioColorMap = {
  'natal': '#EF4444',
  'mossoro': '#3B82F6',
  'rei': '#10B981',
};

const mockEvents: AgendaEvent[] = [
  { id: 1, data: new Date(2025, 10, 20, 10, 0), titulo: 'Gravação: Aula de Cálculo', tipo: 'gravacao', studioId: 'mossoro', responsavelId: 'caio' },
  { id: 2, data: new Date(2025, 10, 20, 14, 0), titulo: 'Prazo: Roteiro Tópicos Av. III', tipo: 'prazo', studioId: 'mossoro' },
  { id: 3, data: new Date(2025, 10, 26, 9, 30), titulo: 'Gravação: Entrevista Maker', tipo: 'gravacao', studioId: 'mossoro', responsavelId: 'alana' },
  { id: 4, data: new Date(2025, 10, 27, 15, 0), titulo: 'Gravação: Treinamento LIBRAS', tipo: 'gravacao', studioId: 'natal', responsavelId: 'joao_paulo' },
  { id: 5, data: new Date(2025, 11, 5, 17, 0), titulo: 'Prazo Final: Lançamento de Campanha', tipo: 'prazo', studioId: 'rei' },
  { id: 6, data: new Date(2025, 11, 15, 11, 0), titulo: 'Gravação: Live de Fim de Ano', tipo: 'gravacao', studioId: 'rei', responsavelId: 'rocheto' },
];



@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.css'
})
export class Agenda implements OnInit {

  @Input() scope: 'local' | 'global' = 'global';
  @Input() studioId?: 'mossoro' | 'natal' | 'rei';

  public currentDate: Date = new Date();
  public weekDays: string[] = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  public miniWeekDays: string[] = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  public displayMonth: Date = new Date();
  public calendarDays = signal<(Date | null)[]>([]);

  public selectedDay = signal<Date | null>(null);
  public selectedDayEvents = signal<AgendaEvent[]>([]);

  public prevMonthDate = signal<Date>(new Date());
  public nextMonthDate = signal<Date>(new Date());
  public prevMonthDays = signal<(Date | null)[]>([]);
  public nextMonthDays = signal<(Date | null)[]>([]);

  constructor() { }

  ngOnInit(): void {
    this.generateCalendar();
  }
  
  openDayDetails(day: Date): void {
    const events = this.getEventsForDay(day);

    if (this.selectedDay() && this.selectedDay()!.toDateString() === day.toDateString()) {
      this.selectedDay.set(null);
      this.selectedDayEvents.set([]);
    } else if (events.length > 0) {
      this.selectedDay.set(day);
      this.selectedDayEvents.set(events);
    } else {
      this.selectedDay.set(null);
      this.selectedDayEvents.set([]);
    }
  }


  private generateMonthDays(date: Date): (Date | null)[] {
    const days: (Date | null)[] = [];
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const startDayOfWeek = startOfMonth.getDay(); 
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }

    for (let d = new Date(startOfMonth); d <= endOfMonth; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }
    while (days.length % 7 !== 0) {
        days.push(null);
    }
    
    return days;
  }
  
  generateCalendar(): void {
    this.calendarDays.set(this.generateMonthDays(this.displayMonth));

    const prev = new Date(this.displayMonth.getFullYear(), this.displayMonth.getMonth() - 1, 1);
    this.prevMonthDate.set(prev);
    this.prevMonthDays.set(this.generateMonthDays(prev));

    const next = new Date(this.displayMonth.getFullYear(), this.displayMonth.getMonth() + 1, 1);
    this.nextMonthDate.set(next);
    this.nextMonthDays.set(this.generateMonthDays(next));
    
    this.selectedDay.set(null);
    this.selectedDayEvents.set([]);
  }

  changeMonth(direction: number): void {
    this.displayMonth.setMonth(this.displayMonth.getMonth() + direction);
    this.displayMonth = new Date(this.displayMonth);
    this.generateCalendar();
  }

  isToday(day: Date): boolean {
    const today = new Date();
    return day.toDateString() === today.toDateString();
  }
  
  isSelectedDay(day: Date): boolean {
      return this.selectedDay() ? day.toDateString() === this.selectedDay()!.toDateString() : false;
  }

  getEventsForDay(day: Date): AgendaEvent[] {
    const dayEvents = mockEvents.filter(event => 
      event.data.toDateString() === day.toDateString()
    ).sort((a, b) => {
        if (a.tipo === 'gravacao' && b.tipo === 'prazo') return -1;
        if (a.tipo === 'prazo' && b.tipo === 'gravacao') return 1;
        return 0;
    });

    if (this.scope === 'global' || !this.studioId) {
      return dayEvents;
    } else {
      return dayEvents.filter(event => event.studioId === this.studioId);
    }
  }

  hasEvents(day: Date): boolean {
    return this.getEventsForDay(day).length > 0;
  }
  
  getStudioColor(studioId: string): string {
    return studioColorMap[studioId] || '#9CA3AF';
  }
}