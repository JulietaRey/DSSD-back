import { Repository, EntityRepository } from 'typeorm';
import { Protocol } from './protocol.entity';

@EntityRepository(Protocol)
export class ProtocolRepository extends Repository<Protocol> {
  async getAll(): Promise<Protocol[]> {
    const query = this.createQueryBuilder('protocol');
    const protocol = await query.getMany();
    return protocol; 
  }

  async updateStatus(id: number, estado: string): Promise<{
    estado: string
  }> {
    await this.createQueryBuilder()
      .update(Protocol)
      .set({ estado: estado })
      .where("id = :id", { id: id })
      .execute();
    
    const protocol = await this.findOne(id);

    return {
      estado: protocol.estado
    };    
  }

  async updatePuntaje(id: number, puntaje: number): Promise<{
    puntaje: number
  }> {
    await this.createQueryBuilder()
      .update(Protocol)
      .set({ puntaje: puntaje })
      .where("id = :id", { id: id })
      .execute();
    
      const protocol = await this.findOne(id);

      return {
        puntaje: protocol.puntaje
      }; 
  }
}
