let message = "Hello";
let message2: string = "TypeScript";    // [esma we are explictly declaring message2 as string]
console.log(message, message2);
// message = 1; // auto    [now we cannot make message as other datatype as aagadi string bhanye ra assign bhaisakyo]
// messge2 = true // error - type enforced


// Primitive types
let booleanVar: boolean = true;
let numberVar: number = 42;
let stringVar: string = "TypeScript";
let nullVar: null = null;
let undefinedVar: undefined = undefined;
let symbolVar: symbol = Symbol("unique");


// any and unknown types
let anyVar: any = '10';
anyVar = anyVar + 1;  // no error

let unknownVar: unknown = '10';
// unknownVar = unknownVAr + 1; // error
// any type can be used for any operation



// array/tuples
let scores: number[] = [90, 80, 70];
let userData: [string, number] = ["Alice", 30] // fixed length and types
// userData[0] = 1; // error

console.log(scores, userData)


// Union
let age: number | string = 25;
console.log(age)
age = "Thirty"
console.log(age)
// age = false // error


console.log("End of file");



// functions with types
function add(num1: number, num2: number): string{
    let sum: number = num1 + num2;
    return `Sum is ${sum}`;
}
let result: string = add(10, 20);
console.log(result);

const greet = (name: string = "Guest"): void => {
    console.log(`Hello, ${name}`);
}
greet(); // name optional    //[Hello, Guest]
greet('Bob');                //[Hello, Bob]
// greet(123); // error




// Object types - Defination and structures
// 1. Object iteratals
let person:{name:string, age: number};
person = {name: "Charlie", age: 20};
console.log(person.name)

//2. Interfaces  [=> a blueprint for the shape of an object, (when you are defining object structure )] 
//  [It describes what properties an object should have and their types.]
// [interface cannot directly define union, intersection. Interface can only intersect through extend and interface not for union.]
interface Product {
    id: number;
    name: string;
    price: number;
    description?: string; // optional
}
let product1: Product = { id: 1, name: "Laptop", price: 999.99};   // [id, name ra price are mandatory and description is optional]
console.log(product1)

// 3. Type Aliases  [=> Support intersection and union]
// [type also define the shape of an object but it can directly define union, intersection.]
type Student = {
    id: number;
    name: string;
    product?: Product; // optional
}
let student1: Student = {id: 101, name: "David"};
console.log(student1)



// Generics
// Datatype injection at runtime
// [Generics allow you to write a function, class, or type that works with multiple types, but still keeps type safety.]
function identity<T>(arg: T): T {    // [This is a generic type parameter.T acts like a placeholder for any type.]
    return arg;
}
let output1: string = identity<string>("Hello Generics");   
let output2: number = identity<number>(12345);
console.log(output1, output2);
// differes from any as it preserves type informaiton
// [union for few specific datatype, generic is for any datatype]
// [Eg:- let x: number | string; => here only number or string in union as x is provided with those datatypes]
// [Eg:- function identity<T>(arg: T): T { return arg; } => can have any datatypes as no specific is mentioned]
 



// Enum - named constants
//[Enums are used in TypeScript to make your code safer, clearer, and easier to maintain when dealing with a fixed set of related values.]
enum Direction {    //[Direction is enum type. ADMIN, USER, and GUEST are named constants.]
    ADMIN,  // in default - ADMIN = 0
    USER,   // default value 1
    GUEST  // default value 2
}
let userRole: Direction = Direction.USER;     // userRole is a variable of type Direction.
console.log(userRole);   // 1
console.log(Direction[userRole]);   // USER
// Compare usercase
console.log(userRole === Direction.USER)   // exact comparision
let usrRole: string = "USER";
console.log(usrRole == "User")   // inconsitent prone to typo and mistake

// Generic usecases with utility types
interface User{
    id: number;
    name: string;
    role: Direction;
}
let user1: User = {id: 1, name: "Eve", role: Direction.ADMIN};

let user2: Partial<User> = {id: 2};  // all properties optional
console.log(user2)

let user3: Readonly <User>={id:3, name: "Eve", role:Direction.GUEST};
// user3.name = "New Name";  // error- readonly
console.log(user3)




// Tasks
// Create enum for CarType: Sedan, SUV, Truck, Coupe
// create a type CarModel
// - name: string, description: string
// Create an interface for a Car with properties:
// make: string or number, model: CarModel,
// year: number,
// type: CarType, and
// isElectric(optional) boolean or number or string.
// create a array of cars with at least 3 car objects.
// filter the cars whose year is greater than 2025

enum CarType {
    Sedan,
    SUV,
    Truck,
    Coupe
}
type CarModel = {
    name: string;
    description: string;
}
interface Car{
    make: string | number;
    model: CarModel;
    year: number;
    type: CarType;
    isElectric?: boolean | number | string;
}
let cars: Car[] = [
    {
        make: "Toyota",
        model: {name: "Carry", description: "A comfortable sedan"},
        year: 2018,
        type: CarType.Sedan,
        isElectric: false
    }
]
// car.filter