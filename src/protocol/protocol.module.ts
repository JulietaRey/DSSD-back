import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ProtocolController } from './protocol.controller';
import { ProtocolRepository } from './protocol.repository';
import { ProtocolService } from './protocol.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([ProtocolRepository]),
  ],
  controllers: [ProtocolController],
  providers: [ProtocolService]
})
export class ProtocolModule {}
