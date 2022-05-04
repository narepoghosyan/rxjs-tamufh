import {
  of,
  fromEvent,
  interval,
  from,
  firstValueFrom,
  throwError,
  iif,
  retry,
} from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { buffer, max, mergeMap } from 'rxjs/operators';

// 1. Write an async function that takes an array of numbers and returns the largest element​.

const getLargestElement = (arr: number[]) => {
  const source$ = from(arr).pipe(max());
  firstValueFrom(source$).then(console.log);
};

getLargestElement([22, 19, 26]);

// 2. Write a function that makes an HTTP call using an Observable, but can also take an argument indicating how many times it should retry​.

const getCountries = (url: string, retryCount: number) => {
  fromFetch(url)
    .pipe(
      mergeMap((response) =>
        iif(
          () => response.status === 200,
          of(response),
          throwError(() => 'Error!')
        )
      ),
      retry(retryCount)
    )
    .subscribe({
      next: (value) => console.log(value),
      error: (err) => console.log(err),
    });
};

getCountries('https://restcountries.com/v3.1/name/armenia?fullText=true', 3);

// 3. Create an Observable that emits all emitted values from another Observable when a button is clicked​.

const numbers$ = interval(1000);
const event$ = fromEvent(document.querySelector('#buffer'), 'click');

numbers$.pipe(buffer(event$)).subscribe(console.log);
