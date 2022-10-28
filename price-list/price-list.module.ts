import { Module } from '@nestjs/common';
import { PriceListService } from './price-list.service';
import { PriceListController } from './price-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceList } from './entities/price-list.entity';

@Module({
  controllers: [PriceListController],
  providers: [PriceListService],
  imports: [TypeOrmModule.forFeature([PriceList])],
})
export class PriceListModule {}
