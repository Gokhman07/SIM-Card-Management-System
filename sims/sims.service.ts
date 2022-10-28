import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Sim } from './entities/sim.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SimsService extends TypeOrmCrudService<Sim> {
  constructor(@InjectRepository(Sim) repo) {
    super(repo);
  }
	async updateChargeDate(id: number, newDate: Date) {
    const item = await this.repo.findOne(id);
    item.chargeDate = newDate;
    return await this.repo.save(item);
  }
	async updateChargeDays(id: number, newDays: number) {
    const item = await this.repo.findOne(id);
    item.chargeDays = newDays;
    return await this.repo.save(item);
  }


  async changeSimAvailability(id: number, active: boolean): Promise<Sim> {
    const item = await this.repo.findOne(id);
    item.active = active;
    await this.repo.save(item);
    return item;
  }

async findItem(id: number) {
	const sim  = await this.repo.findOne({where:{id:id},relations:['company']})
	  return sim
  }

async findByCompany(company: number) {
	const sim  = await this.repo.find({where:{company},relations:['company']})
	  return sim
  }
async findByCode(code: string) {
	const sim  = await this.repo.find({where:{code},relations:['company']})
	  return sim
  }
async findByNumber(number: string) {
	const sim  = await this.repo.find({where:{number},relations:['company']})
	  return sim
  }
async findByIsrNumber(isr_number: string) {
	const sim  = await this.repo.find({where:{isr_number},relations:['company']})
	  return sim
  }
   async changeSimStatus(id: number, active: boolean) {
    const item = await this.repo.findOne(id);
    item.active = active;
    await this.repo.save(item);
    return item;
  }

     
}
