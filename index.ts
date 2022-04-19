import {
  combineLatest,
  concat,
  filter,
  forkJoin,
  fromEvent,
  map,
  merge,
  of,
  timer,
} from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import {
  debounceTime,
  defaultIfEmpty,
  switchMap,
  takeUntil,
toArray,
} from 'rxjs/operators';

// 1. Create a “you have been inactive popup” which will alert a window if user has not done anything with the mouse (click, double click, scroll, right click, mouse move) for 10 seconds​.

merge(
  fromEvent(document, 'click'),
  fromEvent(document, 'dblclick'),
  fromEvent(document, 'contextmenu'),
  fromEvent(document, 'scroll'),
  fromEvent(document, 'mousemove')
)
  .pipe(takeUntil(timer(10000)), defaultIfEmpty('inactive'))
  .subscribe((val) => {
    if (val === 'inactive') {
      alert('you have been inactive');
    }
  });

// 2. Create two number inputs and a dropdown which allows to select an arithmetic operation (+, -, *, /, %). After selecting any, display the result of the operation in the DOM​.

fromEvent(document.getElementById('select'), 'change')
  .pipe(
    switchMap((event) => {
      const firstInput = document.getElementById('first') as HTMLInputElement;
      const secondInput = document.getElementById('second') as HTMLInputElement;
      const operator = event.target.value;
      const operators = {
        '+': (a: number, b: number) => a + b,
        '-': (a: number, b: number) => a - b,
        '*': (a: number, b: number) => a * b,
        '/': (a: number, b: number) => a / b,
        '%': (a: number, b: number) => a % b,
      };
      return concat(of(firstInput.value), of(secondInput.value)).pipe(
        toArray(),
        filter((data) => data[0] !== '' && data[1] !== ''),
        map((data) => operators[operator](+data[0], +data[1]))
      );
    })
  )
  .subscribe(console.log);

// 3. Create three inputs in which the user can type a name of a country, call the “restcountries” api and display the country that has the largest population​

combineLatest(
  Array.from(document.getElementsByClassName('country')).map(
    (data: HTMLInputElement) =>
      fromEvent(data, 'input').pipe(
        debounceTime(500),
        filter((data) => data.target.value),
        switchMap((data) =>
          fromFetch(
            `https://restcountries.com/v3.1/name/${data.target.value}?fullText=true`
          ).pipe(
            switchMap((response) => {
              return response.json();
            }),
            filter((item) => item.length),
            map((item) => item[0])
          )
        )
      )
  )
).subscribe((data) => {
  const countryWithLargestPopulation = data.find(
    (item) =>
      item.population ===
      Math.max.apply(
        null,
        data.map((c) => c.population)
      )
  );
  console.log(
    countryWithLargestPopulation.altSpellings[1] +
      ' : ' +
      countryWithLargestPopulation.population
  );
});
