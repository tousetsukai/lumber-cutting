import { lumberSize } from './constants';

const initial = (cut) => ({
  rest: lumberSize - cut.size,
  cuts: [cut],
});

const addCut = (lumber, cut) => {
  lumber.rest = lumber.rest - cut.size;
  lumber.cuts.push(cut);
};

// : List[{ label: string, size: number }] -> Array[{ rest: number, cuts: Array[{ label: string, size: number }]}]
export default function (cuts) {
  // sort by descending order
  const sorted = cuts.sort((a, b) => (b.size - a.size));
  // lumbers: Array[{ rest: number, cuts: Array[{ label: string, size: number }]}]
  const lumbers = [];
  sorted.forEach(cut => {
    const index = lumbers.findIndex(a => (a.rest >= cut.size));
    if (index >= 0) { // found
      addCut(lumbers[index], cut);
    } else { // not found
      lumbers.push(initial(cut));
    }
  });
  return lumbers;
}
