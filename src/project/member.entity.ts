import { Protocol } from "src/protocol/protocol.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity";

@Entity()
export class Member extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column() nombre: string;

  @OneToMany(() => Protocol, protocol => protocol.owner)
  protocols: Protocol[]

  @OneToMany(() => Project, project => project.owner)
  projects: Project[]
}