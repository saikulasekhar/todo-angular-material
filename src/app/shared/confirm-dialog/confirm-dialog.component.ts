import { Component, OnInit, Inject, Output, HostListener } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomMaterialModule } from '../../material.module';
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
  styles: [`
  .header, .dialog-message {
      text-transform: lowercase;
  }
  .header::first-letter, .dialog-message::first-letter {
      text-transform: uppercase;
  }
  .btn-cancel {
      background-color: red;
      color: #fff;
  }
`]
})
export class ConfirmDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    cancelText: string,
    confirmText: string,
    message: string,
    title: string
  }, private mdDialogRef: MatDialogRef<ConfirmDialogComponent>) { }

  ngOnInit(): void {
  }

  public cancel() {
    this.close(false);
  }
  public close(value) {
    this.mdDialogRef.close(value);
  }
  public confirm() {
    this.close(true);
  }
  @HostListener("keydown.esc")
  public onEsc() {
    this.close(false);
  }
}
