import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './entities/order.entity';
import { SimsModule } from "../sims/sims.module";
import { ClientsModule } from 'src/clients/clients.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [TypeOrmModule.forFeature([Orders]), SimsModule, ClientsModule],
})
export class OrdersModule {}
