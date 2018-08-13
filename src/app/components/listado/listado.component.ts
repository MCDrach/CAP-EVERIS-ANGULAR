import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: []
})
export class ListadoComponent implements OnInit {

  _usuarios: Usuario[];
  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) {

   }

  ngOnInit() {
    // this._usuarios = this._usuarioService.listar();
    this._usuarioService.listar2().subscribe((data) => {
      console.log(data);
      this._usuarios = data;
    } );
  }

  buscarUsuario(valor: string) {
    this._usuarios = this._usuarioService.filtrarUsuario(valor);
  }

  editarUsuario(valor: number) {
    this.router.navigate(['/edicion', valor]);


  }
}
