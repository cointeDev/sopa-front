import { StudioEvent } from "../components/agenda/types/event.types";

export const LocalStorageData = {
  AGENDA_EVENTS_DEFAULT: <StudioEvent[]>[
    {
      id: 1,
      date: new Date(),
      title: 'Show Banda X',
      studio: 'Studio 1',
      start: '10:00',
      end: '12:00',
      color: '#FF6B6B',
    },
    {
      id: 2,
      date: new Date(),
      title: 'Gravação Podcast',
      studio: 'Studio 2',
      start: '14:00',
      end: '16:00',
      color: '#4ECDC4',
    }
  ]
};
