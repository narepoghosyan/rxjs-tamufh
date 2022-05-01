import { of, map, fromEvent, interval } from 'rxjs';
import { bufferWhen, startWith, tap, withLatestFrom } from 'rxjs/operators';

// 1. Write an async function that takes an array of numbers and returns the largest element​.

// 2. Write a function that makes an HTTP call using an Observable, but can also take an argument indicating how many times it should retry​.

// 3. Create an Observable that emits all emitted values from another Observable when a button is clicked​.

const numbers$ = interval(1000);
const event$ = fromEvent(document.querySelector('#buffer'), 'click');

numbers$.pipe(bufferWhen(() => event$)).subscribe(console.log);
