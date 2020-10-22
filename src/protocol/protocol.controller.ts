import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseBoolPipe, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Protocol } from './protocol.entity';
import { ProtocolService } from './protocol.service';

@Controller('protocol')
@UseGuards(AuthGuard())
export class ProtocolController {
  constructor(private readonly protocolService: ProtocolService) { }
  
  @Get(':id/status')
  getProtocolStatusFinished(@Param('id') id: number, @Query() query?: any): Promise<{
    estado: string,
    puntaje?: number
  }> {
    return this.protocolService.getProtocolStatus(id, +query.finished);
  }

  @Post(':id')
  startProtocol(@Param('id') id: number, @Body() data: startProtocolDto): Promise<{
    operacion: string
  }> {
    if (data.fail) {
      throw new HttpException('Hubo un error lanzando el protocolo', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const estado = this.protocolService.startProtocol(id);

    return this.protocolService.executeProtocol(id);
  }

}
