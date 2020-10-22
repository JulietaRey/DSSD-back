import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProjectService } from './project.service';

@Controller('project')
@UseGuards(AuthGuard())
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post(':projectId/protocol/:protocolId')
  async startProtocol(
    @Param('projectId') projectId: number,
    @Param('protocolId') protocolId: number,
  ): Promise<{
    operacion: string;
  }> {
    await this.projectService.checkProtocol(projectId, protocolId);

    return this.projectService.executeProtocol(protocolId);
  }

  @Get(':projectId/protocol/:protocolId/status')
  async getProtocolStatusFinished(
    @Param('projectId') projectId: number,
    @Param('protocolId') protocolId: number,
  ): Promise<{
    estado: string;
    puntaje?: number;
  }> {
    await this.projectService.checkProtocol(projectId, protocolId);

    return this.projectService.getProtocolStatus(protocolId);
  }
}
