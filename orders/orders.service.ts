import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Orders } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStatus } from './entities/order.status';
import * as moment from 'moment';
import { Sim } from '../sims/entities/sim.entity';
import { Cron } from "@nestjs/schedule";
import { FindOneOptions } from "typeorm";

@Injectable()
export class OrdersService extends TypeOrmCrudService<Orders> {
  constructor(@InjectRepository(Orders) repo) {
    super(repo);
  //  this.checkOrders();
  }
/*
  @Cron(`* * 1 * * *`)
  async checkOrders() {
    const created = await this.repo.find({
      relations: ['item'],
      where: { status: OrderStatus.CREATED },
    });
    const inProgress = await this.repo.find({
      relations: ['item'],
      where: { status: OrderStatus.IN_PROGRESS },
    });

    const now = moment(new Date());

    const isWaitForConfirm = (order: Orders) => now.isAfter(moment(order.returnDate));
    const isInProgress = (order: Orders) =>
      now.isBetween(moment(order.startRental), moment(order.returnDate));

    const makeWaitForConfirm = (order: Orders) => ({
      ...order,
      item: { ...(order.item as Sim), active: false },
      status: OrderStatus.WAIT_FOR_CONFIRM,
    });
    const makeInProgress = (order: Orders) => ({
      ...order,
      item: { ...(order.item as Sim), active: false },
      status: OrderStatus.IN_PROGRESS,
    });
    await this.repo.save(inProgress.filter(isWaitForConfirm).map(makeWaitForConfirm));
    await this.repo.save(created.filter(isInProgress).map(makeInProgress));
  }
  */
findItem(id: number) {
    return this.repo.find({where:{id},relations:['client','item']})
  }

findSim(id: number) {
    return this.repo.find({where:{item:id, status:1},relations:['client','item']})
  }

  async updateStatus(id: number, status:number) {
    const order = await this.repo.findOne({where:{id},relations:['client','item']});
    order.status = status;
    return await this.repo.save(order);
  }

  async deleteOrder(id: number) {
     await this.repo.delete(id);
    
    return id
  }

  async saveOrder(ord: Orders) {
     await this.repo.delete(ord['id']);
     await this.repo.save(ord);

    return ord
  }

async findAllItems(){
const orders = await this.repo.find({relations:['client','item']})
return orders
}
}
