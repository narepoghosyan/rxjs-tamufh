import { from, fromEvent, interval, merge, of } from 'rxjs';
import {
  auditTime,
  distinct,
  mergeMap,
  skipUntil,
  takeUntil,
  toArray,
} from 'rxjs/operators';

// 1. Write a function that takes an array of numbers and returns an Observable of the same array, but without duplicate values​.

const removeDuplicates = (arr: number[]) => {
  return from(arr).pipe(distinct(), toArray()).subscribe(console.log);
};

removeDuplicates([1, 2, 3, 3, 4, 3, 7]);

// 2.Create an Observable that shows the current time in the console, but only after a certain button has been clicked, and stops when another one is clicked​.

interval(1000)
  .pipe(
    skipUntil(fromEvent(document.getElementById('start'), 'click')),
    takeUntil(fromEvent(document.getElementById('stop'), 'click')),
    mergeMap(() => {
      const date = new Date();
      return of(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
    })
  )
  .subscribe(console.log);

// 3. Create a mix of different Observables, clicks, interval and so on, but only log their result every 3 seconds​.

merge(fromEvent(document, 'dblclick'), interval(1500))
  .pipe(auditTime(3000))
  .subscribe(console.log);
