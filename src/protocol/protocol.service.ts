import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { USER_ROL } from 'src/constants';
import { Member } from 'src/project/member.entity';
import { In } from 'typeorm';
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
  async getPossibleOwners() {
    const users = await User.find({
      rolId: USER_ROL
    });
    return users;
  }
  async getMembersWithTheirProtocols() {
    const users = await User.find({
      rolId: USER_ROL
    });
    const userIds = users.map(user => user.id);
    return Member.find({ 
        where: {
          id: In(userIds)
        },
      relations: ['protocols']
      })
  }
}
