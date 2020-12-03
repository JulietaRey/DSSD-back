import { Body, Controller, Get, Param, Put, Query  } from '@nestjs/common';
import { ProtocolStatus } from './protocol.dto';
import { Protocol } from './protocol.entity';
import { ProtocolService } from './protocol.service';

@Controller('protocol')
export class ProtocolController {
  constructor(private readonly protocolService: ProtocolService) {}

  @Get('list')
  async getProtocolList(@Query('ownerId') ownerId: number) : Promise<Protocol[]>{
    return this.protocolService.getProtocolList(ownerId);
  }
  @Put(':protocolId/ready')
  async setProtocolReady(@Param('protocolId') protocolId: number) {
    return this.protocolService.updateProtocol(protocolId, {estado: ProtocolStatus.ready});    
  }
  @Put(':protocolId/finished')
  async setProtocolFinished(
    @Param('protocolId') protocolId: number, 
    @Body('score') score: number,
    @Body('ownerId') ownerId: number,
    @Body('exec') exec: number) {
    await this.protocolService.updateProtocol(protocolId, {
      puntaje: score,
      estado: ProtocolStatus.finished,
      ejecuciones: exec + 1,
    });
    await this.protocolService.assignProtocol(protocolId, ownerId);
  }

  @Get('/owners')
  async getProtocolOwners() {
    return this.protocolService.getPossibleOwners();
  }

  @Get('/members')
  async getMembersWithProtocols() {
    return this.protocolService.getMembersWithTheirProtocols();
  }
}
