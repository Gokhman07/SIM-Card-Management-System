import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Client } from './entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OperationType } from 'src/transactions/entities/operation.type';

@Injectable()
export class ClientService extends TypeOrmCrudService<Client> {
  constructor(@InjectRepository(Client) repo) {
    super(repo);
  }

  async topUpBalance(clientId: number, amount: number) {
    const client = await this.repo.findOne(clientId);
    client.balance = +client.balance + +amount;
    return await this.repo.save(client);
  }

  async reduceBalance(clientId: number, amount: number) {
    const client = await this.repo.findOne(clientId);
    client.balance -= amount;
    return await this.repo.save(client);
  }

  async updateBalance(clientId: number, oldAmount: number, newAmount: number) {
    const client = await this.repo.findOne(clientId);
    client.balance = client.balance + oldAmount - newAmount;
    return await this.repo.save(client);
  }

	async getallClients(){
		const clients=await this.repo.find();
		return clients
	}
}
