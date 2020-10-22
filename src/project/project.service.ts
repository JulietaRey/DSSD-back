import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProtocolStatus } from 'src/protocol/protocol.dto';
import { ProtocolRepository } from 'src/protocol/protocol.repository';
import { ProjectRepository } from './project.repository';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectRepository)
    private projectRepository: ProjectRepository,
    @InjectRepository(ProtocolRepository)
    private protocolRepository: ProtocolRepository,
  ) {}

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
}
