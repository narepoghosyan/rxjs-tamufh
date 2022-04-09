import {
  of,
  map,
  fromEvent,
  filter,
  toArray,
  switchMap,
  from,
  debounceTime,
  pluck,
  mergeMap,
  take,
} from 'rxjs';
import { fromFetch } from 'rxjs/fetch';

// 1. From an Observable of strings...

const strings$ = of('Word', 'Another');

strings$
  .pipe(
    switchMap((item) =>
      from(item).pipe(
        filter((item) => item === item.toLowerCase()),
        toArray()
      )
    )
  )
  .subscribe(console.log);

// 2. From an Observable of click events...

const clickEvent$ = fromEvent(document, 'click');

clickEvent$
  .pipe(map((e: MouseEvent) => ({ x: e.clientX, y: e.clientY })))
  .subscribe(console.log);

// 3. From an input...

const searchEvent$ = fromEvent(document.getElementById('searchinput'), 'input');

searchEvent$
  .pipe(
    debounceTime(500),
    filter((event) => event.target.value),
    switchMap((event) => {
      const value = event.target.value;
      const url = `https://api.mixcloud.com/search/?q=${value}&type=tag`;
      return fromFetch(url, { selector: (response) => response.json() }).pipe(
        mergeMap((data) =>
          from(data.data).pipe(take(10), pluck('name'), toArray())
        )
      );
    })
  )
  .subscribe(console.log);
