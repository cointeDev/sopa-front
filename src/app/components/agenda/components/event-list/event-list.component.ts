import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface AgendaEvent {
  id: number;
  title: string;
  time: string;
  type: string;
  studioId: number;
}

@Component({
  selector: 'event-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent {
  @Input() events: AgendaEvent[] = [];
  @Output() eventSelected = new EventEmitter<AgendaEvent>();

  selectEvent(event: AgendaEvent) {
    this.eventSelected.emit(event);
  }
}
