import { Routes, RouterModule } from '@angular/router';
import { PageNoFoundComponent } from './components/shared/page-no-found/page-no-found.component';
import { ListadoComponent } from './components/listado/listado.component';
import { EdicionComponent } from './components/edicion/edicion.component';
import { AutenticarComponent } from './components/login/autenticar/autenticar.component';
import { AuthGuard } from './guards/auth.guard';
import { RegistroComponent } from './components/login/registro/registro.component';


const ROUTES: Routes = [
    {path: 'listado', component: ListadoComponent},
    {path: 'edicion/:id', component: EdicionComponent},
    {path: 'edicion', component: EdicionComponent, canActivate : [AuthGuard]},
    {path: 'login', component: AutenticarComponent},
    {path: 'registro', component: RegistroComponent},
    {path: '',  component: ListadoComponent}, // si  no ingresa ruta
    {path: '**', pathMatch: 'full', component: PageNoFoundComponent}
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES, {useHash: true});

