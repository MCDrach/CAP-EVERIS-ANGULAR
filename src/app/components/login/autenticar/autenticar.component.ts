import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autenticar',
  templateUrl: './autenticar.component.html',
  styles: [
    `
    .ng-invalid.ng-touched:not(form){
    border: 1px solid red;
  }
  `]
})
export class AutenticarComponent implements OnInit {

  usuario: Usuario = {
    codigo: 0, nombre: null, email: 'darwinchilon@hotmail.com', password: '1234', idTipoUsuario: 1, image: null
  };

  constructor(
    public usuarioService: UsuarioService,
    public router: Router
  ) {
  }

  ngOnInit() {
  }
  validar(forma: NgForm) {
    const res = this.usuarioService.iniciarSesion(this.usuario);

    res.subscribe((data: boolean) => {

      this.router.navigate(['/listado']);
    });

  }

}
