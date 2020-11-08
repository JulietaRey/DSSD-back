import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BonitaRepository } from 'src/auth/bonita.repository';
import { ProtocolRepository } from 'src/protocol/protocol.repository';
import { ProjectController } from './project.controller';
import { ProjectRepository } from './project.repository';
import { ProjectService } from './project.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([ProjectRepository]),
    TypeOrmModule.forFeature([ProtocolRepository])
  ],
  controllers: [ProjectController],
  providers: [ProjectService, BonitaRepository]
})
export class ProjectModule {}
