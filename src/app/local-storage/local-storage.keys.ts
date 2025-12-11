export const LocalStorageKeys = {
  AGENDA_EVENTS: 'agenda-events',
  USER_SETTINGS: 'user-settings',
  SELECTED_DATE: 'selected-date',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

export type LocalStorageKey = typeof LocalStorageKeys[keyof typeof LocalStorageKeys];
