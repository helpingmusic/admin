import { NgModule } from '@angular/core';
import { SharedModule } from "app/shared/shared.module";
import { UsersComponent } from './users.component';
import {RouterModule} from "@angular/router";
import { UserComponent } from './user/user.component';
import { CheckUserProfileComponent } from './check-user-profile.component';
import { SetCreditsModalComponent } from './user/set-credits-modal.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: UsersComponent },
      { path: ':id', component: UserComponent },
    ])
  ],
  declarations: [UsersComponent, UserComponent, CheckUserProfileComponent, SetCreditsModalComponent],
  entryComponents: [
    CheckUserProfileComponent,
    SetCreditsModalComponent,
  ],
})
export class UsersModule { }
