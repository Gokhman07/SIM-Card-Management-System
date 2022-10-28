import { Client } from './entities/client.entity';
import { Controller, UseGuards,UseInterceptors,Body } from '@nestjs/common';
import { ClientService } from './client.service';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, CrudRequest, CrudRequestInterceptor, Override, ParsedBody, ParsedRequest } from "@nestjsx/crud";

import {Get,Post} from "@nestjs/common"
@UseGuards(AuthGuard('jwt'))
@Crud({
  model: {
    type: Client,
  },
  query: {
    join: {
      company: {},
      orders: {},
      transactions: {}
    },
  },
  routes: {
    only: [
      'getOneBase',
      'getManyBase',
      'createOneBase',
      'deleteOneBase',
      'replaceOneBase',
    ],
  },
})
@Controller('clients')
export class ClientController implements CrudController<Client> {
  constructor(public service: ClientService) {}
	
	get base(){
		return this as  CrudController<Client>
	}
	
	
@UseInterceptors(CrudRequestInterceptor)
@Post(`getclient`)
async getbyname(@ParsedRequest() req: CrudRequest, @Body('title') title:string, @Body('lead') lead:boolean, @Body('debtors') debtors:boolean, @Body('startDate')startDate:string,@Body('startDate')endDate:string){
	
			var objs= await this.service.getallClients()
		var result=[]
		if(title!=null)
		objs=objs.filter(
		function(obj){
			if (((obj['name']+' '+obj['surname']).toLowerCase()).includes(title.toLowerCase()) ||((obj['surname']+' '+obj['name']).toLowerCase()).includes(title.toLowerCase()))
				return obj
	
		}
		);
	
	
	
	if(lead!=null)
		objs=objs.filter(
		function(obj){
			if (obj['lead']==lead)
				return obj
	
		}
		);
	
	if(debtors==true)
		objs=objs.filter(
		function(obj){
			if (obj['balance']<1)
				return obj
	
		}
		);
	
	if(startDate!=null && endDate!=null ){
		const start= new Date(startDate)
		const end= new Date(endDate)
		objs=objs.filter(
		 function(obj){
		 	if(start<=new Date(obj['createDate'])&& new Date(obj['createDate'])<=end)
		  		return obj
		 }
		);
		 }
	return objs
				
				}
			


@UseInterceptors(CrudRequestInterceptor)
@Post(`getclientbyname`)
async getclientbyname(@ParsedRequest() req: CrudRequest, @Body('title') title:string){
	
			var objs= await this.service.getallClients()
		var result=[]
		
		objs=objs.filter(
		function(obj){
			if (((obj['name']+' '+obj['surname']).toLowerCase()).includes(title.toLowerCase()) ||((obj['surname']+' '+obj['name']).toLowerCase()).includes(title.toLowerCase()))
				return obj
	
		})
		
	
	
	

	return objs
				
					
					
}
	}
