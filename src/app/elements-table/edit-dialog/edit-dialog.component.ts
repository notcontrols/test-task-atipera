import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { PeriodicElement } from '../../data/interfaces/periodic-element';

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditDialogComponent implements OnInit {
  form!: FormGroup;

  readonly dialogRef = inject(MatDialogRef<EditDialogComponent>);
  readonly data = inject<PeriodicElement>(MAT_DIALOG_DATA);

  ngOnInit(): void {
    this.form = new FormGroup({
      position: new FormControl(this.data.position),
      name: new FormControl(this.data.name),
      weight: new FormControl(this.data.weight),
      symbol: new FormControl(this.data.symbol)
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
