import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';

import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { PeriodicElement } from '../data/interfaces/periodic-element';
import { ElementsService } from '../services/elements.service';

@Component({
  selector: 'app-elements-table',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule
  ],
  templateUrl: './elements-table.component.html',
  styleUrl: './elements-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElementsTableComponent implements OnInit, OnDestroy {
  @ViewChild(MatTable, { static: false }) table!: MatTable<PeriodicElement>;

  private filterSubject = new Subject<string>();
  private readonly debounceTimeMs = 2000;

  private readonly dialog = inject(MatDialog);
  private elementsService = inject(ElementsService);

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>();


  ngOnInit(): void {
    this.elementsService.getElements().subscribe((res: PeriodicElement[]) => {
      this.dataSource.data = res;
    });

    this.filterSubject.pipe(
      debounceTime(this.debounceTimeMs),
      distinctUntilChanged()
    ).subscribe((filterValue) => {
      this.performFilter(filterValue);
    });
  }

  onFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterSubject.next(filterValue);
  }

  performFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editRow(row: PeriodicElement): void {
    const currentPosition = row.position;

    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: row
    });

    dialogRef.afterClosed().subscribe((result: PeriodicElement) => {
      if (result !== undefined) {
        const index = this.dataSource.data.findIndex(item => item.position === currentPosition);
        if (index !== -1) {
          this.dataSource.data[index] = result;
          this.table.renderRows();
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.filterSubject.complete();
  }
}
