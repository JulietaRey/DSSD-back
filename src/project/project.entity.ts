import { Protocol } from 'src/protocol/protocol.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Member } from './member.entity';

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column() nombre: string;

  @Column() fecha_inicio: Date;
  @Column() fecha_fin: Date;

  @ManyToOne(type => Member, member => member.projects)
  owner: Member;

  @OneToMany(() => Protocol, protocol => protocol.project)
  protocols: Protocol[];

  @RelationId((project: Project) => project.protocols)
  protocolIds: number[]

}
