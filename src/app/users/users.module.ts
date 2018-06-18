import { NgModule } from '@angular/core';
import { SharedModule } from "app/shared/shared.module";
import { UsersComponent } from './users.component';
import {RouterModule} from "@angular/router";
import { UserComponent } from './user/user.component';
import { CheckUserProfileComponent } from './check-user-profile.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: UsersComponent },
      { path: ':id', component: UserComponent },
    ])
  ],
  declarations: [UsersComponent, UserComponent, CheckUserProfileComponent],
  entryComponents: [
    CheckUserProfileComponent
  ],
})
export class UsersModule { }
