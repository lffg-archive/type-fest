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

type CurryTuple<T extends unknown[]> = PrivateCurryTuple<T, never, []>;

type Result = CurryTuple<[1, 2, 3, 4]>;

// Result is:

type InferredResultType =
  | [[1, 2, 3, 4], []]
  | [[1, 2, 3], [4]]
  | [[1, 2], [3, 4]]
  | [[1], [2, 3, 4]];
