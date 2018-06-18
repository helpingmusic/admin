import { Injectable } from '@angular/core';
import {Router, CanLoad, Route} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanLoad {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  canLoad(route: Route): boolean {
    const is = this.auth.isLoggedIn();
    if (!is) this.router.navigateByUrl('/login');
    return is;
  }
}
