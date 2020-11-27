import { Protocol } from 'src/protocol/protocol.entity';
import { Repository, EntityRepository } from 'typeorm';
import { Member } from './member.entity';
import { createProjectDto } from './project.dto';
import { Project } from './project.entity';

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
  async getAll(ownerId: number): Promise<Project[]> {
    const owner = await Member.findOne(ownerId, { relations: ['projects']});
    return owner.projects;
  }

  async getProjectProtocols(projectId) : Promise<Protocol[]> {
    const project = await Project.findOne(projectId, { relations: ['protocols']});
    return project.protocols;
  }

  async createProject(projectData: createProjectDto, ownerId: number): Promise<Project> {
    const project = new Project();
    const owner = await Member.findOne({
      id: ownerId,
    });
    Object.assign(project, projectData, {
      owner
    });
    await project.save();
    return project;
  }
}
