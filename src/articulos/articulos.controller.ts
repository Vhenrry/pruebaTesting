import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ArticulosService } from './articulos.service';
import { CrearArticuloDto } from './dto/crear-articulo.dto';
import { Articulo } from './articulos.entity';

@Controller('articulos')
export class ArticulosController {
  constructor(private readonly articulosService: ArticulosService){}

  @Post()
  crearArticulo(@Body() crearArticuloDto: CrearArticuloDto): Articulo {
    return this.articulosService.crear(crearArticuloDto)
  }

  @Get()
  buscarArticulos(): Articulo[] {
    return this.articulosService.buscarTodo()
  }

  @Put(':id')
  modificarArticulo(@Param('id') id: string, @Body() actualizarArticuloDto: Partial<CrearArticuloDto>): Articulo {
    return this.articulosService.modificar(id, actualizarArticuloDto)
  }
  @Delete(':id')
  eliminarArticulo(@Param('id') id: string): void {
    return this.articulosService.eliminar(id)
  }

}
