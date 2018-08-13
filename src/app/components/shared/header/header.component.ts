import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { OpcionService } from '../../../services/opcion.service';
import { Opcion } from '../../../models/Opcion.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public opcion: Opcion[] = [];

  autenticado = false;
  constructor(
    public usuarioService: UsuarioService,
    public opcionService: OpcionService,
    public router: Router
  ) {

    const jwt = localStorage.getItem('jwt');

    if (jwt) {
       this.autenticado = true;
    }
    usuarioService.emAutenticado.subscribe((data: boolean) => {
      this.autenticado = data;
      this.opcionService.listarOpciones().subscribe((datas: Opcion[]) => {
        this.opcion = datas;
      });
    });
   }

  ngOnInit() {
  }

  cerrarSession() {
    this.usuarioService.cerrarSesion();
    this.router.navigate(['/login']);
  }
}
