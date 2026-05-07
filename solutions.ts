//Solution to Problem 1:
const filterEvenNumbers = (inputArr: number[]): number[] => {
  return inputArr.filter((num) => num % 2 === 0);
};

//Solution to Problem 2:
const reverseString = (input: string): string => {
  return input.split("").reverse().join("");
};

//Solution to Problem 3:
type StringOrNumber = string | number;

const checkType = (input: StringOrNumber): "String" | "Number" => {
  if (typeof input === "string") {
    return "String";
  }
  return "Number";
};

//Solution to Problem 4:
const getProperty = <T, K extends keyof T>(obj: T, key: K): T[K] => {
  return obj[key];
};

//Solution to Problem 5:
interface Book {
  title: string;
  author: string;
  publishedYear: number;
}

interface Updated extends Book {
  isRead: boolean;
}

const toggleReadStatus = (obj: Book): Updated => {
  return { ...obj, isRead: true };
};

//Solution to Problem 6:
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

class Student extends Person {
  grade: string;
  constructor(name: string, age: number, grade: string) {
    super(name, age);
    this.grade = grade;
  }

  getDetails(): string {
    return `Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`;
  }
}

//Solution to Problem 7:
const getIntersection = (a: number[], b: number[]): number[] => {
  const setA = new Set(a);
  const setB = new Set(b);
  const result: number[] = [];

  for (const element of setB) {
    if (setA.has(element)) result.push(element);
  }

  return result;
};
