import { SimTransactionModule } from './sim-transaction/sim-transaction.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from './clients/clients.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SimsModule } from './sims/sims.module';
import { OrdersModule } from './orders/orders.module';
import { CountryModule } from './country/country.module';
import { CompanyModule } from './company/company.module';
import { ToDoListModule } from './todolist/todolist.module';
import { ExpenseModule } from './expense/expense.module';
import {ModuleModule } from './module/module.module';

import {EventModule } from './event/event.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PriceListModule } from './price-list/price-list.module';
import { TransactionsModule } from './transactions/transactions.module';
import { CityModule } from './city/city.module';
import { ScheduleModule } from '@nestjs/schedule';

const username = process.env.POSTGRES_USER || 'sim_admin';
const password = process.env.POSTGRES_PASSWORD || 'CBV_GFHJKM111!!!';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username,
      password,
      database: 'sim_main',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      dropSchema: false,
      logging: true
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'sim'),
    }),
    ClientsModule,
    AuthModule,
    UsersModule,
    SimsModule,
    OrdersModule,
    CountryModule,
    CompanyModule,
    PriceListModule,
    TransactionsModule,
    SimTransactionModule,
	  ToDoListModule,
	EventModule,
    CityModule,
	  ExpenseModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
