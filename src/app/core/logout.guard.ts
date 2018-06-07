import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable()
export class LogoutGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.auth.logout();
    this.router.navigateByUrl('/login');

    return false;
  }
}
