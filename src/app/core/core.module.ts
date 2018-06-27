import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./auth.interceptor";
import {UserService} from "./user.service";
import {CreditService} from "./credit.service";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    BrowserAnimationsModule,
  ],
  declarations: [],
  providers: [
    AuthService,
    UserService,
    CreditService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]
})
export class CoreModule { }
