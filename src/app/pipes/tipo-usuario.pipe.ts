import { Pipe, PipeTransform } from '@angular/core';
import { TipoUsuario } from '../models/tipoUsuario.model';
import { TipoUsuarioService } from '../services/tipo-usuario.service';

@Pipe({
  name: 'tipoUsuario'
})
export class TipoUsuarioPipe implements PipeTransform {

  transform(codigo: number): string {
    let descripcion = 'Tipo de usuario no encontrado';

    const tipo = this._tipoUsuario.recuperar(codigo);

    if ( tipo != null) {
      descripcion = tipo.nombreTipoUsuario;
    }

    return descripcion;
  }
  constructor(
    private _tipoUsuario: TipoUsuarioService
  ) {
  }

}
