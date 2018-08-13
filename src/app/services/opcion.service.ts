import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RutaMetodos } from './ruta-metodos';

@Injectable({
  providedIn: 'root'
})
export class OpcionService {

  constructor(
    public http: HttpClient
  ) { }

  listarOpciones() {
    const ruta = environment.urlApi + RutaMetodos.listarOpcion;
    return this.http.get(ruta);
  }
}
