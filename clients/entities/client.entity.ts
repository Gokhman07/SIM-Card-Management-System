import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Orders } from '../../orders/entities/order.entity';
import { ClientRole } from './client.role';
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transaction } from '../../transactions/entities/transaction.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @IsOptional()
  @Column({nullable: true})
  email: string;

  @OneToMany(() => Orders, (order) => order.client, { onDelete: 'CASCADE' })
  orders: Orders[];


  @OneToMany(() => Transaction, (transaction) => transaction.client, { onDelete: 'CASCADE' })
  transactions: Transaction[];

  @IsOptional()
  @IsInt()
  @Column({
    default: 0
  })
  balance: number;

/*
  @IsOptional()
  @Column({ nullable: true, default: '' })
  company: string;
*/
  @IsOptional()
  @IsInt()
  @Column({
	  /*
    type: 'enum',
    enum: ClientRole,
    default: ClientRole.Business,
	*/
	  type: 'int', default: 2
  })
  role: number;

  @IsOptional()
  @IsBoolean()
  @Column({ type: 'boolean', default: false })
  lead: boolean;

  //@IsNotEmpty()
  @IsString()
  @Column({nullable:true})
  name: string;

  @IsOptional()
  @IsString()
  @Column({ nullable: true, default: '' })
  surname: string;

  @IsOptional()
  @IsString()
  @Column({ nullable: true, default: '' })
  additional: string;

  @IsOptional()
  @IsString()
  @Column({ nullable: true, default: '' })
  phone_city: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  mobile: string;

  @IsOptional()
  @IsString()
  @Column({ nullable: true, default: '' })
  another_mobile: string;

  @IsString()
  @IsOptional()
  @Column({ nullable: true, default: '' })
  address: string;

  @IsString()
  @IsOptional()
  @Column({ nullable: true, default: '' })
  city: string;

  @IsString()
  @IsOptional()
  @Column({ nullable: true, default: '' })
  zipcode: string;

  @IsOptional()
  @IsString()
  @Column({ nullable: true, default: '' })
  comments: string;

  
  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  createDate: string;
}
