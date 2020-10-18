import { Module } from '@nestjs/common';
import { ProtocolModule } from './protocol/protocol.module';
import { ProjectModule } from './project/project.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm';
import { ActivityModule } from './activity/activity.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    ProtocolModule,
    ProjectModule,
    ActivityModule,
  ],

})
export class AppModule {}
