export enum ProtocolStatus {
  inProgress = 'en progreso',
  finished = 'finalizado',
  ready = 'listo',
}

interface startProtocolDto {
  fail: boolean;
}

export interface Protocol {
  nombre: string;
  orden: number;
  local: boolean;
}