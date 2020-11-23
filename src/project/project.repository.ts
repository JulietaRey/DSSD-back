import { Repository, EntityRepository } from 'typeorm';
import { Member } from './member.entity';
import { createProjectDto } from './project.dto';
import { Project } from './project.entity';

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
  async getAll(): Promise<Project[]> {
    const query = this.createQueryBuilder('project');
    const projects = await query.getMany();
    return projects; 
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
