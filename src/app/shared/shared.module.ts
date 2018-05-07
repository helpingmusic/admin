import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSortModule, MatTableModule, MatToolbarModule,
  MatTooltipModule
} from "@angular/material";
import {ReactiveFormsModule} from "@angular/forms";
import {CdkTableModule} from "@angular/cdk/table";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    CdkTableModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule,
  ]
})
export class SharedModule { }
