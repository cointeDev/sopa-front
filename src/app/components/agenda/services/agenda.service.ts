import { Injectable, signal } from '@angular/core';
import { Event } from '../types/event.types';

@Injectable({ providedIn: 'root' })
export class AgendaService {
  private eventsMock: Event[] = [
    { id: 1, date: new Date(), title: 'Show Banda X', studio: 'Studio 1', start: '10:00', end: '12:00', color: '#FF6B6B' },
    { id: 2, date: new Date(), title: 'Gravação Podcast', studio: 'Studio 2', start: '14:00', end: '16:00', color: '#4ECDC4' },
  ];

  events = signal<Event[]>(this.eventsMock);
}
