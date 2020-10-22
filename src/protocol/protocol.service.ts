import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProtocolRepository } from './protocol.repository';

@Injectable()
export class ProtocolService {
  constructor(
    @InjectRepository(ProtocolRepository)
    private protocolRepository: ProtocolRepository,
  ) {}

  async getProtocolStatus(id: number): Promise<{
    estado: string,
    puntaje?: number
  }> {
    const protocol = await this.protocolRepository.findOne(id);  
    return {
      estado: protocol.estado,
      puntaje: protocol.puntaje
    }

  }
}
