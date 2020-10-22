import { Controller, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Post(':projectId/protocol/:protocolId')
  async startProtocol(
    @Param('projectId') projectId: number,
    @Param('protocolId') protocolId: number,
  ): Promise<{
    operacion: string;
  }> {
    const protocolBelongsToProject = await this.projectService.checkProtocol(projectId, protocolId);
    if (!protocolBelongsToProject) {
      throw new HttpException('El protocolo no pertenece al proyecto especificado', HttpStatus.BAD_REQUEST);
    }

    return this.projectService.executeProtocol(protocolId);
  }
}
