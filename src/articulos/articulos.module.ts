import { Module } from '@nestjs/common';
import { ArticulosController } from './articulos.controller';
import { ArticulosService } from './articulos.service';
import { ArticulosRepository } from './articulos.repository';

@Module({
  controllers: [ArticulosController],
  providers: [ArticulosService, ArticulosRepository]
})
export class ArticulosModule {}
