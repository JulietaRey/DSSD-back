import { Activity } from "src/activity/activity.entity";
import { Member } from "src/project/member.entity";
import { Project } from "src/project/project.entity";
import { BaseEntity, Column, Entity, JoinColumn,  JoinTable,  ManyToMany,  ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProtocolStatus } from "./protocol.dto";

@Entity()
export class Protocol extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column() nombre: string;

  @ManyToOne(()=> Member, member => member.protocols)
  owner: Member;

  @Column()
  fecha_inicio: Date;

  @Column()
  fecha_fin: Date;

  @Column({ nullable: true})
  estado: ProtocolStatus;
  
  @Column()
  orden: number;

  @Column()
  local: boolean;

  @Column({ nullable: true})
  puntaje: number;

  @ManyToOne(() => Project, project=> project.protocols)
  @JoinColumn()
  project: Project;
  
  @ManyToMany(() => Activity)
  @JoinTable()
  activities: Activity[]
}