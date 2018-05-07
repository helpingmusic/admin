import { NgModule } from '@angular/core';
import { SharedModule } from "app/shared/shared.module";
import { LoginComponent } from './login.component';
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: LoginComponent },
    ])
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
