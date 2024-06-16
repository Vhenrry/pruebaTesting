import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SuscripcionesService } from './suscripciones.service';
import { Suscripcion } from './suscripciones.entity';
import { CrearSuscripcionDto } from './dto/crear-suscripcion.dto';

@Controller('suscripciones')
export class SuscripcionesController {
  constructor(private readonly suscripcionesService: SuscripcionesService) { }

  @Post()
  crearSuscripcion(@Body() crearSuscripcionDto: CrearSuscripcionDto): Suscripcion {
    return this.suscripcionesService.crear(crearSuscripcionDto);
  }

  @Get()
  buscarSuscricpion(): Suscripcion[] {
    return this.suscripcionesService.buscarTodo();
  }

  @Get(':id')
  buscarSuscripcionPorId(@Param('id') id: string): Suscripcion {
    return this.suscripcionesService.buscarPorId(id);
  }

  @Delete(':id')
  eliminarSuscripcion(@Param('id') id: string): void {
    this.suscripcionesService.eliminar(id);
  }
}
