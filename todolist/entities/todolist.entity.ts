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


@Entity()
export class ToDoList {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Column({ unique: false })
  value: string;



  @IsOptional()
  @IsBoolean()
  @Column({ default: true })
  status: boolean;

   @IsOptional()
  @IsInt()
  @Column({ default: true })
 user_id: number;






}
