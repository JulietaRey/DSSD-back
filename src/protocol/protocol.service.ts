import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Protocol } from './protocol.entity';
import { ProtocolRepository } from './protocol.repository';

@Injectable()
export class ProtocolService {
  constructor(
    @InjectRepository(ProtocolRepository)
    private protocolRepository: ProtocolRepository,
  ) {}

  async getAllProtocols(): Promise<Protocol[]> {
    return this.protocolRepository.getAll();
  }
  
  async getProtocolStatus(id: number, finished?: number): Promise<{
    estado: string,
    puntaje?: number
  }> {
    const protocol = await this.protocolRepository.findOne(id);
    if (finished) {     
      return {
        estado: 'finalizado',
        puntaje: protocol.puntaje
      }
    }
    return {
      estado: 'en progreso',
      puntaje: 0
    }

  }
}
