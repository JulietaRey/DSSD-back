import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Put,
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


  @Put(':projectId/seen')
  async clearNotification(@Param('projectId') projectId: number) {
    return this.projectService.markAsSeen(projectId);
  }

  @Put(':caseId/cancel')
  async cancelProject(@Param('caseId') caseId: number) {
    return this.projectService.cancelProject(caseId);
  }

  @Put(':caseId/success')
  async finishProject(@Param('caseId') caseId: number) {
    return this.projectService.finishProject(caseId);
  }

  @Post(':caseId/protocol')
  async startProtocolExecution(
    @Param('caseId') caseId: number,
    @Body('order') order: number, 
  ) : Promise<{ 
    protocolResult: number
  }> {
    //console.log("caseId:"+caseId);
    //console.log("order:"+order);
    const project = await this.projectService.getProjectByCaseId(caseId);
    console.log(project);
    const protocol = await this.projectService.getProtocolByOrder(project.id, order);

    //esto no sabia bien cómo encararlo
    await this.projectService.checkProtocol(project.id, protocol.id);
    const res = await this.projectService.executeProtocol(protocol);
    //este return en realidad deberia devolver el puntaje y LUEGO de que termina
   
    return {
      protocolResult: res.puntaje
    };
  }

}
