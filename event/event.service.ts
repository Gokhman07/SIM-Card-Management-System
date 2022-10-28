import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Event } from './entities/event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OperationType } from 'src/transactions/entities/operation.type';
import { Repository } from 'typeorm';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
  QueryFilterOption,
} from '@nestjsx/crud';
@Crud({
  model: {
    type: Event,
  },
  query: {
    join: {
      user: {eager:true},
	  module:{eager:true},
    
    },
     filter: (search, getMany) => {
       return search;
     },
  },
})
@Injectable()
export class EventsesService extends TypeOrmCrudService<Event> {

  constructor(@InjectRepository(Event) repo) {
    super(repo);
  }

	async  getByDate (createDate: string){
		const events: Event[] = await this.repo.find({where:{createDate},relations:['user']})
		return events
	}
    

	async  getAll (){
		const events= await this.repo.find({relations:['user']})
		return events
	}
	
}
