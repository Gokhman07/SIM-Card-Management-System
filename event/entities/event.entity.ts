import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsDate,
  IsDateString,
  IsPositive, IsEmpty
} from "class-validator";

import {User } from 'src/users/entities/user.entity';

import { Modules } from "src/module/entities/module.enitity";
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;
/*
  @Column({  default: () => 'CURRENT_DATE' })
  createDate: string;
*/

  @IsOptional()
  @IsString()
  @Column()
  createDate: string;

  @IsOptional()
  @IsString()
  @Column()
  operation: string;

  @IsOptional()
  @IsString()
  @Column()
  link: string;

  @IsOptional()

  @ManyToOne(() => User, { cascade: ['remove'] })
  user: User;

 @IsOptional()
  @Column()
  moduleId: number;



/*
   @IsNotEmpty()
  @IsInt()
  @ManyToOne(() => Modules, { cascade: ['remove'] })
  modules: Modules;
*/






}
