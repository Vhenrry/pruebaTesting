import {Test, TestingModule} from '@nestjs/testing'
import { NotFoundException } from '@nestjs/common'
import { BorradoresRepository } from './borradores.repository'
import { CrearBorradorDto } from './dto/crear-borrador.dto'

describe('ArticulosRepository', () => {
  let repository: BorradoresRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        providers: [BorradoresRepository]
    }).compile()

    repository = module.get<BorradoresRepository>(BorradoresRepository)
  })

  it('Repository Debería registrar un artículo', () => {
    const borradorARegistrar: CrearBorradorDto = {
      titulo: 'Mi primer articulo',
      categoria: 'tech'
    }
    const resultado =  repository.crear(borradorARegistrar)

    expect(resultado).toBeDefined()
    expect(resultado.id).toEqual('1')
    expect(resultado._fecha_creacion).toEqual(resultado._fecha_modificacion)
  })
  
  it('Repository Debería listar articulos', () => {
    const resultado = repository.buscar()
    expect(resultado).toBeDefined()
    expect(Array.isArray(resultado)).toBe(true)
  })

  it('Repository Debería registrar un artículo', () => {
    const borradorARegistrar: CrearBorradorDto = {
      titulo: 'Mi primer articulo',
      categoria: 'tech'
    }
    const articulo =  repository.crear(borradorARegistrar)
    const resultado = repository.buscarPorId(articulo.id)
    expect(resultado).toBeDefined()
    expect(resultado).toBe(articulo)
    expect(resultado._fecha_creacion).toEqual(articulo._fecha_creacion)
  })
  
  it('Repository Debería modificar un artículo', () => {
    const borradorARegistrar: CrearBorradorDto = {
      titulo: 'Mi primer articulo',
      categoria: 'tech '
    }
    const articulo =  repository.crear(borradorARegistrar)
    const resultado = repository.buscarPorId(articulo.id)
    
    resultado.titulo = 'modificacion';
    const actulizando = repository.actualizar(resultado.id, resultado)
    expect(actulizando).toBeDefined();
    expect(actulizando).toBe(resultado);
  })

  it('Repository Debería eliminar un artículo', () => {
    const borradorARegistrar: CrearBorradorDto = {
      titulo: 'Mi primer articulo',
      categoria: 'Medicina '
    }
    const articulo =  repository.crear(borradorARegistrar)
    expect(() => repository.eliminar(articulo.id)).not.toThrow();
    expect(() => repository.eliminar(articulo.id)).toThrow(NotFoundException);
  })

  it('Repository Debería eliminar un borrador y al intentar nuevamente deberia salir un throw', () => {
    const borradorARegistrar: CrearBorradorDto = {
      titulo: 'Mi primer articulo',
      categoria: 'Medicina '
    }
    const articulo =  repository.crear(borradorARegistrar)
    expect(() => repository.eliminar(articulo.id)).not.toThrow();
    expect(() => repository.eliminar(articulo.id)).toThrow(NotFoundException);
  })
  
})
