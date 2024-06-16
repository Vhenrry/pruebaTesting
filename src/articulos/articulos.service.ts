import { Injectable } from '@nestjs/common';
import { ArticulosRepository } from './articulos.repository';
import { CrearArticuloDto } from './dto/crear-articulo.dto';
import { Articulo } from './articulos.entity';

@Injectable()
export class ArticulosService {
  constructor(private readonly articulosRepository: ArticulosRepository) {}

  crear(crearArticuloDto: CrearArticuloDto ): Articulo {
    return this.articulosRepository.crear(crearArticuloDto)
  }

  buscarTodo(): Articulo[] {
    return this.articulosRepository.buscar()
  }

  buscarPorId(id: string): Articulo {
    return this.articulosRepository.buscarPorId(id)
  }

  modificar(id: string, articuloActualizarDto:Partial<CrearArticuloDto>): Articulo {
    return this.articulosRepository.actualizar(id, articuloActualizarDto)
  }

  eliminar(id: string): void {
    this.articulosRepository.eliminar(id)
  }

}
