import { Component, OnInit } from '@angular/core';
import { environment } from "environments/environment";

@Component({
  selector: 'fj-main',
  template: `
    <mat-toolbar class="navbar is-fixed-top mat-elevation-z3">

      <div class="navbar-brand">
        <img src="/assets/FilterjoyLogo.png" width="200"/>
      </div>
      <div class="navbar-end">

        <a class="navbar-item" [href]="fjLink">
          Filterjoy.com
          <mat-icon>call_made</mat-icon>
        </a>

        <a class="navbar-item" routerLink="/logout">Logout</a>

      </div>

    </mat-toolbar>

    <div class="columns has-background-light main">

      <div class="column is-narrow nav-container" style="width: 240px">
        <fj-sidebar class="column"></fj-sidebar>
      </div>


      <main class="column">
        <router-outlet></router-outlet>
      </main>

    </div>
  `,
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  fjLink = environment.domain;

  constructor() { }

  ngOnInit() {
  }

}
