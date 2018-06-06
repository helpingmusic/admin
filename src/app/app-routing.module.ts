import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import {LogoutGuard} from "./core/logout.guard";
import {MainComponent} from "./main.component";

const routes: Routes = [
  { path: 'login', loadChildren: 'app/login/login.module#LoginModule' },
  { path: 'logout', canActivate: [LogoutGuard], component: MainComponent },
  {
    path: '',
    canLoad: [AuthGuard],
    component: MainComponent,
    children: [
      { path: '', redirectTo: '/members', pathMatch: 'full' },
      { path: 'members', loadChildren: 'app/users/users.module#UsersModule' },
      { path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, LogoutGuard]
})
export class AppRoutingModule { }
