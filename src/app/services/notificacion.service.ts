import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotificacionService implements OnInit {

  hub: HubConnection;
  emMensaje = new EventEmitter<string>();

  constructor() {
    const builder = new HubConnectionBuilder();
    this.hub = builder.withUrl('http://localhost:59623/message').build();
    this.hub.on('notificaMensaje', (mensaje) => {
      console.log('mensaje enviado', mensaje);
      this.emMensaje.emit(mensaje);
    });
    this.hub.start();
   }

  ngOnInit() {
  }

  mandarMensaje(mensaje: string) {
    return this.hub.invoke('NotificaDCSaludaTodos', mensaje);
  }

}
