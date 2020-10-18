import { Protocol } from 'src/protocol/protocol.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Member } from './member.entity';

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column() nombre: string;

  @Column() fecha_inicio: Date;
  @Column() fecha_fin: Date;

  @OneToOne(type => Member)
  @JoinColumn()
  owner: Member;

  @OneToMany(() => Protocol, protocol => protocol.project)
  protocols: Protocol[];

}
