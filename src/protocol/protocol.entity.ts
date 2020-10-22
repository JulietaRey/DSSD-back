import { Activity } from "src/activity/activity.entity";
import { Member } from "src/project/member.entity";
import { Project } from "src/project/project.entity";
import { BaseEntity, Column, Entity, JoinColumn,  JoinTable,  ManyToMany,  OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Protocol extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column() nombre: string;

  @OneToOne(()=> Member)
  @JoinColumn()  
  owner: Member;

  @Column()
  fecha_inicio: Date;

  @Column()
  fecha_fin: Date;

  @Column()
  estado: string;
  
  @Column()
  orden: number;

  @Column()
  local: boolean;

  @Column()
  puntaje: number;

  @OneToOne(() => Project)
  @JoinColumn()
  project: Project;
  
  @ManyToMany(() => Activity)
  @JoinTable()
  activities: Activity[]
}