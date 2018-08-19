import {Component, Inject, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators as val} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import * as moment from 'moment';
import { User } from "models/user";
import {CreditService} from "../../core/credit.service";

@Component({
  selector: 'home-create-allowance-modal',
  template: `
    <form [formGroup]="allowanceForm" (submit)="onSubmit(allowanceForm)">
      <h2 mat-dialog-title>Create Allowance for Member</h2>
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
          <input matInput type="number" formControlName="frequency" placeholder="Frequency (months)" />
          <mat-hint>How often allowance credit is given.</mat-hint>
          <mat-error *ngIf="allowanceForm.get('frequency').hasError('required')">
            Frequency is required.
          </mat-error>
          <mat-error *ngIf="allowanceForm.get('frequency').hasError('min')">
            Frequency must be at least 0.
          </mat-error>
        </mat-form-field>
        
        <mat-form-field>
          <input matInput type="number" formControlName="count" placeholder="Count" />
          <mat-hint>How many times allowance is given</mat-hint>
          <mat-error *ngIf="allowanceForm.get('frequency').hasError('required')">
            Frequency is required.
          </mat-error>
          <mat-error *ngIf="allowanceForm.get('frequency').hasError('min')">
            Frequency must be at least 0.
          </mat-error>
        </mat-form-field>
        
        <mat-form-field>
          <input matInput [matDatepicker]="picker" formControlName="startOn" placeholder="Start On">
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
          
          <mat-hint>When to start allowance</mat-hint>
          <mat-error *ngIf="allowanceForm.get('startOn').hasError('required')">
            This field is required.
          </mat-error>
        </mat-form-field>

      </mat-dialog-content>

      <mat-dialog-actions>
        <div class="level">
          <div class="level-left">
            <button class="button" type="button" mat-button mat-dialog-close>Cancel</button>
          </div>
          <div class="level-right">
            <button class="button is-primary"
                    [ngClass]="{ 'is-loading': isLoading }"
                    [disabled]="allowanceForm.invalid"
                    type="submit" mat-button>
              Submit
            </button>
          </div>
        </div>
      </mat-dialog-actions>

    </form>
  `,
  styles: [`
    mat-form-field {
      margin-bottom: 12px;
    }
  `]
})
export class CreateAllowanceModalComponent implements OnInit {

  allowanceForm: FormGroup;
  isLoading: boolean;

  constructor(
    private dialogRef: MatDialogRef<CreateAllowanceModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    private fb: FormBuilder,
    private creditService: CreditService,
  ) {
    this.allowanceForm = fb.group({
      startOn: [new Date(), [val.required, val.min(0)]],
      amount: [50, [val.required, val.min(0)]],
      count: [12, [val.required, val.min(0)]],
      frequency: [1, [val.required, val.min(0)]],
      user: [this.data.user],
    });
  }

  ngOnInit() {
  }

  onSubmit(form: FormGroup) {
    if (form.invalid) return;
    this.isLoading = true;

    this.creditService.createAllowance(form.value)
      .first()
      .subscribe(
        allowances => this.dialogRef.close(allowances),
        err => {
          console.error(err);
          this.isLoading = false;
        }
      )
  }

}
