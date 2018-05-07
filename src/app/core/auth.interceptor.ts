
import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from "@angular/common/http";
import { environment } from 'environments/environment';

import { Observable } from 'rxjs/Observable';
import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor( private auth: AuthService ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authReq = req.clone({
      setHeaders: { Authorization: 'Bearer ' + this.auth.userToken },
      url: environment.domain + req.url,
      body: { ...req.body, _csrf: this.auth.csrf },
    });

    return next.handle(authReq);
  }
}
