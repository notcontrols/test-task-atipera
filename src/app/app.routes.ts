import { Routes } from '@angular/router';
import { ElementsTableComponent } from './elements-table/elements-table.component';

export const routes: Routes = [
  {
    path: 'elements',
    component: ElementsTableComponent,
    title: 'Elements'
  },
  {
    path: '',
    redirectTo: 'elements',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'elements',
  }
];
