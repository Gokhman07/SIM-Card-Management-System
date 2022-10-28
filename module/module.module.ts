import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modules } from './entities/module.enitity';
import { ModuleService } from './module.service';
import { ModuleController } from './module.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Modules])],
  providers: [ModuleService],
  exports: [ModuleService],
  controllers: [ModuleController],
})
export class ModuleModule {}
