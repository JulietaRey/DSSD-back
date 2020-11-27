export enum ProtocolStatus {
  inProgress = 'en progreso',
  finished = 'finalizado',
  ready = 'listo',
}

export interface Protocol {
  nombre: string;
  orden: number;
  local: boolean;
  endDate: Date;
  startDate: Date;
}