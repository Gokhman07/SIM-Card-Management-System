import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Country } from './country/country.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CountryService extends TypeOrmCrudService<Country> {
  constructor(@InjectRepository(Country) repo) {
    super(repo);
  }
}
