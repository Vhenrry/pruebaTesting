import { Injectable, NotFoundException } from '@nestjs/common';
import { Borrador } from './borradores.entity';
import { CrearBorradorDto } from './dto/crear-borrador.dto';

@Injectable()
export class BorradoresRepository {
  private borradores: Borrador[] = [];

  crear(crearBorradorDto: CrearBorradorDto): Borrador {
    const nuevoBorrador: Borrador = {
      id: (this.borradores.length + 1).toString(),
      ...crearBorradorDto,
      _fecha_creacion: new Date(),
      _fecha_modificacion: new Date(),
    };
    this.borradores.push(nuevoBorrador);
    return nuevoBorrador;
  }

  buscar(): Borrador[] {
    return this.borradores;
  }

  buscarPorId(id: string): Borrador {
    const borrador = this.borradores.find(d => d.id === id);
    if (!borrador) {
      throw new NotFoundException('No se encontró el borrador buscado');
    }
    return borrador;
  }

  actualizar(id: string, actualizarBorradorDto: Partial<CrearBorradorDto>): Borrador {
    const borrador = this.buscarPorId(id);
    Object.assign(borrador, actualizarBorradorDto, { _fecha_modificacion: new Date() });
    return borrador;
  }

  eliminar(id: string): void {
    const indiceBorrador = this.borradores.findIndex(d => d.id === id);
    if (indiceBorrador === -1) {
      throw new NotFoundException('No se encontró el borrador a eliminar');
    }
    this.borradores.splice(indiceBorrador, 1);
  }
}
