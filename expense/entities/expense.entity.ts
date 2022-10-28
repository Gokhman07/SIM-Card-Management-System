import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from '../../clients/entities/client.entity';
import { User } from '../../users/entities/user.entity';
import { Sim } from '../../sims/entities/sim.entity';
import { Company } from '../../company/entities/company.entity';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsInt,
  IsNumber,
  IsOptional,
} from 'class-validator';
//import { OrderStatus } from './order.status';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

 @IsOptional()
  @Column({ nullable: true })
  amount: number;

  // @IsNotEmpty({ groups: ['publish'] })
  //@ManyToOne(() => Client, (client) => client.orders, { nullable: true, onDelete: 'CASCADE' })
///  client: Client | number;

/*

	@IsOptional()
  @IsInt()
  @ManyToOne(() => Client, { cascade: ['remove'] })
  client: Client;
*/



@IsOptional()
  @Column({ nullable: true })
  comment: string;
}
