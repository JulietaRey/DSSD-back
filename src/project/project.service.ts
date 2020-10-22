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

  async checkProtocol(projectId: number, protocolId: number): Promise<boolean> {
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
    return project.protocolIds.some(id => id == protocolId);
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
}
