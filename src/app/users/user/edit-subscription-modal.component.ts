import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Subscription} from "models/subscription";
import {FormBuilder, FormGroup, Validators as val} from "@angular/forms";
import {UserService} from "../../core/user.service";

@Component({
  selector: 'fj-edit-subscription-modal',
  template: `
    <form [formGroup]="subForm" (submit)="onSubmit(subForm)">
        <h2 mat-dialog-title>Edit Subscription</h2>
        <mat-dialog-content>

          <mat-form-field>
            <mat-select formControlName="status" placeholder="Subscription Status">
              <mat-select-trigger>
                <ng-container [ngSwitch]="subForm.get('status').value">
                  <mat-icon *ngSwitchCase="'active'"
                            matTooltip="Active"
                            matTooltipPosition="right"
                            class="has-text-success">play_circle_outline</mat-icon>

                  <mat-icon *ngSwitchCase="'paused'"
                            matTooltip="Paused"
                            matTooltipPosition="right"
                            class="has-text-grey-light">pause_circle_filled</mat-icon>

                  <mat-icon *ngSwitchCase="'failed_1'" matTooltip="Failed 1" class="has-text-warning">payment</mat-icon>
                  <mat-icon *ngSwitchCase="'failed_2'" matTooltip="Failed 2" class="has-text-warning">payment</mat-icon>
                  <mat-icon *ngSwitchCase="'failed_3'" matTooltip="Failed 3" class="has-text-danger">payment</mat-icon>
                  <mat-icon *ngSwitchCase="'failed_payment'" matTooltip="Failed Payment" class="has-text-danger">payment</mat-icon>

                  <mat-icon *ngSwitchCase="'user_cancelled'" matTooltip="User Cancelled" class="has-text-danger">error</mat-icon>
                  <mat-icon *ngSwitchCase="'admin_cancelled'" matTooltip="Admin Cancelled" class="has-text-black">error</mat-icon>
                </ng-container>
                <span class="is-capitalized">
                    {{ subForm.get('status').value }}
                </span>
              </mat-select-trigger>
              
              <mat-option value="active">
                <mat-icon class="has-text-success">play_circle_outline</mat-icon>
                Active
              </mat-option>
              
              <mat-option value="user_cancelled">
                <mat-icon class="has-text-danger">error</mat-icon>
                User Cancelled
              </mat-option>
              
              <mat-option value="admin_cancelled">
                <mat-icon class="has-text-black">error</mat-icon>
                Admin Cancelled
              </mat-option>
              
            </mat-select>
          </mat-form-field>

          <mat-form-field>
            <input formControlName="nextShipDate" matInput [matDatepicker]="picker" placeholder="Next Ship Date">
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>
      
        </mat-dialog-content>
        
        <mat-dialog-actions>
          <div class="level">
            <div class="level-left">
              <button type="button" class="button" mat-button mat-dialog-close>Cancel</button>
            </div>
            <div class="level-right">
              <button type="submit" class="button is-primary" 
                      [ngClass]="{'is-loading': isLoading }"
                      mat-button>Save</button>
            </div>
          </div>
        </mat-dialog-actions>
    </form>
  `,
  styles: [`
    /deep/ mat-select-trigger mat-icon {
      vertical-align: middle;
    }
  `],
})
export class EditSubscriptionModalComponent implements OnInit {

  subForm: FormGroup;
  isLoading: boolean;

  constructor(
    private dialogRef: MatDialogRef<EditSubscriptionModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { subscription: Subscription },
    private fb: FormBuilder,
    private userService: UserService,
  ) {
    this.subForm = fb.group({
      status: [data.subscription.status, [val.required]],
      nextShipDate: [data.subscription.nextShipDate, [val.required]],
    });
  }

  ngOnInit() {
  }

  onSubmit(subForm: FormGroup) {
    if (subForm.invalid) return false;
    this.isLoading = true;

    this.userService.updateSubscription(this.data.subscription._id, subForm.value)
      .do(() => this.isLoading = false)
      .subscribe(
        sub => this.dialogRef.close(sub),
        err => console.error(err),
      );

  }

}
