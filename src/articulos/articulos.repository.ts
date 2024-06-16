import { Injectable, NotFoundException } from '@nestjs/common'
import { Articulo } from './articulos.entity'
import { CrearArticuloDto } from './dto/crear-articulo.dto'


@Injectable()
export class ArticulosRepository {
  private articulos: Articulo[] = []

  crear(crearArticuloDto: CrearArticuloDto): Articulo {

    const nuevoArticulo: Articulo = {
      id: (this.articulos.length +1).toString(),
      ...crearArticuloDto,
      _fecha_creacion: new Date()
    }

    this.articulos.push(nuevoArticulo)
    return nuevoArticulo
  }

  buscar(): Articulo[] {
    return this.articulos
  }

  buscarPorId(id: string): Articulo {
    const articulo =  this.articulos.find(itemArticulo => itemArticulo.id === id)
    if (!articulo) {
      throw new NotFoundException('No se encontró el artículo buscado')
    }

    return articulo
  }

  actualizar(id: string, articuloActualizarDto: Partial<CrearArticuloDto>): Articulo {
    const articulo =  this.buscarPorId(id)
    Object.assign(articulo, articuloActualizarDto)
    return articulo
  }

  eliminar(id: string): void {
    const indiceArticulo = this.articulos.findIndex(articulo => articulo.id === id)
    if (indiceArticulo === -1 ){
      throw new NotFoundException('No se encontró el artículo a eliminar')
    }
    this.articulos.splice(indiceArticulo, 1)
  }

}