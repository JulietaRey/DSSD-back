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
    operacion: string
  }> {
    await this.createQueryBuilder()
      .update(Protocol)
      .set({ estado: estado })
      .where("id = :id", { id: id })
      .execute();
    //lo esta updateando bien?
    //HACER RANDOM QUE ESPERE Y LO CAMBIE
    const protocol = await this.findOne(id);

    if (protocol.estado == 'en progreso'){
      return {
        operacion: 'protocolo iniciado con exito'
      }
    }
    return {
      operacion: 'el protocolo no se pudo iniciar'
    };
  }
}
