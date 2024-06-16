import { Module } from '@nestjs/common';
import { BorradoresController } from './borradores.controller';
import { BorradoresService } from './borradores.service';
import { BorradoresRepository } from './borradores.repository';

@Module({
  controllers: [BorradoresController],
  providers: [BorradoresService, BorradoresRepository]
})
export class BorradoresModule {}
