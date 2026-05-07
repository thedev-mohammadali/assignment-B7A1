# TypeScript: Understanding `any`, `unknown`, and Type Narrowing

## Introduction

TypeScript provides a powerful type system that helps us write safer and more maintainable code. Among all the types, the `any` and `unknown` types are often discussed because they both allow us to use any type of value but they behave differently.

In this article, we will try to explore why `any` is considered a "type safety hole," why `unknown` is the safer alternative for unpredictable data, and how type narrowing helps TypeScript safely determine the correct type of a value before performing any operations on it.

## TypeScript Types (`any` & `unknown`)

### Type: `any`

`any` is a special type in TypeScript that can be used whenever we don't want a particular value to cause typechecking errors.

With the type `any` assigned to a value, we can access any **properties** of it. We can use any legal syntax when using this type. For example:

```tsx
let myObj: any = { x: 0 };

myObj.start();
myObj();
myObj = "Hi";
```

Notice how that code doesn't throw any compiler error. It is because TypeScript is convinced that we are correct or we are sure of the type has the properties we are trying to access. It is useful when we don't want to type a **'long type'** just to let TypeScript know that the code is correct.

### Type: `unknown`

`unknown` is another type in TypeScript which can come in handy in many cases. Like whenever we are not sure of a type that a variable can have or receive then we can assign that variable a type of `unknown`. It can represent any value. For example:

```tsx
function safeParse(s: string): unknown {
  return JSON.parse(s);
}
```

In the above example we are not sure what the returned type will be. It can be anything. So we cannot just use any properites or method on the returned value. TypeScript considers the value to be not trustworthy till we perform a type check.

### Why `any` Is Dangerous and `unknown` Is Safer in TypeScript:

If we understand correctly then we can see that both the types are pretty much similar. But `unknown` is a safer choice when handling values that can have any type that we cannot know at the time of declaring a value or receiving some value from a source.

Now the question arises:
_Why is `any` labeled a "type safety hole," and why is `unknown` the safer choice for handling **unpredictable** data?_

Let us think of an example:

```tsx
let myObj: any = { x: 0 };

myObj.start();
myObj();
myObj.toUpperCase();
//No compiler errors for the above code.

let nextObj: unknown = { x: 0 };

nextObj.value;
nextObj();
nextObj.toUpperCase();
// Compiler Error: 'nextObj' is of type 'unknown'
```

So whenever we are using the type `any`, we are not getting any error message even though the value doesn't support the methods or properties it is being called upon. It is relying on us to be sure about the behaviour whether the operation is possible or not. But with `unknown`, whenever we try to do any operations on it, it will simply give an error. That is what makes it safer than using `any`. Another example:

```tsx
let myStr: unknown = "Hello";

console.log(myStr.toUpperCase());
//Error: 'myStr' is of type 'unknown'

const transform = (value: string) => {
  console.log(value.toUpperCase());
};

if (typeof myStr === "string") {
  transform(myStr);
}
//No Error here after safety check
```

That is the beauty of using `unknown`. When using `unknown` TypeScript asks us to verify the value first then we can operate on it and for `any` TypeScript trusts us when using any operation on the value.

This is why `any` is labeled as "type safety hole" and `unknown` is safer to use for unpredictable values.

---

## Type Narrowing

Type narrowing is one of the most important concepts of TypeScript. It helps to narrow down a type of a value so that we can't do any operations that may result in error.

Let us give an example:

```tsx
const doSomething1 = (value: string | number) => {
  return value.toUpperCase();
  //Property 'toUpperCase' does not exist on type 'string | number'.
  //Property 'toUpperCase' does not exist on type 'number'.
};
```

Notice how the compiler giving us an error as the value could be either **string** or a **number** and the property 'toUpperCase' isn't available for **number** type.

Now, let's see how we can fix this:

```tsx
const doSomething2 = (value: string | number) => {
  if (typeof value === "string") {
    return value.toLowerCase();
  }
  return value.toFixed(2);
};
```

In the above code, TypeScript is sure that in the **if-block** value will have the type **string**. And it narrows down the other possibility in the next return statement, it automatically detects that the other one will must be of type **number**.

There are multiple ways of type narrowing:

- `typeof` type guards
- Truthiness narrowing
- Equality narrowing
- The `in` operator narrowing
- `instanceof` narrowing
- Type predicates
- The `never` type

In short, type narrowing helps TypeScript to narrow down to a specific type so that our code can be error free and safe.

## Conclusion

Both `any` and `unknown` can have values of any type, but they have very different purposes.`any` disables type checking and can lead to unsafe code, on the other hand `unknown` forces us to validate the data before using it, which helps to write safe code.

Type narrowing improves type safety by allowing TypeScript to smartly determine more specific types through checks like `typeof`, `instanceof`, and other type guards. Together, these features help us write cleaner, safer, reliable and more maintainable TypeScript code.
