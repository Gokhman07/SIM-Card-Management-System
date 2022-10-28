import { Crud, CrudController } from '@nestjsx/crud';
import { Modules } from './entities/module.enitity';
import { Controller, UseGuards } from '@nestjs/common';
import { ModuleService } from './module.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Crud({
  model: {
    type: Modules,
  },
  query: {
    join: {
    
    },
  },
  routes: {
    only: [
      'getOneBase',
      'getManyBase',
      'createOneBase',
      'deleteOneBase',
      'replaceOneBase',
    ],
  },
})
@Controller('modules')
export class ModuleController implements CrudController<Modules> {
  constructor(public service: ModuleService) {}
}
