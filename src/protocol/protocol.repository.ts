import { Repository, EntityRepository } from 'typeorm';
import { Protocol } from './protocol.entity';

@EntityRepository(Protocol)
export class ProtocolRepository extends Repository<Protocol> {
  async getAll(): Promise<Protocol[]> {
    const query = this.createQueryBuilder('protocol');
    const protocol = await query.getMany();
    return protocol; 
  }
}
