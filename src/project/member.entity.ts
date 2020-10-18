import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Member extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column() nombre: string;

}