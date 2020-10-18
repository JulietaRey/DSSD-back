import { Repository, EntityRepository } from 'typeorm';
import { Project } from './project.entity';

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
  async getAll(): Promise<Project[]> {
    const query = this.createQueryBuilder('project');
    const projects = await query.getMany();
    return projects; 
  }
}
