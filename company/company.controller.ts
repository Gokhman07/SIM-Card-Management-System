import { Controller, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { Company } from './entities/company.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Crud({
  model: {
    type: Company,
  },
  query: {
    alwaysPaginate: true,
    join: {
      country: {},
    },
  },
})
@Controller('company')
export class CompanyController implements CrudController<Company> {
  constructor(public service: CompanyService) {}
}
