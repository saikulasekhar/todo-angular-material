import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { CustomMaterialModule } from '../../material.module';
import { ConfirmDialogService } from '../confirm-dialog.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [
    CommonModule,
    CustomMaterialModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [ConfirmDialogComponent],
    entryComponents: [ConfirmDialogComponent],
    providers: [ConfirmDialogService]
})
export class ConfirmDialogModule { }
