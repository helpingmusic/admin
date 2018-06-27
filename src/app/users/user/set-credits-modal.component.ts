import {Component, Inject, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators as val} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { User } from "models/user";
import {CreditService} from "../../core/credit.service";

@Component({
  selector: 'home-set-credits-modal',
  template: `
    <form [formGroup]="creditsForm" (submit)="onSubmit(creditsForm)">
      <h2 mat-dialog-title>Set a Member's Credit Balance</h2>
      <mat-dialog-content>
        <mat-form-field>
          <input matInput
                 autofocus
                 type="number"
                 formControlName="amount"
                 placeholder="Credit Amount" />
          <mat-error *ngIf="creditsForm.get('amount').hasError('required')">
            Credit amount is required.
          </mat-error>
          <mat-error *ngIf="creditsForm.get('amount').hasError('min')">
            Credit amount mus be at least 0.
          </mat-error>
        </mat-form-field>
        
        <mat-form-field>
          <textarea matInput
                    formControlName="notes"
                    placeholder="Reason For Credit Change">
          </textarea>
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
                    [disabled]="creditsForm.invalid" 
                    type="submit" mat-button>
              Okay
            </button>
          </div>
        </div>
      </mat-dialog-actions>
      
    </form>
  `,
  styles: []
})
export class SetCreditsModalComponent implements OnInit {

  creditsForm: FormGroup;
  isLoading: boolean;

  constructor(
    private dialogRef: MatDialogRef<SetCreditsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    private fb: FormBuilder,
    private creditService: CreditService,
  ) {
    this.creditsForm = fb.group({
      amount: [this.data.user.credits, [val.required, val.min(0)]],
      notes: [''],
    })
  }

  ngOnInit() {
  }

  onSubmit(form: FormGroup) {
    if (form.invalid) return false;

    this.isLoading = true;

    this.creditService.setUserCredits(this.data.user._id, form.value.amount, form.value.notes)
      .subscribe(
        ct => {
          this.isLoading = false;
          this.dialogRef.close(true);
        },
        err => {
          console.error(err);
          this.isLoading = false;
        }
      );
  }

}
