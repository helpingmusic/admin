import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from "@angular/router";
import {Observable} from "rxjs/Observable";

import {User} from "models/user";
import {UserService} from "app/core/user.service";
import {MatDialog} from "@angular/material";
import {EditSubscriptionModalComponent} from "./edit-subscription-modal.component";
import {Subscription} from "../../../models/subscription";

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
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.user$ = this.userService.getById(this.route.snapshot.params.id)
      .share();
  }

  editSubscription(subscription: Subscription) {
    const dialogRef = this.dialog.open(EditSubscriptionModalComponent, {
      width: '400px',
      data: { subscription },
    });

    dialogRef.beforeClose()
      .subscribe(sub => {
        if (!sub) return;
        Object.assign(subscription, sub)
      });

  }

}
