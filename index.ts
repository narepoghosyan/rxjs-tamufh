import { of, map, fromEvent } from 'rxjs';
import { startWith, tap, withLatestFrom } from 'rxjs/operators';

// 1. Create an input with default value, and enable the button if the text is changed by the user; if the text is changed back to the default value, disable the button again​.

const input = document.getElementById(
  'inputWithDefaultValue'
) as HTMLInputElement;
const button = document.getElementById('submit') as HTMLButtonElement;

fromEvent(input, 'input')
  .pipe(
    map((val) => (val.target as HTMLInputElement).value),
    startWith(input.value),
    withLatestFrom(of(input.value)),
    tap((val) => {
      const disabled = val[0] === val[1];
      button.disabled = disabled;
    })
  )
  .subscribe();

// 2. Create a stream of numbers and console.log “odd” for odd numbers and “even” for even numbers​.

const numbers$ = of(1, 2, 4, 5, 7, 8);

numbers$
  .pipe(map((val) => (val % 2 === 0 ? 'even' : 'odd')))
  .subscribe(console.log);

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
