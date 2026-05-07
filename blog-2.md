# TypeScript: Using `Pick` and `Omit` Utility Types to Keep the Code DRY

## Introduction

When working on large applications, we often need multiple variations of the same interface or type. Writing those types manually can lead to duplicated code and make maintenance harder.

To solve this problem, TypeScript provides us with utility types like `Pick` and `Omit`. These utility types allow us to create smaller versions of existing interfaces without rewriting properties manually, helping keep the code clean, reusable, and DRY (Don't Repeat Yourself).

In this article we will be discussing these two utility types and understand how they keep the code DRY (Don't Repeat Yourself).

### 1. `Pick`

This utility type constructs a type from the keys provided into the 2nd parameter of the type. The syntax of `Pick` looks like: `Pick<Type, Keys>`.

Let us understand this with an example:

```tsx
interface Company {
  name: string;
  address: string;
  establishedAt: number;
  desc: string;
  employees: Employee[];
}

type CompanyInfo = Pick<Company, "name" | "address" | "establishedAt" | "desc">;
```

After this we now have a new type named `CompanyInfo` having only the selected properties from `Company`:

```tsx
/*
CompanyInfo is now like the followings:
type CompanyInfo = {
    name: string;
    address: string;
}
*/

//And the type is ready to use:

const info: CompanyInfo = {
  name: "ABC.corp",
  address: "123 Maplewood Avenue",
  establishedAt: 2000,
  desc: "Company",
};
```

### 2. `Omit`

This utility type constructs a type by removing the keys provided into the 2nd parameter of the type from the . The syntax of `Omit` looks like: `Omit<Type, Keys>`.
It is the opposite of `Pick`. Lets see an example:

```tsx
interface Company {
  name: string;
  address: string;
  establishedAt: number;
  desc: string;
  employees: Employee[];
}

type CompanyInfo = Omit<Company, "employees">;

const info: CompanyInfo = {
  name: "ABC.corp",
  address: "123 Maplewood Avenue",
  establishedAt: 2000,
  desc: "Company",
};
```

Here the new type `CompanyInfo` is created by removing the `employees` from the type `Company`.

Now the interesting part, if we have noticed it then we can see that using `Pick` and `Omit` we are actually slicing the main interface and creating a new type. Therefore we didn't have to define the new type manually. If we didn't use the utility types then our code would have looked like:

```tsx
interface Company {
  name: string;
  address: string;
  establishedAt: number;
  desc: string;
  employees: Employee[];
}

type CompanyInfo = {
  name: string;
  address: string;
  establishedAt: number;
  desc: string;
};
```

We had to repeat the same thing again without the `employees` property.

Therefore using the **Utility Types** `Pick` and `Omit`, we saved ourselves from duplicating our code and we kept our code DRY (Don't Repeat Yourself). It helps to maintain our code easily.

## Conclusion

The `Pick` and `Omit` utility types are very powerful tools for creating specialized versions of existing interfaces without duplicating code. `Pick` allows us to select only the properties we need, on the other hand `Omit` removes the properties that aren't needed from a type.

By using these utility types, we can maintain a single source of truth for our interfaces, improve code readability, and follow the DRY (Don't Repeat Yourself) principle more effectively.
