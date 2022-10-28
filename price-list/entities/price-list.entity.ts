import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class PriceList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  // @IsNotEmpty()
  // @ManyToOne(() => PriceItem, { eager: true, cascade: true })
  // prices: PriceItem[];

  @Column('text')
  prices: string;
}
