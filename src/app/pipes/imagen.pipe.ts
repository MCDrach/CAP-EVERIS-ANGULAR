import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';
import { RutaMetodos } from '../services/ruta-metodos';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(imagen: string): any {
    if (!imagen) {
      return `${environment.urlApi + RutaMetodos.verFoto}?filename=cara.jpg`;
    }
    const ruta = `${environment.urlApi + RutaMetodos.verFoto}?filename=${imagen}`;
    // console.log(ruta);

    return ruta;
  }

}
