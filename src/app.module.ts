import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticulosModule } from './articulos/articulos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { SuscripcionesModule } from './suscripciones/suscripciones.module';
import { NotificacionesModule } from './notificaciones/notificaciones.module';
import { BorradoresModule } from './borradores/borradores.module';

@Module({
  imports: [ArticulosModule, CategoriasModule, SuscripcionesModule, NotificacionesModule, BorradoresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
