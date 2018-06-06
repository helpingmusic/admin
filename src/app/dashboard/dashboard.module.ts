import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: DashboardComponent }]),
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
