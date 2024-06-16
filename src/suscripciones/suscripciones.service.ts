import { Injectable } from '@nestjs/common';
import { SuscripcionesRepository } from './suscripciones.repository';
import { Suscripcion } from './suscripciones.entity';
import { CrearSuscripcionDto } from './dto/crear-suscripcion.dto';

@Injectable()
export class SuscripcionesService {
  constructor(private readonly suscripcionesRepository: SuscripcionesRepository) { }

  crear(crearSuscripcionDto: CrearSuscripcionDto): Suscripcion {
    return this.suscripcionesRepository.crear(crearSuscripcionDto);
  }

  buscarTodo(): Suscripcion[] {
    return this.suscripcionesRepository.buscar();
  }

  buscarPorId(id: string): Suscripcion {
    return this.suscripcionesRepository.buscarPorId(id);
  }

  eliminar(id: string): void {
    this.suscripcionesRepository.eliminar(id);
  }
}
