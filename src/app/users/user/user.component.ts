import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from "@angular/router";
import {Observable} from "rxjs/Observable";

import {User} from "models/user";
import {UserService} from "app/core/user.service";

@Component({
  selector: 'fj-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user$: Observable<User>;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.user$ = this.userService.getById(this.route.snapshot.params.id)
      .do(console.log)
      .share();

  }

}
