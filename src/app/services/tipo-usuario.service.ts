import { Injectable } from '@angular/core';
import { TipoUsuario } from '../models/tipoUsuario.model';

@Injectable({
  providedIn: 'root'
})
export class TipoUsuarioService {
  _tipoUsuarios: TipoUsuario[] = [
    {idTipoUsuario: 1, nombreTipoUsuario: 'operador'},
    {idTipoUsuario: 2, nombreTipoUsuario: 'administrador'},
    {idTipoUsuario: 3, nombreTipoUsuario: 'Gerente'}
  ];

  constructor() { }

  recuperar (codigo: number): TipoUsuario {
    return this._tipoUsuarios.find( t => t.idTipoUsuario === codigo);
  }
}
