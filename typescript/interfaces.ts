interface Person {
	name: string;
	age: number;
	male: boolean;
	toString(): string;
}

const John = {
	name: 'John Doe',
	age: 23,
	male: true,
	toString(): string {
		return 'Name: ${this.name}, age: ${this.age}';
	}
};

const printPerson = (person: Person): void => {
	console.log('Yup ', person.toString());
};

printPerson(John);
