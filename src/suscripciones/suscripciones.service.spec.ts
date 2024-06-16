import { Test, TestingModule } from '@nestjs/testing';
import { SuscripcionesService } from './suscripciones.service';
import { SuscripcionesRepository } from './suscripciones.repository';
import { Suscripcion } from './suscripciones.entity';

describe('SuscripcionesService', () => {
  let service: SuscripcionesService;
  let repository: SuscripcionesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuscripcionesService,SuscripcionesRepository],
    }).compile();

    service = module.get<SuscripcionesService>(SuscripcionesService);
    repository = module.get<SuscripcionesRepository>(SuscripcionesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('registra una suscripcion', () => {
    const miSuscripcion: Suscripcion = new Suscripcion();

    miSuscripcion.id='1',
    miSuscripcion.idUsuario='user',
    miSuscripcion.idCategoria='primera',
    miSuscripcion._fecha_creacion=new Date

    jest.spyOn(repository,'crear').mockImplementation(() => miSuscripcion)
    const nuevaSuscripcion: Suscripcion = {
      id: '2',
      idUsuario: 'user2',
      idCategoria: 'segunda',
      _fecha_creacion: new Date
    }
    
    expect(service.crear(nuevaSuscripcion)).toBeInstanceOf(Suscripcion)

  });

});
