import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Country } from '../../country/country/country.entity';
import { IsInt, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @MaxLength(50)
  @IsNotEmpty()
  @Column()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @ManyToOne(() => Country, { nullable: false, cascade: ['remove'] })
  country: Country;
}
