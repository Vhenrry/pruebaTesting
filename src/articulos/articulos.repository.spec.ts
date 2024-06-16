import {Test, TestingModule} from '@nestjs/testing'
import { ArticulosRepository } from './articulos.repository'
import { Articulo } from './articulos.entity'
import { CrearArticuloDto } from './dto/crear-articulo.dto'
import { NotFoundException } from '@nestjs/common'

describe('ArticulosRepository', () => {
  let repository: ArticulosRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        providers: [ArticulosRepository]
    }).compile()

    repository = module.get<ArticulosRepository>(ArticulosRepository)
  })

  it('Debería estar definido', () => {
    expect(repository).toBeDefined()
  })

  it('Debería registrar un artículo', () => {
    const articuloARegistrar: CrearArticuloDto = {
      titulo: 'Mi primer articulo',
      contenido: 'Las pruebas unitarias son la clave',
      categoria: 'Medicina'
    }
    const resultado =  repository.crear(articuloARegistrar)

    expect(resultado).toBeDefined()
    expect(resultado.id).toEqual('1')
    
  })
  it('Debería listar artículos', () => {
    const articuloARegistrar: CrearArticuloDto = {
      titulo: 'Mi primer articulo',
      contenido: 'Las pruebas unitarias son la clave',
      categoria: 'Medicina'
    }
    repository.crear(articuloARegistrar)
    const resultado =  repository.buscar()

    expect(resultado).toBeDefined()
    expect(Array.isArray(resultado)).toBe(true)
    expect(resultado).toHaveLength(1)

  })
  it('Debería eliminar artículos con error', () => {
    expect(() => repository.eliminar('non-existent-id')).toThrow(NotFoundException);

  })

})
