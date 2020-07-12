type GetObjectKeysThatAreAssignableToPropertyType<
  O extends Record<string | number | symbol, any>,
  PropertyType
> = {
  [K in keyof O]: O[K] extends PropertyType ? K : never;
}[keyof O];

// USAGE EXAMPLE
// =============

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// %inferred-type: "name" | "email"
type Result = GetObjectKeysThatAreAssignableToPropertyType<User, string>;
