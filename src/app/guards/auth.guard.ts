import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public router: Router) {

  }
  canActivate(): boolean {
    const token = localStorage.getItem('jwt');

    if (token) {
      return true;
    }
    this.router.navigate(['login']);

    return false;
  }
}
