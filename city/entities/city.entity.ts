import { MaxLength, IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @MaxLength(50)
  @IsNotEmpty()
  @Column()
  name: string;

}
