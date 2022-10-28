import { SimTransactionController } from './sim-transaction.controller';
import { Module } from '@nestjs/common';
import { SimTransaction } from 'src/sim-transaction/entities/sim-transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SimTransactionsService } from 'src/sim-transaction/sim-transaction.service';
import { SimsModule } from 'src/sims/sims.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([SimTransaction]),
        SimsModule
    ],
    controllers: [
        SimTransactionController
    ],
    providers: [
        SimTransactionsService
    ],
    exports: [
        SimTransactionsService
    ]
})
export class SimTransactionModule { }
