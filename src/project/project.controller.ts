import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Protocol } from 'src/protocol/protocol.entity';
import { configureProjectDto } from './project.dto';
import { Project } from './project.entity';
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

  @Post()
  async configureProject(@Body() projectDto: configureProjectDto) {
    return this.projectService.createProject(projectDto);
  }

  @Get()
  async getProjectList(@Query('ownerId') ownerId: number): Promise<Project[]> {
    return this.projectService.getProjectList(ownerId);
  }

  @Get(':projectId/protocol')
  async getProtocolByOrder(
    @Param('projectId') projectId: number,
    @Query('order') order: number, 
  ) : Promise<Protocol> {
    return this.projectService.getProtocolByOrder(projectId, order);
  }
}
