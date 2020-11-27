import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  ProtocolStatus } from 'src/protocol/protocol.dto';
import { ProtocolRepository } from 'src/protocol/protocol.repository';
import { configureProjectDto } from './project.dto';
import { ProjectRepository } from './project.repository';
import { BonitaRepository } from 'src/auth/bonita.repository';
import { Protocol } from 'src/protocol/protocol.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectRepository)
    private projectRepository: ProjectRepository,
    @InjectRepository(ProtocolRepository)
    private protocolRepository: ProtocolRepository,
    private bonitaRepository: BonitaRepository,
  ) { }

  async checkProtocol(projectId: number, protocolId: number) {
    const project = await this.projectRepository.findOne(
      {
        id: projectId,
      },
      {
        loadRelationIds: true,
      },
    );
    if (!project) {
      throw new HttpException('El proyecto no existe', HttpStatus.NOT_FOUND);
    }
    const protocol = await this.protocolRepository.findOne(protocolId);
    if (!protocol) {
      throw new HttpException('No existe este protocolo', HttpStatus.NOT_FOUND);
    }
    if (!project.protocolIds.some(id => id == protocolId)) {
      throw new HttpException(
        'El protocolo no pertenece al proyecto especificado',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async executeProtocol(
    id: number,
  ): Promise<{
    operacion: string;
  }> {
    await this.protocolRepository.updateProtocol(id, {
      estado: ProtocolStatus.inProgress,
      puntaje: 0,
    });
    setTimeout(() => {
      this.protocolRepository.simulateStart(id, Math.floor(Math.random() * 11));
    }, 15000);

    return {
      operacion: 'Comenzando protocolo...',
    };
  }

  async getProtocolStatus(
    id: number,
  ): Promise<{
    estado: string;
    puntaje?: number;
  }> {
    const protocol = await this.protocolRepository.findOne(id);
    if (!protocol) {
      throw new HttpException('No existe este protocolo', HttpStatus.NOT_FOUND);
    }
    return {
      estado: protocol.estado,
      puntaje: protocol.puntaje,
    };
  }
  async createProject(projectDto: configureProjectDto) {
    const project = await this.projectRepository.createProject({
      nombre: projectDto.name,
      caseId: projectDto.caseId,
      fecha_inicio: projectDto.startDate,
      fecha_fin: projectDto.endDate,
    }, projectDto.ownerId);
    await this.protocolRepository.createProtocols(projectDto.protocolList, project);

  }

  async getProjectList(ownerId: number) {
    return this.projectRepository.getAll(ownerId);
  }

  async getProtocolByOrder(projectId: number, order: number): Promise<Protocol> {
    const protocols = await this.projectRepository.getProjectProtocols(projectId);
    return protocols.find(protocol => protocol.orden == order);
  }
}
