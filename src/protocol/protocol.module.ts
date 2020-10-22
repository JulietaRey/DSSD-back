import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ProjectRepository } from 'src/project/project.repository';
import { ProtocolController } from './protocol.controller';
import { ProtocolRepository } from './protocol.repository';
import { ProtocolService } from './protocol.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([ProtocolRepository]),
    TypeOrmModule.forFeature([ProjectRepository])
  ],
  controllers: [ProtocolController],
  providers: [ProtocolService]
})
export class ProtocolModule {}
