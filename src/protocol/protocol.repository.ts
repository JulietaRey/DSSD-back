import { Repository, EntityRepository } from 'typeorm';
import { ProtocolStatus } from './protocol.dto';
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
}
