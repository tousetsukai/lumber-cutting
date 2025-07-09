import { lumberSize } from './constants';

const initialCut = (id) => ({
  label: '支柱' + id,
  size: lumberSize,
  color: {
    r: 240,
    g: 225,
    b: 170,
    a: 1,
  },
});

export default class CutStore {

  constructor() {
    this.cuts = []; // cuts: Array[Cut]
    this.nextId = 1; // 1 origin for high-school students :)
  }

  updateLabelOf(id, label) {
    this.cuts[id].label = label;
  }

  updateSizeOf(id, size) {
    this.cuts[id].size = size;
  }

  updateColorOf(id, color) {
    this.cuts[id].color = color;
  }

  remove(id) {
    delete this.cuts[id];
  }

  addDefault(num) {
    if (typeof num === 'undefined') {
      this.add(initialCut(this.nextId));
    } else {
      for (let i = 0; i < num; i++) {
        this.add(initialCut(this.nextId));
      }
    }
  }

  add(cut) {
    this.cuts[this.nextId] = cut;
    this.nextId = this.nextId + 1;
  }

  copy(id) {
    const cut = this.cuts[id];
    if (typeof cut !== 'undefined') {
      this.add({ ...cut });
    }
  }

  all() {
    return this.cuts.map((cut, id) => ({
      id,
      ...cut,
    }));
  }

  import(data) {
    this.cuts = [];
    data.forEach(cut => {
      this.add(cut);
    });
  }
}
