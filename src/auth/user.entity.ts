import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['username'])
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({
    nullable: true
  })
  rolId: number;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }

}