import {
  Controller,
  Get,
  HttpException,
  HttpStatus, 
  Post,
  UseGuards,
	Body,Param
} from "@nestjs/common";

import { SimsService } from './sims.service';
import {
  Crud,
  CrudController,
  CrudRequest,
	  CrudRequestInterceptor, 
  Override,
  ParsedBody,
  ParsedRequest,
  QueryFilterOption,
} from '@nestjsx/crud';

//import { Override, ParsedBody, ParsedRequest } from "@nestjsx/crud";
import { Sim } from './entities/sim.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Crud({
  model: {
    type: Sim,
  },
  query: {
    join: {
      company: {eager:true},
      orders: {eager:true},
      transaction: {eager:true}
    },
	  /*
     filter: (search, getMany) => {
       return search;
     },
	  */
  },
 
})
@Controller('sims')
export class SimsController implements CrudController<Sim> {
  constructor(public service: SimsService) {}
	  get base() {
    return this as CrudController<Sim>;
  }

	
 
  @Post('getsim')
   getsim( @ParsedRequest() req: CrudRequest, @Body('id') id:number) {
  return  this.service.findItem(id);
  }

 
  @Post('getbycompany')
   getbycompany( @ParsedRequest() req: CrudRequest, @Body('companyId') companyId:number) {
 return  this.service.findByCompany(companyId);
  }
  @Post('getbycode')
   getbycode( @ParsedRequest() req: CrudRequest, @Body('code') code:string) {
 return  this.service.findByCode(code);
  }

 @Post('getbynumber')
   getbynumber( @ParsedRequest() req: CrudRequest, @Body('number') number:string) {
 return  this.service.findByNumber(number);
  }

@Post('getbyisrnumber')
   getbyisrnumber( @ParsedRequest() req: CrudRequest, @Body('isr_number') isr_number:string) {
 return  this.service.findByIsrNumber(isr_number);
  }

}
