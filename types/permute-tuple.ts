type IsEmptyTuple<T> = T extends [] ? true : false;

// prettier-ignore
type PopTuple<T extends unknown[], Default = []> = T extends []
  ? Default
  : T extends [...infer U, unknown]
  ? U
  : Default;

type PermuteTuple<
  T extends unknown[],
  Acc extends unknown[] = []
> = (IsEmptyTuple<T> extends true
  ? [Acc]
  : [Acc, PermuteTuple<PopTuple<T>, T>])[number];

// %inferred-type: [] | [1, 2, 3] | [1, 2] | [1]
type Result = PermuteTuple<[1, 2, 3]>;
