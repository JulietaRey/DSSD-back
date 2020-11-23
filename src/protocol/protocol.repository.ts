import { Project } from 'src/project/project.entity';
import { Repository, EntityRepository } from 'typeorm';
import { ProtocolStatus, Protocol as ProtocolDto } from './protocol.dto';
import { Protocol } from './protocol.entity';

@EntityRepository(Protocol)
export class ProtocolRepository extends Repository<Protocol> {
  async getAll(): Promise<Protocol[]> {
    const query = this.createQueryBuilder('protocol');
    const protocol = await query.getMany();
    return protocol; 
  }

  async updateProtocol(id: number, params: any) {
    const protocol = await this.findOne(id);
    const updated = {
      ...protocol, ...params
    };
    this.save(updated);
  }

  async simulateStart(id: number, puntaje: number) {
    this.updateProtocol(id, {
      puntaje,
      estado: ProtocolStatus.finished
    })
  }

  async createProtocols(protocolList: ProtocolDto[], project: Project) {
    return Promise.all(protocolList.map(protocol => {
      const newProtocol = new Protocol();
      Object.assign(newProtocol, protocol, {
        project,
        fecha_inicio: project.fecha_inicio,
        fecha_fin: project.fecha_fin,
        estado: ProtocolStatus.ready
      })
      return newProtocol.save();
    }))
  }
}
