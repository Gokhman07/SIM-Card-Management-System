import { Controller, HttpException, HttpStatus, Param, Post, UseGuards, UseInterceptors , Body,Delete,Get} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { AuthGuard } from "@nestjs/passport";
import { Crud, CrudController, CrudRequest, CrudRequestInterceptor, Override, ParsedBody, ParsedRequest } from "@nestjsx/crud";
import { Orders } from "./entities/order.entity";
import { SimsService } from "src/sims/sims.service";
import { OrderStatus } from "./entities/order.status";
import { plainToClass } from "class-transformer";
import { User } from "../users/entities/user.entity";
import { Client } from "../clients/entities/client.entity";
import { PriceList } from "../price-list/entities/price-list.entity";
import { Sim } from "../sims/entities/sim.entity";
import { validate } from "class-validator";
import { ClientService } from "src/clients/client.service";
import { UsersService } from "src/users/users.service";

@UseGuards(AuthGuard('jwt'))
@Crud({
  model: {
    type: Orders,
  },
	
  query: {
    join: {
      client: {eager: true,},
      creator: { eager: true,},
      item: { eager: true,},
		company: { eager: true,},	
		pricelist: { eager: true,},
   
    },
  },

})
@Controller('orders')
export class OrdersController implements CrudController<Orders> {
  constructor(
    public service: OrdersService,
    public simService: SimsService,
    public clientService: ClientService
  ) {}

  get base() {
    return this as CrudController<Orders>;
  }

  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: Orders,
  ): Promise<Orders> {
   // dto.status = OrderStatus.DRAFT;
	//dto.client.id=parseInt(dto.client.id)
    const result = await this.base.createOneBase(req, dto);

if(dto.status)
    await this.clientService.reduceBalance((dto.client as number ), parseInt(dto.price.toString())+ parseInt(dto.extra_price.toString()))
   // 
     //const user = await this.clientService.
     //await this.service.checkOrders();
    return result;
  }

  @Override()
  async updateOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: Orders) {
    const originalOrder = await this.service.findOne(dto.id);
   // await this.clientService.updateBalance((dto.client['id']), originalOrder.price, dto.price);
    const result = await this.base.updateOneBase(req, dto);
   // if (result.status !== OrderStatus.DRAFT) {
     // await this.service.checkOrders();
    //}
    return result;
  }

 
  @UseInterceptors(CrudRequestInterceptor)
  @Post(`publish`)
  async publish(@ParsedRequest() req: CrudRequest, @Body('id') id:number) {
    const obj = await this.service.findItem(id);

	
	await this.clientService.reduceBalance((obj[0].client['id'] ), obj[0].price+obj[0].extra_price);  
	
	await  this.simService.changeSimStatus((obj[0].item['id'] ), false);    
	
	
	 await this.service.updateStatus(obj[0].id,1)
	 const obj2 = await this.service.findItem(id);
	  
	 return obj2
	  
  //  const entity = plainToClass(User, obj2[0], { groups: ['publish'] });
  //  const errors = await validate(entity);
    //console.log(entity);
    
 
 
	  
  
	
  }

 
// @UseInterceptors(CrudRequestInterceptor)
  @Post(`republish`)
   async updateOne2(@ParsedRequest() req: CrudRequest, @Body('id') id: number, @Body('old_price') old_price: number,) {
  const obj = await this.service.findItem(id);

	  
	await this.clientService.topUpBalance((obj[0].client['id'] ), old_price);  
	await this.clientService.reduceBalance((obj[0].client['id'] ), obj[0].price+obj[0].extra_price);  
	//await  this.simService.changeSimStatus((obj[0].item['id'] ), false);    
	
	
	 await this.service.updateStatus(obj[0].id,1)
	 const obj2 = await this.service.findItem(id);
	  
	 return obj2
	
  }
 // @UseInterceptors(CrudRequestInterceptor)
  @Post(`changeorder`)
   async updateOne3(@ParsedRequest() req: CrudRequest, @Body () dto: Orders) {
 const obj = await this.service.findItem(dto['id']);


	 if(obj[0]['status'] ==1 && dto['status']==1){
	await this.clientService.topUpBalance(obj[0].client['id'] ,obj[0].price+obj[0].extra_price);  
	await this.clientService.reduceBalance((obj[0].client['id'] ), parseInt(dto['price'].toString())+ parseInt(dto['extra_price'].toString()));  
		
	 }
	
 if(obj[0]['status'] ==1 && dto['status']==0){
	await this.clientService.topUpBalance(obj[0].client['id'] ,obj[0].price+obj[0].extra_price);    	
	 }
	
 if(obj[0]['status'] ==0 && dto['status']==1){
	await this.clientService.reduceBalance((obj[0].client['id'] ), parseInt(dto['price'].toString())+ parseInt(dto['extra_price'].toString()));  
	}

	

    
	  const obj2 = await this.service.findItem(dto['id']);
	   
	  Object.assign(obj2[0], dto)
	    await this.service.saveOrder(obj2[0])  
	
	 return obj2
	
  }


  @UseInterceptors(CrudRequestInterceptor)
  @Post(`depublish`)
  async depublish(@ParsedRequest() req: CrudRequest, @Body('id') id:number) {
    const obj = await this.service.findItem(id);
	  
	await this.clientService.topUpBalance((obj[0].client['id'] ), obj[0].price+obj[0].extra_price);  
	
	await  this.simService.changeSimStatus((obj[0].item['id'] ), true)






;    
	
	
	// await this.service.updateStatus(obj[0].id,status)
	 const obj2 = await this.service.findItem(id);
	   await this.service.updateStatus(obj2[0].id, 0)  
 
	  

 
	  return obj2
  
	
  }
   @UseInterceptors(CrudRequestInterceptor)
  @Post(`delete`)
  async depublishdel(@ParsedRequest() req: CrudRequest, @Body('id') id:number) {
   const obj = await this.service.findItem(id);
	  
	 // return obj
	 
	  if (obj[0].status==1)
	await this.clientService.topUpBalance((obj[0].client['id'] ), obj[0].price+obj[0].extra_price);  

	await  this.simService.changeSimStatus((obj[0].item['id'] ), true);  
	
	
	// await this.service.updateStatus(obj[0].id,status)
	// const obj2 = await this.service.findItem((id));
	  return await this.service.deleteOrder(id)  
	 
  }
    @UseInterceptors(CrudRequestInterceptor)
  @Post(`getclients`)
  async getclients(@ParsedRequest() req: CrudRequest, @Body('id') id:number) {
   const objs = await this.service.findSim(id);
	  
	const ids = []
	let result=objs.map(function(obj) {
		if(!ids.includes(obj.client['id'])){
			ids.push(obj.client['id'])
  return obj.client;
		}
});
	  
	  result=result.filter(x => x!=null)
	

	  return result
 

}
/*
   @UseInterceptors(CrudRequestInterceptor)
  @Post(`getorderbysimcode`)
  async getclients(@ParsedRequest() req: CrudRequest, @Body('id') id:number) {
   const objs = await this.service.findSim(id);
	  
	const ids = []
	let result=objs.map(function(obj) {
		if(!ids.includes(obj.client['id'])){
			ids.push(obj.client['id'])
  return obj.client;
		}
});
	  
	  result=result.filter(x => x!=null)
	

	  return result
 

}
*/
    

    @UseInterceptors(CrudRequestInterceptor)
  @Get(`getnoreturn`)
  async getnoreturn(@ParsedRequest() req: CrudRequest) {
   const objs = await this.service.findAllItems();
	  
	const orders = []
	let result=objs.filter(function(obj) {
		if(obj['earphones_back']==0 || obj['device_back']==0 || obj['headset_back']==0){
			
  return obj;
		}
	
});
	  
	 // result=result.filter(x => x!=null)
	

	  return result
 

}

@UseInterceptors(CrudRequestInterceptor)
  @Post(`getnoreturnfilter`)
  async getnoreturnfilter(@ParsedRequest() req: CrudRequest, @Body ('earphones') earphones: boolean,@Body ('device') device: boolean,
	  @Body ('headset') headset: boolean) {
   const objs = await this.service.findAllItems();
	  
	let result = []

if(earphones==true)
	result=objs.filter(function(obj) {
		if(obj['earphones_back']==0){
			
  return obj;
		}
	
});
	  
	 if(device==true)
	result=objs.filter(function(obj) {
		if(obj['device_back']==0){
			
  return obj;
		}
	
});
	  
	  	 if(headset==true)
	result=objs.filter(function(obj) {
		if(obj['headset_back']==0){
			
  return obj;
		}
	
});
	  
	 // result=result.filter(x => x!=null)
	

	  return result
 

}

  @Get(`getallreturned`)
  async getallreturned(@ParsedRequest() req: CrudRequest) {
   const objs = await this.service.findAllItems();
	  
	const orders = []
	let result=objs.filter(function(obj) {
	if(obj['status']==1)
	if(obj['earphones']==1 || obj['device']==1 || obj['headset']==1  ){
		if((obj['earphones_back']==1 || obj['earphones_back']==2)&& (obj['device_back']==1  || obj['device_back']==2) && (obj['headset_back']==1 ||obj['headset_back']==2)){
			
  return obj;
		}
		}
	
});
	  
	 // result=result.filter(x => x!=null)
	

	  return result
 

}


}