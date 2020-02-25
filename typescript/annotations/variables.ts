// type annotations

let apples: number = 5;
let speed: string = 'fast';

let colors: string[] = ['red', 'green', 'blue'];
//classes
class Car {}
let car: Car = new Car();
// object literal
let point: { x: number; y: number } = {
	x: 10,
	y: 20
};

// functions
const logNumber: (i: number) => void = i => {
	console.log(i);
};

// type inferences
// typescipt guesses the type
let oranges = 4;

// when to use annotations
//1 . Function that return s the any type
const json = '{"x": 10, "y":20}';
// every time any appears we have to espicify what kind of
// value this any realy is
const coord: { x: number; y: number } = JSON.parse(json);

let numbers = [-10, -1, 23];
// aboveZero can be boolean or number
let aboveZero: boolean | number = false;

for (let i = 0; i < numbers.length; i++) {
	if (numbers[i] > 0) {
		aboveZero = numbers[i];
	}
}
