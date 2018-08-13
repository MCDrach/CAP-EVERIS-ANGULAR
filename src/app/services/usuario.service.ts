import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RutaMetodos } from './ruta-metodos';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  emAutenticado = new EventEmitter<boolean>();

  usuarios: Usuario[] = [
    { codigo: 1, nombre: 'Juan Perez', idTipoUsuario: 2 },
    { codigo: 2, nombre: 'Maria Lopez', idTipoUsuario: 3 },
    { codigo: 3, nombre: 'Mario Huaman', idTipoUsuario: 2 },
    { codigo: 4, nombre: 'Luisa Basurto', idTipoUsuario: 1 }
  ];

  constructor(
    public http: HttpClient
  ) {
  }
  getUrl(ruta: string ): string {
    return environment.urlApi + ruta; // `${}auth/PedirToken`;
  }

  iniciarSesion(usuario: Usuario): Observable<boolean> {
    const ruta = this.getUrl(RutaMetodos.autentica);

    const param = {
      Correo : usuario.email,
      Clave : usuario.password
    };

    return this.http.post(ruta, param).pipe(map((data: any) => {
      localStorage.setItem('jwt', data.tocken);
      const usu = new Usuario(
        data.usuario.idUsuario,
        data.usuario.descUsuario,
        1,
        data.usuario.email,
        null,
        data.usuario.imagen
      );

      localStorage.setItem('usuario', JSON.stringify(usu));
      this.emAutenticado.emit(true);
      return true;
    }),
    catchError( (error) => {
      console.log(error);
      swal('Ups', 'No nos pudimos autenticar: ' + error.error, 'warning');
      return throwError(error);
    })
  );
  }

  cerrarSesion() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('usuario');
    this.emAutenticado.emit(false);
  }


  listar(): Usuario[] {
    return this.usuarios;
  }

  listar2() {
    const ruta = this.getUrl(RutaMetodos.listar);
    // return this.http.get('http://localhost:59623/api/Usuario/Listar');
    return this.http.get(ruta).pipe(map((data: any) => {

      const usuarioInterno: Usuario[] = [];
      data.forEach(element => {
        usuarioInterno.push(new Usuario(element.idUsuario, element.descUsuario, 1, element.email, '', element.imagen ));
      });
      return usuarioInterno;
    }));
  }

  insertar(usu: Usuario): Observable<Object> {

    const ruta = environment.urlApi + RutaMetodos.registar;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${ localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
  });

    const usuarioReq = {
      Nombres: usu.nombre,
      Correo: usu.email,
      Clave: usu.password
    };

    return this.http.post(ruta, usuarioReq, { headers});
  }

  filtrarUsuario(valor: string): Usuario[] {
    valor = valor.toLowerCase();
    return this.usuarios.filter((usu) => usu.nombre.toLowerCase().indexOf(valor) >= 0);

    }


    actualizar(usu: any) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    return this.http.put(this.getUrl(RutaMetodos.actualizar), usu, {headers});
    }
    obtenerUsuario(id: number) {
      const ruta = `${environment.urlApi + RutaMetodos.recuperar}?id=${id}`;
      return this.http.get(ruta).pipe(map((data: any) => {
        const usuarioInterno: Usuario = {
          codigo: data.idUsuario, nombre: data.descUsuario, email: data.email, password: null, idTipoUsuario: 0, image: data.imagen
        };
        return usuarioInterno;
      }));
    }

    actualizaFoto(archivo: File, codigo: number) {
      const ruta = `${environment.urlApi + RutaMetodos.subirFoto}?id=${codigo}`;
      this.subirImagen(ruta, archivo)
      .then( (rpta) => {
        swal('ok', 'imagen actualizada', 'success');
      })
      .catch((resp) => {
        console.log(resp);
      });

    }
    // this.subirImagen(ruta)

    subirImagen(ruta: string, archivo: File) {
      return new Promise( (resolve, reject) => {

        const formData = new FormData();
        const xhr = new XMLHttpRequest();

        formData.append('foto', archivo, archivo.name);

        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 ) {
            if (xhr.status === 200) {
              console.log('200', JSON.parse(xhr.response));
              resolve(JSON.parse(xhr.response));
            } else {
              reject(xhr.response);
            }
          }
        };
        xhr.open('put', ruta, true);
        xhr.send(formData);
      });
    }


  }

