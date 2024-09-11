import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { PeriodicElement } from '../data/interfaces/periodic-element';
import { ELEMENT_DATA } from '../data/moc-data/moc-element-data';

@Injectable({
  providedIn: 'root'
})
export class ElementsService {
  getElements(): Observable<PeriodicElement[]> {
    return of(ELEMENT_DATA).pipe(
      delay(500),
      map((data: PeriodicElement[]) => data));
  }
}
