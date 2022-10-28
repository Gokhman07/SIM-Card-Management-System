import { Module } from '@nestjs/common';
import { EventsesService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';

@Module({
  controllers: [EventController],
  providers: [EventsesService],
  imports: [TypeOrmModule.forFeature([Event])],
  exports: [EventsesService],
})
export class EventModule {}
