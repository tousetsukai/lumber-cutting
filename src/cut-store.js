import { OrderedMap } from 'immutable';

import { lumberSize } from './constants';

const initialCut = {
  label: '',
  size: lumberSize,
};

export default class CutStore {

  constructor() {
    this.cuts = OrderedMap(); // cuts: OrderedMap[number, Cut]
    this.nextId = 0;
  }

  updateLabel(id, label) {
    this.cuts = this.cuts.update(id, cut => ({
      ...cut,
      label,
    }));
    return this;
  }

  updateSize(id, size) {
    this.cuts = this.cuts.update(id, cut => ({
      ...cut,
      size,
    }));
    return this;
  }

  remove(id) {
    this.cuts = this.cuts.delete(id);
    return this;
  }

  add() {
    this.cuts = this.cuts.set(this.nextId, initialCut);
    this.nextId = this.nextId + 1;
    return this;
  }

  copy(id) {
    const cut = this.cuts.get(id);
    if (typeof cut !== 'undefined') {
      this.cuts.set(this.nextId, cut);
      this.nextId = this.nextId + 1;
    }
    return this;
  }

  all() {
    return this.cuts.entrySeq().map((kv) => ({
      id: kv[0],
      label: kv[1].label,
      size: kv[1].size,
    }));
  }
}
