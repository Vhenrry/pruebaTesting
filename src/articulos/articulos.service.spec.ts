import { Test, TestingModule } from '@nestjs/testing';
import { ArticulosService } from './articulos.service';
import { CrearArticuloDto } from './dto/crear-articulo.dto';
import { Articulo } from './articulos.entity';
import { ArticulosRepository } from './articulos.repository';

describe('ArticulosService', () => {
  let service: ArticulosService;
  let repository: ArticulosRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticulosService,ArticulosRepository],
    }).compile();

    service = module.get<ArticulosService>(ArticulosService);
    repository = module.get<ArticulosRepository>(ArticulosRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('deberia crear un articulo', () => {
    const miArticulo: Articulo = new Articulo()
    miArticulo.id= '1',
    miArticulo.titulo= 'Mi primer articulo',
    miArticulo.contenido= 'Las pruebas unitarias son la clave',
    miArticulo.categoria= 'Medicina'
    jest.spyOn(repository, 'crear').mockImplementation(() => miArticulo)
    const nuevoArticulo: CrearArticuloDto = {
      titulo: 'Mi primer articulo',
      contenido: 'Las pruebas unitarias son la clave',
      categoria: 'Medicina'
    }
    const respuesta = service.crear(nuevoArticulo)
    expect(respuesta).toBeInstanceOf(Articulo)
  })

  it('deberia modificar un articulo', () => {
    const miArticulo: Articulo = new Articulo()
    
    miArticulo.id= '1',
    miArticulo.titulo= 'Mi primer articulo',
    miArticulo.contenido= 'Las pruebas unitarias son la clave',
    miArticulo.categoria= 'Medicina'

    
    jest.spyOn(repository, 'actualizar').mockImplementation(() => miArticulo)
    const nuevoArticulo: Partial<CrearArticuloDto> = {
      titulo: 'Mi primer articulo modificado',
    }
    const resultado = service.modificar('1', nuevoArticulo)
    expect(resultado).toBeInstanceOf(Articulo)
  })

  it('deberia devolver todos los articulos registrados', async () => {
    const findAllSpy = jest.spyOn(repository, 'buscar');
    await service.buscarTodo();
    expect(findAllSpy).toHaveBeenCalledTimes(1);
  });

  it('should create a new articulo', async () => {
    const articulo = new Articulo();
    const result = await service.crear(articulo);
    expect(result).toEqual(expect.objectContaining(articulo));
  });

  it('should find all articulos', async () => {
    const result = await service.buscarTodo();
    expect(result).toBeInstanceOf(Array);
  });

});
