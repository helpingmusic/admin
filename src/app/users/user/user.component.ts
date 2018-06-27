import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from "@angular/router";
import {Observable} from "rxjs/Observable";

import {User} from "models/user";
import {UserService} from "app/core/user.service";
import {MatDialog} from "@angular/material";
import {CreditService} from "../../core/credit.service";
import {CreditTransaction} from "../../../models/credit-transaction";
import {SetCreditsModalComponent} from "./set-credits-modal.component";

@Component({
  selector: 'home-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user$: Observable<User>;
  creditTransactions$: Observable<Array<CreditTransaction>>;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private creditService: CreditService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.user$ = this.userService.getById(this.route.snapshot.params.id)
      .share();

    this.creditTransactions$ = this.creditService.getForUser(this.route.snapshot.params.id);
  }

  setUserCredits(user: User) {
    const dialogRef = this.dialog.open(SetCreditsModalComponent, {
      width: '400px',
      data: { user },
    });

    dialogRef.beforeClose()
      .filter(updated => !!updated)
      .subscribe(() => this.getData());
  }

}
