import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BorradoresService } from './borradores.service';
import { CrearBorradorDto } from './dto/crear-borrador.dto';
import { Borrador } from './borradores.entity';

@Controller('borradores')
export class BorradoresController {
  constructor(private readonly borradoresService: BorradoresService) { }

  @Post()
  crearBorrador(@Body() crearBorradorDto: CrearBorradorDto): Borrador {
    return this.borradoresService.crear(crearBorradorDto);
  }

  @Get()
  buscarBorrador(): Borrador[] {
    return this.borradoresService.buscarTodo();
  }

  @Get(':id')
  buscarBorradorPorId(@Param('id') id: string): Borrador {
    return this.borradoresService.buscarPorId(id);
  }

  @Put(':id')
  modificarBorrador(@Param('id') id: string, @Body() actualizarBorradorDto: Partial<CrearBorradorDto>): Borrador {
    return this.borradoresService.modificar(id, actualizarBorradorDto);
  }

  @Delete(':id')
  eliminarBorrador(@Param('id') id: string): void {
    this.borradoresService.eliminar(id);
  }
}
