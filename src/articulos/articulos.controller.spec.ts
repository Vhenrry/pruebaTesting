import { Test, TestingModule } from '@nestjs/testing';
import { ArticulosController } from './articulos.controller';
import { ArticulosService } from './articulos.service';
import { ArticulosRepository } from './articulos.repository';
import { Articulo } from './articulos.entity';
import { CrearArticuloDto } from './dto/crear-articulo.dto';

describe('ArticulosController', () => {
  let controller: ArticulosController;
  let service: ArticulosService
  let repository: ArticulosRepository

  const articuloRespuesta =  new Articulo()

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticulosController],
      providers: [ArticulosService, ArticulosRepository]
    }).compile();

    controller = module.get<ArticulosController>(ArticulosController);
    service = module.get<ArticulosService>(ArticulosService);
    repository = module.get<ArticulosRepository>(ArticulosRepository);



    articuloRespuesta.id =  '1',
    articuloRespuesta.titulo =  'Mi primer articulo',
    articuloRespuesta.contenido =  'Las pruebas unitarias son la clave',
    articuloRespuesta.categoria =  'Medicina',
    articuloRespuesta._fecha_creacion =  new Date()
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Debería crear artículo', () => {
    const articuloRegistrar: CrearArticuloDto = {
      titulo: 'Mi primer articulo',
      contenido: 'Las pruebas unitarias son la clave',
      categoria: 'Medicina'
    }
    jest.spyOn(service, 'crear').mockImplementation(() => articuloRespuesta)
    expect(controller.crearArticulo(articuloRegistrar)).toBeInstanceOf(Articulo)
  })
});
