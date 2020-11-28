import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from 'src/project/member.entity';
import { ProtocolRepository } from './protocol.repository';

@Injectable()
export class ProtocolService {
  constructor(@InjectRepository(ProtocolRepository)
  private protocolRepository: ProtocolRepository) { }
  
  async getProtocolList(ownerId: number) {
    return this.protocolRepository.getAll(ownerId);
  }

  updateProtocol(protocolId: number, params: {[key: string]: any}) {
    this.protocolRepository.update(protocolId, params);
  }

  async assignProtocol(protocolId: number, memberId: number) {
    const member = await Member.findOne({
      id: memberId
    });
    const protocol = await this.protocolRepository.findOne(protocolId);
    protocol.owner = member;
    await protocol.save();
  }
}
