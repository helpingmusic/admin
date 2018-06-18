import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {User} from "models/user";

@Component({
  selector: 'home-check-user-profile',
  template: `
    <h2 mat-dialog-title>Flagged User</h2>
    <mat-dialog-content>
      <table class="table">
        <tr>
          <td>Has Payment</td>
          <td><mat-icon *ngIf="!data.user.stripe?.subscriptionId" class="has-text-warning">warning</mat-icon></td>
        </tr>
        <tr>
          <td>Profile Complete</td>
          <td><mat-icon *ngIf="!data.user.profileComplete" class="has-text-warning">warning</mat-icon></td>
        </tr>
        <tr>
          <td>Has Membership Types</td>
          <td><mat-icon *ngIf="!data.user.membership_types.length" class="has-text-warning">warning</mat-icon></td>
        </tr>
        <tr>
          <td>Email Confirmed</td>
          <td><mat-icon *ngIf="!data.user.emailConfirmed" class="has-text-warning">warning</mat-icon></td>
        </tr>

      </table>
    </mat-dialog-content>

    <mat-dialog-actions>
      <div class="level">
        <div class="level-right">
          <button class="button is-primary" mat-button mat-dialog-close>Okay</button>
        </div>
      </div>
    </mat-dialog-actions>
  `,
  styles: []
})
export class CheckUserProfileComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<CheckUserProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
  ) { }

  ngOnInit() {
  }

}
