import { Component } from '@angular/core';
import { NotificacionService } from './services/notificacion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

  title = 'appBasica';
  nombre = 'pruebas';
  mensaje: string;

  constructor (public notificacionService: NotificacionService) {
    this.notificacionService.emMensaje.subscribe( (mensaje) => {
      console.log('recibido desde emitter', mensaje);
    });
  }

  mandarMensaje() {
    this.notificacionService.mandarMensaje(this.mensaje);
  }
}
