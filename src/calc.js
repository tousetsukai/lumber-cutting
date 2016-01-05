import { lumberSize } from './constants';
import { List } from 'immutable';

const initial = {
  rest: lumberSize,
  cuts: List(), // Array[{ label: string, size: number }]
};

const addCut = (lumber, cut) => {
  return {
    rest: lumber.rest - cut.size,
    cuts: lumber.cuts.push(cut),
  };
};

// : Array[{ label: string, size: number }] -> Array[{ rest: number, cuts: Array[{ label: string, size: number }]}]
export default function (cuts) {
  // sort by descending order
  const sorted = cuts.sort((a, b) => (b.size - a.size));
  // lumbers: Array[{ rest: number, cuts: Array[{ label: string, size: number }]}]
  return sorted.reduce((lumbers, cut) => {
    const index = lumbers.findIndex(a => (a.rest >= cut.size));
    if (index >= 0) { // found
      return lumbers.update(index, lumber => addCut(lumber, cut));
    } else { // not found
      return lumbers.push(addCut(initial, cut));
    }
  }, List());
}
