import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { Event } from '../../event/entities/event.entity';

@Entity()
export class Modules {
  @PrimaryGeneratedColumn()
  id: number;

  




  @IsOptional()
  @Column({ nullable: true, default: '' })
  title: string;

/*

  @OneToMany(() => Event, (event) => event.module)
  event: Event[];
  */
}
