import { lumberSize } from '../constants';
import type { Cut } from './cut';

export type Lumber = {
  rest: number;
  cuts: Cut[];
};

export function defaultLumber(): Lumber {
  return {
    rest: lumberSize,
    cuts: [],
  };
}

export function addCut(lumber: Lumber, cut: Cut): Lumber {
  if (cut.size > lumber.rest) {
    throw new Error('Cut size exceeds lumber size');
  }
  return {
    rest: lumber.rest - cut.size,
    cuts: [...lumber.cuts, cut],
  };
}
