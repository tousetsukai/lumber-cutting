import React from 'react';
import { render } from 'react-dom';
import { Flux } from 'flumpt';

import CutStore from './cut-store';
import Result from './result';
import SizeInputs from './size-inputs';

class App extends Flux {
  render(state) {
    return (
      <div>
        <SizeInputs {...state}/>
        <Result {...state}/>
      </div>
    );
  }
  subscribe() {
    this.on('input:label:change', il => {
      this.update(state => {
        return {
          ...state,
          store: state.store.updateLabel(il.id, il.label),
        };
      });
    });
    this.on('input:size:change', is => {
      this.update(state => {
        return {
          ...state,
          store: state.store.updateSize(is.id, is.size),
        };
      });
    });
    this.on('inputs:add', () => {
      this.update(state => {
        return {
          ...state,
          store: state.store.add(),
        };
      });
    });
  }
}

export default new App({
  renderer: (el) => {
    render(el, document.getElementById('app'));
  },
  initialState: {
    store: new CutStore(),
  },
  middlewares: [],
});
