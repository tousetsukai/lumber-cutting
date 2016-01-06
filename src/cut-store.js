import { lumberSize } from './constants';

const initialCut = (id) => ({
  id: id,
  label: '木材' + id,
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
    this.cuts.forEach(cut => {
      if (cut.id === id) {
        cut.label = label;
      }
    });
  }

  updateSizeOf(id, size) {
    this.cuts.forEach(cut => {
      if (cut.id === id) {
        cut.size = size;
      }
    });
  }

  updateColorOf(id, color) {
    this.cuts.forEach(cut => {
      if (cut.id === id) {
        cut.color = color;
      }
    });
  }

  remove(id) {
    const index = this.cuts.findIndex(cut => cut.id === id);
    if (index >= 0) {
      this.cuts.splice(index, 1);
    }
  }

  addDefault() {
    this.add(initialCut(this.nextId));
  }

  add(cut) {
    this.cuts.push(cut);
    this.nextId = this.nextId + 1;
  }

  copy(id) {
    const cut = this.cuts.find(cut => cut.id === id);
    if (typeof cut !== 'undefined') {
      this.add({
        ...cut,
        id: this.nextId,
      });
    }
  }

  all() {
    return this.cuts;
  }

  import(data) {
    this.cuts = [];
    data.forEach(cut => {
      this.add({
        ...cut,
        id: this.nextId,
      });
    });
  }
}
