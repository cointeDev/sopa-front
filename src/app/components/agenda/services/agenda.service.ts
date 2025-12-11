import { Injectable } from '@angular/core';
import { signal } from '@angular/core';  // Importando a funcionalidade do signal
import { StudioEvent } from '../types/event.types';
import { LocalStorageKeys } from '../../../local-storage/local-storage.keys';
import { LocalStorageData } from '../../../local-storage/local-storage.data';

@Injectable({ providedIn: 'root' })
export class AgendaService {

  private storageKey = LocalStorageKeys.AGENDA_EVENTS;

  events = signal<StudioEvent[]>(this.loadEvents());

  private loadEvents(): StudioEvent[] {
    const saved = localStorage.getItem(this.storageKey);

    if (saved) {
      return JSON.parse(saved);
    }

    return LocalStorageData.AGENDA_EVENTS_DEFAULT;
  }

  saveEvents(events: StudioEvent[]) {
    this.events.set(events);
    localStorage.setItem(this.storageKey, JSON.stringify(events));
  }
}
