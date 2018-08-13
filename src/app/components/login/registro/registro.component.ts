import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: []
})
export class RegistroComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public usuarioService: UsuarioService
  ) {
    this.forma = new FormGroup({
      'nombre': new FormControl('Demoss', [Validators.required]),
      'correo': new FormControl('jperez@gmail.com', [Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)]),
      'password1': new FormControl('1234', [Validators.required, Validators.minLength(4)]),
      'password2': new FormControl('1234')
    }, {validators: this.sonIguales('password1', 'password2')});

   }

  sonIguales(campo1: string, campo2: string) {

    return (grupo: FormGroup) => {
      const ps1 = grupo.controls[campo1].value;
      const ps2 = grupo.controls[campo2].value;
      if (ps1 === ps2) {
        return null;
      }
      return {
        sonIguales: true
      };
    };
  }

  ngOnInit() {
  }

  grabar() {
    if (!this.forma.valid) {
      return;
    }
    const usuario: Usuario = {
        codigo: 0,
        nombre: this.forma.value.nombre,
        idTipoUsuario: 0,
        email: this.forma.value.correo,
        password: this.forma.value.password1,
        image: null
    };
    this.usuarioService.insertar(usuario).subscribe((data) => {
      console.log('insertar', data);
    });


  }

}
