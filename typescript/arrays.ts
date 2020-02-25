const carMakers = ['ford', 'toyota', 'chevy'];

const carsByMake = [['f150'], ['corolla'], ['camaro']];

const car = carMakers[0];
const myCar = carMakers.pop();

carMakers.map((car: string): string => {
	return car.toUpperCase();
});

const importantDate = [new Date(), '2030-10-10'];
