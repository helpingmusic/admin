import { NgModule } from '@angular/core';
import { SharedModule } from "app/shared/shared.module";
import { UsersComponent } from './users.component';
import {RouterModule} from "@angular/router";
import { UserComponent } from './user/user.component';
import { EditSubscriptionModalComponent } from './user/edit-subscription-modal.component';
import { CheckFlagsModalComponent } from './check-flags-modal.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: UsersComponent },
      { path: ':id', component: UserComponent },
    ])
  ],
  declarations: [UsersComponent, UserComponent, EditSubscriptionModalComponent, CheckFlagsModalComponent],
  entryComponents: [
    EditSubscriptionModalComponent,
    CheckFlagsModalComponent,
  ],
})
export class UsersModule { }
