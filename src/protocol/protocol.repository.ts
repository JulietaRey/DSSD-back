import { Member } from 'src/project/member.entity';
import { Project } from 'src/project/project.entity';
import { Repository, EntityRepository, IsNull, Not, In } from 'typeorm';
import { ProtocolStatus, Protocol as ProtocolDto } from './protocol.dto';
import { Protocol } from './protocol.entity';

@EntityRepository(Protocol)
export class ProtocolRepository extends Repository<Protocol> {
  async getAll(ownerId: number): Promise<Protocol[]> {
    const owner = await Member.findOne(ownerId, { relations: ['protocols']});
    const ownedProtocols = owner.protocols || [];
    const unassignedProtocols = await this.find({ 
      relations: ['owner'],
      where: [
        {
          local: true,
          owner: IsNull(),
          estado: Not(In([ProtocolStatus.inProgress, ProtocolStatus.finished])),
        }, {
          owner: IsNull(),
          estado: IsNull(),
          local: true,
        }
      ]
      
    });
    return [...ownedProtocols, ...unassignedProtocols];
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
    return Promise.all(protocolList.map(async ({owner, ...protocol}) => {
      const newProtocol = new Protocol();
      const member = await Member.findOne(owner); 
      Object.assign(newProtocol, protocol, {
        project,
        fecha_inicio: protocol.startDate,
        fecha_fin: protocol.endDate,
        owner: member
      });
      await newProtocol.save();
    }))
  }
}
