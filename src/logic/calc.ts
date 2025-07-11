import type { Cut } from '../data/cut';
import { addCut, defaultLumber, type Lumber } from '../data/lumber';

// bin-packing algorithm to calculate lumbers from cuts
export function calc(cuts: Cut[]): Lumber[] {
  // stable sort by descending order
  cuts.sort((a, b) => {
    const ord = b.size - a.size;
    if (ord === 0) {
      return a.id - b.id;
    } else {
      return ord;
    }
  });
  const lumbers: Lumber[] = [];
  cuts.forEach((cut) => {
    const index = lumbers.findIndex((l) => l.rest >= cut.size);
    if (index >= 0) {
      // found
      lumbers[index] = addCut(lumbers[index], cut);
    } else {
      // not found
      const lumber = addCut(defaultLumber(), cut);
      lumbers.push(lumber);
    }
  });
  return lumbers;
}
