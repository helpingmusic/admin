import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {User} from "../../models/user";

@Component({
  selector: 'fj-check-flags-modal',
  template: `
    <h2 mat-dialog-title>Flagged User</h2>
    <mat-dialog-content>
      <table class="table">
        <tr>
          <td>Has multiple of same size filter</td>
          <td><mat-icon *ngIf="data.user.hasMultipleOfSameFilter" class="has-text-danger">error_outline</mat-icon></td>
        </tr>
        <tr>
          <td>Has unchanged frequency</td>
          <td><mat-icon *ngIf="data.user.hasUnchangedFrequency" class="has-text-danger">error_outline</mat-icon></td>
        </tr>
        <tr>
          <td>Has high filter grade</td>
          <td><mat-icon *ngIf="data.user.hasHighFilterGrade" class="has-text-danger">error_outline</mat-icon></td>
        </tr>
        <tr>
          <td>Used promo</td>
          <td><mat-icon *ngIf="data.user.usedPromo" class="has-text-danger">error_outline</mat-icon></td>
        </tr>
        
      </table>
    </mat-dialog-content>

    <mat-dialog-actions>
      <div class="level">
        <div class="level-left">
          <button class="button" mat-button mat-dialog-close>Okay</button>
        </div>
        <div class="level-right">
          <a [routerLink]="['members', data.user._id]">
            <button class="button is-primary" mat-button mat-dialog-close>
             Go To Gamer 
            </button>
          </a>
        </div>
      </div>
    </mat-dialog-actions>
  `,
  styles: [`
    table {
      width: 100%;
    }
  `]
})
export class CheckFlagsModalComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<CheckFlagsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
  ) { }

  ngOnInit() {
  }

}
