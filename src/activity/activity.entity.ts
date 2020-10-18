import { Protocol } from "src/protocol/protocol.entity";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Activity extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column() nombre: string;
 

}