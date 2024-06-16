import { Injectable, NotFoundException } from '@nestjs/common';
import { Suscripcion } from './suscripciones.entity';
import { CrearSuscripcionDto } from './dto/crear-suscripcion.dto';

@Injectable()
export class SuscripcionesRepository {
  private suscripciones: Suscripcion[] = [];

  crear(crearSuscripcionDto: CrearSuscripcionDto): Suscripcion {
    const nuevaSuscripcion: Suscripcion = {
      id: (this.suscripciones.length + 1).toString(),
      ...crearSuscripcionDto,
      _fecha_creacion: new Date(),
    };
    this.suscripciones.push(nuevaSuscripcion);
    return nuevaSuscripcion;
  }

  buscar(): Suscripcion[] {
    return this.suscripciones;
  }

  buscarPorId(id: string): Suscripcion {
    const subscription = this.suscripciones.find(s => s.id === id);
    if (!subscription) {
      throw new NotFoundException('No se encotró la suscripción buscada');
    }
    return subscription;
  }

  eliminar(id: string): void {
    const indiceSuscripcion = this.suscripciones.findIndex(s => s.id === id);
    if (indiceSuscripcion === -1) {
      throw new NotFoundException('No se encuentró la suscripción a eliminar');
    }
    this.suscripciones.splice(indiceSuscripcion, 1);
  }
}
