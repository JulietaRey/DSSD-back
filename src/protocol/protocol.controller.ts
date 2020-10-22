import {Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProtocolService } from './protocol.service';

@Controller('protocol')
@UseGuards(AuthGuard())
export class ProtocolController {
  constructor(private readonly protocolService: ProtocolService) { }
  
  @Get(':id/status')
  getProtocolStatusFinished(@Param('id') id: number): Promise<{
    estado: string,
    puntaje?: number
  }> {
    return this.protocolService.getProtocolStatus(id);
  }

}
