import { NgModule } from '@angular/core';
import { SubscriptionsComponent } from './subscriptions.component';
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: SubscriptionsComponent }]),
  ],
  declarations: [SubscriptionsComponent]
})
export class SubscriptionsModule { }
