import { Test, TestingModule } from '@nestjs/testing';
import { SuscripcionesController } from './suscripciones.controller';
import { SuscripcionesService } from './suscripciones.service';
import { SuscripcionesRepository } from './suscripciones.repository';

describe('SuscripcionesController', () => {
  let controller: SuscripcionesController;
  let service: SuscripcionesService;
  let repository: SuscripcionesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuscripcionesController],
      providers: [SuscripcionesService,SuscripcionesRepository]
    }).compile();

    controller = module.get<SuscripcionesController>(SuscripcionesController);
    service = module.get<SuscripcionesService>(SuscripcionesService);
    repository = module.get<SuscripcionesRepository>(SuscripcionesRepository);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
