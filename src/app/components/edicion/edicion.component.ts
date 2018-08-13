import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edicion',
  templateUrl: './edicion.component.html',
  styles: []
})
export class EdicionComponent implements OnInit {

  forma: FormGroup;
  usuario: Usuario = new Usuario(null, null, null, null, null, null);
  archivoSubir: File;
  archivoTemp: File;
  constructor(
    public active: ActivatedRoute,
    public usuarioService: UsuarioService,
    public router: Router
  ) {
    this.forma = new FormGroup({
      'nombre': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required,
        Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)])
    });

    this.active.params.subscribe(param => {
      if (param['id']) {
        console.log('si llego ', param['id']);

        this.usuarioService.obtenerUsuario(param['id']).subscribe((data) => {
          this.usuario = data;
          const usu = {
            nombre: this.usuario.nombre,
            email: this.usuario.email
          };
          console.log(this.usuario);
          this.forma.setValue(usu);
        });

      } else {
        console.log('no llego parametro');
      }
    });

   }

  ngOnInit() {

  }
  grabar() {
    if (!this.forma.valid) {
      return;
    }

    const usuario = {
      IdUsuario:  this.usuario.codigo,
      DescUsuario: this.forma.value.nombre,
      Email: this.forma.value.email,
  };


  this.usuarioService.actualizar(usuario).subscribe( (data) => {
    console.log(data);
    this.router.navigate(['/listado']);
  });

  }
  seleccionImagen(archivo: File) {

    console.log(archivo);
    if (!archivo ) {
      this.archivoTemp = null;
      return;
    }
    if (archivo.type.indexOf('image') < 0) {
      console.log('demo');
      swal('Alerta', 'Debe ingresar una imagen', 'warning');
      return;
    }
    this.archivoSubir = archivo;

    const reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onloadend = () => this.archivoTemp = reader.result ;

  }
  actualizaFoto() {
    this.usuarioService.actualizaFoto(this.archivoSubir, this.usuario.codigo);
  }
  // https://www.nuget.org/api/v2/
  // microsoft.aspnetcore.signalr
  // npm install --save @aspnet/signalr

}
