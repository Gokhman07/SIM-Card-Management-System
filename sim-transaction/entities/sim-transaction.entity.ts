import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Sim } from '../../sims/entities/sim.entity';
import { IsEmpty, IsInt, IsOptional, } from "class-validator";
import { OperationType } from 'src/transactions/entities/operation.type';
import { Client } from 'src/clients/entities/client.entity';

@Entity()
export class SimTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Sim)
  sim: Sim | number;

  @IsInt()
  @Column()
  amount: number;

  @Column({ nullable: true, default: '' })
  description: string;

  @IsEmpty()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @IsOptional()
  @Column({ default: 0 })
  chargeDays: number;

}
