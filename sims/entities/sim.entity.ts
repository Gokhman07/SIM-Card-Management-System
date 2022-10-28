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

import { Company } from '../../company/entities/company.entity';
import { Orders } from "../../orders/entities/order.entity";
import { Transaction } from "src/transactions/entities/transaction.entity";

@Entity()
export class Sim {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Column({ unique: true })
  code: string;

  @IsNotEmpty()

  @ManyToOne(() => Company, { cascade: ['remove'] })
  company: Company|number ;


	
  @IsNotEmpty()
  @IsString()
  @Column()
  number: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  isr_number: string;


  @IsOptional()
  @IsString()
 @Column({ nullable: true })
 second_number: string;


  @IsOptional()
  @IsBoolean()
  @Column({ default: true })
  active: boolean;
/*
  @OneToMany(() => Transaction, (transaction) => transaction.sim, { onDelete: 'CASCADE' })
  transactions: Transaction[];
*/

  @IsEmpty()
  @Column({ nullable: true, type: 'timestamp' })
  busyDate: Date;

  @IsOptional()
  @IsDateString({ strict: false }, )
  @Column({ nullable: false, type: 'timestamp' })
  chargeDate: Date;

  @OneToMany(() => Orders, (order) => order.item)
  orders: Orders[];

  //@IsNotEmpty()
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Column({ nullable: true })
  amountOfDaysBeforeDeath: number;

  @IsOptional()
  @IsDateString({ strict: false }, )
  @Column({ nullable: true, type: 'timestamp' })
  lastChargeDate: Date;

  @IsOptional()
  @IsBoolean()
  @Column({ default: false })
  returned: boolean;
 
 

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  createDate: string;

  @IsOptional()
  @Column({ default: 0 })
  chargeDays: number;

}
