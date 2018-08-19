import {Component, Inject, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators as val} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import * as moment from 'moment';
import { User } from "models/user";
import {CreditService} from "../../core/credit.service";
import {AllowanceTransaction} from "../../../models/credit-transaction";

@Component({
  selector: 'home-edit-allowance-transaction-modal',
  template: `
    <form [formGroup]="allowanceForm" (submit)="onSubmit(allowanceForm)">
      <h2 mat-dialog-title>Edit Upcoming Allowance for Member</h2>
      <mat-dialog-content>
        <mat-form-field>
          <input matInput autofocus type="number" formControlName="amount" placeholder="Amount" />
          <mat-hint>Amount credited to member on allowance.</mat-hint>
          <mat-error *ngIf="allowanceForm.get('amount').hasError('required')">
            Credit amount is required.
          </mat-error>
          <mat-error *ngIf="allowanceForm.get('amount').hasError('min')">
            Credit amount must be at least 0.
          </mat-error>
        </mat-form-field>

        <mat-form-field>
          <input matInput [matDatepicker]="picker" formControlName="runOn" placeholder="Run On Date">
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
          
          <mat-error *ngIf="allowanceForm.get('runOn').hasError('required')">
            This field is required.
          </mat-error>
        </mat-form-field>

      </mat-dialog-content>

      <mat-dialog-actions>
        <div class="level">
          <div class="level-left">
            <button class="button is-danger"
                    [ngClass]="{ 'is-loading': deleteIsLoading }"
                    (click)="deleteAllowance()"
                    type="button" mat-button>
              Delete
            </button>
          </div>
          <div class="level-right">
            <button class="button" type="button" mat-button mat-dialog-close>Cancel</button>
            <button class="button is-primary"
                    [ngClass]="{ 'is-loading': submitIsLoading }"
                    [disabled]="allowanceForm.invalid"
                    type="submit" mat-button>
              Submit
            </button>
          </div>
        </div>
      </mat-dialog-actions>

    </form>
  `,
  styles: []
})
export class EditAllowanceTransactionModalComponent implements OnInit {

  allowanceForm: FormGroup;
  deleteIsLoading: boolean;
  submitIsLoading: boolean;

  constructor(
    private dialogRef: MatDialogRef<EditAllowanceTransactionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { allowanceTransaction: AllowanceTransaction },
    private fb: FormBuilder,
    private creditService: CreditService,
  ) {
    this.allowanceForm = fb.group({
      amount: [data.allowanceTransaction.amount, [val.required, val.min(0)]],
      runOn: [moment(data.allowanceTransaction.runOn).toDate(), [val.required]],
    });
  }

  ngOnInit() {
  }

  deleteAllowance() {
    this.deleteIsLoading = true;
    this.creditService.deleteAllowance(this.data.allowanceTransaction._id)
      .first()
      .subscribe(
        allowance => this.dialogRef.close(allowance),
        err => {
          console.error(err);
          this.deleteIsLoading = false;
        }
      )

  }

  onSubmit(form: FormGroup) {
    if (form.invalid) return;
    this.submitIsLoading = true;

    this.creditService.updateAllowance(this.data.allowanceTransaction._id, form.value)
      .first()
      .subscribe(
        allowance => this.dialogRef.close(allowance),
        err => {
          console.error(err);
          this.submitIsLoading = false;
        }
      )
  }

}
