import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { stringify } from 'querystring';
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

  async startProtocol(id: number): Promise<{
    operacion: string,
  }> {
    const resultado = this.protocolRepository.updateStatus(id, 'en progreso');
    
    return {
      operacion: (await resultado).estado
    };
  }
  
  async executeProtocol(id: number): Promise<{
    operacion: string,
  }> {
    await new Promise(r => setTimeout(r, 15000));
    this.protocolRepository.updatePuntaje(id, Math.floor(Math.random()*11));
    const resultado = this.protocolRepository.updateStatus(id, 'finalizado');

    return {
      operacion: (await resultado).estado
    }
  }

  async getProtocolStatus(id: number, finished?: number): Promise<{
    estado: string,
    puntaje?: number
  }> {
    const protocol = await this.protocolRepository.findOne(id);  
    if (finished) {   
      return {
        estado: protocol.estado,
        puntaje: protocol.puntaje
      }
    }
    return {
      estado: protocol.estado,
      puntaje: protocol.puntaje
    }

  }
}
