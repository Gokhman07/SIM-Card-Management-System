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
import { PriceList } from '../../price-list/entities/price-list.entity';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsInt,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { OrderStatus } from './order.status';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;
 
 @IsOptional()
  @Column({ nullable: true })
  status: number;
  


  // @IsNotEmpty({ groups: ['publish'] })
  //@ManyToOne(() => Client, (client) => client.orders, { nullable: true, onDelete: 'CASCADE' })
///  client: Client | number;
 @IsOptional()
  @Column({ nullable: true })
  price: number;
/*
@Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.DRAFT,
  })
  */
 /// status: OrderStatus | number;
/*

	@IsOptional()
  @IsInt()
  @ManyToOne(() => Client, { cascade: ['remove'] })
  client:  number;
*/

  @ManyToOne(() => Company, { cascade: ['remove'] })
  company: Company|number ;

  @ManyToOne(() => Client, { onDelete: 'CASCADE', nullable: true })
  client: Client | number;

@ManyToOne(()=>PriceList, { onDelete: 'CASCADE', nullable: true })
pricelist: PriceList | number;

	@IsOptional()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  // @IsNotEmpty()
  @ManyToOne(() => User, { nullable: true })
  creator: User;

  // @IsNotEmpty({ groups: ['publish'] })
  // @IsInt({ groups: ['publish'] })
  @ManyToOne(() => Sim, { onDelete: 'CASCADE', nullable: true })
  item: Sim | number;
/*
  // @IsNotEmpty({ groups: ['publish'] })
  // @IsInt({ groups: ['publish'] })
  @ManyToOne(() => Company, { nullable: true })
  company: Company;
*/
  // @IsNotEmpty({ groups: ['publish'] })
  // @IsDateString({}, { groups: ['publish'] })
@IsOptional()
   @Column({ type: 'timestamp'})
  startRental: Date;

  // @IsNotEmpty({ groups: ['publish'] })
  // @IsDateString({}, { groups: ['publish'] })
@IsOptional()
  @Column({ type: 'timestamp' })
 endRental: Date;

  // @IsNotEmpty({ groups: ['publish'] })
  // @IsNumber({}, { groups: ['publish'] })

  // @IsNotEmpty({ groups: ['publish'] })
  // @IsDateString({}, { groups: ['publish'] })
@IsOptional()
    @Column({ type: 'timestamp' })
 returnDate: Date;

@IsOptional()
@Column({
		nullable: true,
        length: 1500
    })
note:string;

@IsOptional()
@Column({nullable:true})
extra_note:string;

@IsOptional()
@Column({nullable:true})
extra_price:number;

@IsOptional()
@Column({default:0,nullable:true})
earphones:number;

@IsOptional()
@Column({default:0,nullable:true})
device:number;


@IsOptional()
@Column({default:0,nullable:true})
headset:number;

@IsOptional()
@Column({default:2,nullable:true})
earphones_back:number;

@IsOptional()
@Column({default:2,nullable:true})
device_back:number;

@IsOptional()
@Column({default:2,nullable:true})
headset_back:number;

@IsOptional()
@Column({nullable:true})
simCardDetail: string;

@IsOptional()
@Column({nullable:true})
country: string;


@IsOptional()
@Column({nullable:true})
extra_line: string;

@IsOptional()
@Column({nullable:true})
extra_number: string;

@IsOptional()
@Column({nullable:true})
extra_isr_number: string;


  @IsOptional()
  @Column({nullable:true})
  extra_second_number: string;
}
