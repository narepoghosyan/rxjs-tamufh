import { of, partition, merge, concat, map, from, fromEvent } from 'rxjs';
import { distinctUntilChanged, withLatestFrom } from 'rxjs/operators';

// 1. Create an input with default value, and enable the button if the text is changed by the user; if the text is changed back to the default value, disable the button again​.

const defaultInput$ = fromEvent(
  document.getElementById('inputWithDefaultValue'),
  'input'
);

defaultInput$.pipe().subscribe((data) => {
  console.log(data);
});

// 2. Create a stream of numbers and console.log “odd” for odd numbers and “even” for even numbers​.

// const numbers = [1, 2, 4, 5, 7, 8];

// const numbers$ = from(numbers).pipe(delay(1000));

// const [evens$, odds$] = partition(numbers$, (val) => val % 2 === 0);

// merge(evens$.pipe(map((i) => 'even')), odds$.pipe(map((i) => 'odd'))).subscribe(
//   console.log
// );

// 3. When the user clicks a button, console.log the value from an input​.

const buttonEvent$ = fromEvent(
  document.getElementById('showInputValue'),
  'click'
);
const inputEvent$ = fromEvent(document.getElementById('inputValue'), 'input');

buttonEvent$
  .pipe(
    withLatestFrom(inputEvent$),
    map(([click, input]) => (input.target as HTMLInputElement).value)
  )
  .subscribe(console.log);
