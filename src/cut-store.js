import { OrderedMap } from 'immutable';

import { lumberSize } from './constants';

const initialCut = (id) => ({
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
    this.cuts = OrderedMap(); // cuts: OrderedMap[number, Cut]
    this.nextId = 1; // 1 origin for high-school students :)
  }

  updateLabelOf(id, label) {
    this.cuts = this.cuts.update(id, cut => ({
      ...cut,
      label,
    }));
    return this;
  }

  updateSizeOf(id, size) {
    this.cuts = this.cuts.update(id, cut => ({
      ...cut,
      size,
    }));
    return this;
  }

  updateColorOf(id, color) {
    this.cuts = this.cuts.update(id, cut => ({
      ...cut,
      color,
    }));
    return this;
  }

  remove(id) {
    this.cuts = this.cuts.delete(id);
    return this;
  }

  addDefault() {
    return this.add(initialCut(this.nextId));
  }

  add(cut) {
    this.cuts = this.cuts.set(this.nextId, cut);
    this.nextId = this.nextId + 1;
    return this;
  }

  copy(id) {
    const cut = this.cuts.get(id);
    if (typeof cut !== 'undefined') {
      this.cuts = this.cuts.set(this.nextId, cut);
      this.nextId = this.nextId + 1;
    }
    return this;
  }

  all() {
    return this.cuts.entrySeq().map((kv) => ({
      id: kv[0],
      ...kv[1],
    }));
  }

  import(data) {
    return data.reduce((store, cut) => {
      return store.add(cut);
    }, this);
  }
}
