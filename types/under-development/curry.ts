// USAGE EXAMPLE
// =============

const sum = (a: number, b: number, c: number) => a + b + c;
const curriedSum = curry(sum);
void curriedSum;

// type Inferred = (
//   | (a: number, b: number, c: number, d: number) => number)
//   | ((a: number, b: number, c: number) => (args_0: number) => number)
//   | ((a: number, b: number) => ((args_0: number, args_1: number) => number)
//   | ((args_0: number) => (args_0: number) => number)) | ((a: number) => ((args_0: number, args_1: number, args_2: number) => number) | ... 1 more ... | ((args_0: number) => ((args_0: number, args_1: number) => number) | ((args_0: number) => (args_0: number) => number)))

const r1 = curriedSum(1)(2)(3);
const r2 = curriedSum(1, 2)(3);
const r3 = curriedSum(1, 2, 3);
const r4 = curriedSum(1)(2, 3);

// CURRY IMPLEMENTATION AND ITS TYPES
// ==================================

const ANY: any = {};

function curry<F extends Fn>(fn: F): Curry<F> {
  return ANY;
}

type Curry<F extends Fn> = PrivateCurry<F>;

type PrivateCurry<
  FunctionToCurry extends Fn,
  Params extends any = CurryTuple<Parameters<FunctionToCurry>>,
  ReturnT = ReturnType<FunctionToCurry>
> = Params extends [infer Fst, infer Snd]
  ? Fst extends unknown[]
    ? Snd extends unknown[]
      ? IsEmptyTuple<Snd> extends true
        ? (...params: Fst) => ReturnT
        : (...params: Fst) => Curry<(...params: Snd) => ReturnT>
      : never
    : never
  : never;

// IsEmptyTuple<Snd> extends true
//       ? (...args: Fst) => ReturnT
//       : (...args: Fst) => Curry<(...args: Snd) => ReturnT>

// HELPER TYPES
// ============

type Fn = (...params: any[]) => any;

type IsEmptyTuple<T> = T extends [] ? true : false;

type Pair = any[];
type Fst<T extends Pair> = T extends [infer F, unknown] ? F : never;
type Snd<T extends Pair> = T extends [unknown, infer S] ? S : never;

// prettier-ignore
type PopTupleWithRest<T extends unknown[]> = T extends []
  ? [T, never]
  : T extends [...infer Init, infer Removed]
  ? [Init, Removed]
  : [never, never];

type CurryTuple<T extends unknown[]> = PrivateCurryTuple<T, never, []>;

/**
 * @private
 */
type PrivateCurryTuple<
  Curr extends unknown[],
  PairAcc extends Pair[],
  RemovedAcc extends unknown[],
  CurrPair extends Pair = [Curr, RemovedAcc],
  CurrPoppedPair extends Pair = PopTupleWithRest<Curr>
> = (IsEmptyTuple<Curr> extends true
  ? [PairAcc]
  : [
      PairAcc,
      PrivateCurryTuple<
        Fst<CurrPoppedPair>,
        CurrPair,
        [Snd<CurrPoppedPair>, ...RemovedAcc]
      >
    ])[number];
