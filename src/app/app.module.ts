import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { ListadoComponent } from './components/listado/listado.component';
import { EdicionComponent } from './components/edicion/edicion.component';
import { PageNoFoundComponent } from './components/shared/page-no-found/page-no-found.component';
import { APP_ROUTES } from './app.routes';
import { TipoUsuarioPipe } from './pipes/tipo-usuario.pipe';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutenticarComponent } from './components/login/autenticar/autenticar.component';
import { RegistroComponent } from './components/login/registro/registro.component';
import { ImagenPipe } from './pipes/imagen.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListadoComponent,
    EdicionComponent,
    PageNoFoundComponent,
    TipoUsuarioPipe,
    AutenticarComponent,
    RegistroComponent,
    ImagenPipe
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
