import { Module } from '@nestjs/common';
import { SimsService } from './sims.service';
import { SimsController } from './sims.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sim } from './entities/sim.entity';

@Module({
  controllers: [SimsController],
  providers: [SimsService],
  imports: [TypeOrmModule.forFeature([Sim])],
  exports: [SimsService],
})
export class SimsModule {}
