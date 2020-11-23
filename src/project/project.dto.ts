import { Protocol } from "src/protocol/protocol.dto";

export interface configureProjectDto {
  name: string;
  protocolList: Protocol[];
  caseId: number;
  startDate: Date;
  endDate: Date;
  ownerId: number;
}

export interface createProjectDto {
  nombre: string;
  caseId: number;
  fecha_inicio: Date;
  fecha_fin: Date;
}