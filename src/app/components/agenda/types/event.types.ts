export interface AgendaEvent {
  id: number;
  title: string;
  time: string;
  type: string;
  studioId: number;
}

export interface StudioEvent {
  id: number;
  date: Date;
  title: string;
  studio: string;
  start: string;
  end: string;
  color: string;
}
