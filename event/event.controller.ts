import {
  Controller,
  Get,
  HttpException,
  HttpStatus, Param,
  Post,
  UseGuards,
	Body
} from "@nestjs/common";

import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
  QueryFilterOption,
} from '@nestjsx/crud';
import { Event } from './entities/event.entity';
import { EventsesService } from './event.service';

import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
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
@Controller('events')
export class EventController implements CrudController<Event> {
  constructor(public service: EventsesService) {}
	
	@Post('createDate')
	getBycreateDate(@Body('createDate') createDate:string ){
	return this.service.getByDate(createDate)
	}

	@Post('bydate')
 async	getDatePeriod(@Body('startDate') startDate:string,@Body('endDate') endDate:string){
	const events= await this.service.getAll()
	
	const start= new Date(startDate)
	const end = new Date(endDate)
	var result = []
	
	result =  events.filter(function(event){
		var current = new Date(event['createDate'])
		if(start<= current && current<=end )
			return event
	})
		
	 return result
	}

}
										
										
