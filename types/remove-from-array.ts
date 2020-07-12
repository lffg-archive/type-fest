type RemoveFromArray<A extends unknown[], T> = A extends (infer Member)[]
  ? Exclude<Member, T>[]
  : never;

// %inferred-type: string[]
type Result1 = RemoveFromArray<Array<string | number>, number>;

// %inferred-type: (number | symbol)[]
type Result2 = RemoveFromArray<[symbol, string, number], string>;
