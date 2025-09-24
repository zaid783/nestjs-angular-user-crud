import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  template: `
    <h2 mat-dialog-title>Confirm Delete</h2>
    <mat-dialog-content>Are you sure you want to delete this user?</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="warn" (click)="onConfirm()">Delete</button>
    </mat-dialog-actions>
  `,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
})
export class ConfirmDialog {
  constructor(private dialogRef: MatDialogRef<ConfirmDialog>) {}

  onCancel() {
    this.dialogRef.close(false); 
  }

  onConfirm() {
    this.dialogRef.close(true);
  }
}