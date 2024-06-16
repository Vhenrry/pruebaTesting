import { Module } from '@nestjs/common';
import { SuscripcionesController } from './suscripciones.controller';
import { SuscripcionesService } from './suscripciones.service';
import { SuscripcionesRepository } from './suscripciones.repository';

@Module({
  controllers: [SuscripcionesController],
  providers: [SuscripcionesService, SuscripcionesRepository]
})
export class SuscripcionesModule {}
