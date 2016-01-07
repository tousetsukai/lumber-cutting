import { lumberSize } from './constants';

const initial = (cut) => ({
  rest: lumberSize - cut.size,
  cuts: [cut],
});

const addCut = (lumber, cut) => {
  lumber.rest = lumber.rest - cut.size;
  lumber.cuts.push(cut);
};

// : Array[{ id: number, label: string, size: number, ...rest }] ->
//   Array[{ rest: number, cuts: Array[{ id: number, label: string, size: number, ...rest }]}]
export default function (cuts) {
  // stable sort by descending order
  cuts.sort((a, b) => {
    const ord = b.size - a.size;
    if (ord === 0) {
      return a.id - b.id;
    } else {
      return ord;
    }
  });
  const lumbers = [];
  cuts.forEach(cut => {
    const index = lumbers.findIndex(a => (a.rest >= cut.size));
    if (index >= 0) { // found
      addCut(lumbers[index], cut);
    } else { // not found
      lumbers.push(initial(cut));
    }
  });
  return lumbers;
}
