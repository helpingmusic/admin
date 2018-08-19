import { NgModule } from '@angular/core';
import { SharedModule } from "app/shared/shared.module";
import { UsersComponent } from './users.component';
import {RouterModule} from "@angular/router";
import { UserComponent } from './user/user.component';
import { CheckUserProfileComponent } from './check-user-profile.component';
import { SetCreditsModalComponent } from './user/set-credits-modal.component';
import { EditAllowanceTransactionModalComponent } from './user/edit-allowance-transaction-modal.component';
import { CreateAllowanceModalComponent } from './user/create-allowance-modal.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: UsersComponent },
      { path: ':id', component: UserComponent },
    ])
  ],
  declarations: [UsersComponent, UserComponent, CheckUserProfileComponent, SetCreditsModalComponent, EditAllowanceTransactionModalComponent, CreateAllowanceModalComponent],
  entryComponents: [
    CheckUserProfileComponent,
    SetCreditsModalComponent,
    CreateAllowanceModalComponent,
    EditAllowanceTransactionModalComponent,
  ],
})
export class UsersModule { }
