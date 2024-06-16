import { Injectable } from '@nestjs/common';
import { BorradoresRepository } from './borradores.repository';
import { CrearBorradorDto } from './dto/crear-borrador.dto';
import { Borrador } from './borradores.entity';

@Injectable()
export class BorradoresService {
  constructor(private readonly borradoresRepository: BorradoresRepository) { }

  crear(crearBorradorDto: CrearBorradorDto): Borrador {
    return this.borradoresRepository.crear(crearBorradorDto);
  }

  buscarTodo(): Borrador[] {
    return this.borradoresRepository.buscar();
  }

  buscarPorId(id: string): Borrador {
    return this.borradoresRepository.buscarPorId(id);
  }

  modificar(id: string, updateDraftDto: Partial<CrearBorradorDto>): Borrador {
    return this.borradoresRepository.actualizar(id, updateDraftDto);
  }

  eliminar(id: string): void {
    return this.borradoresRepository.eliminar(id);
  }
}
