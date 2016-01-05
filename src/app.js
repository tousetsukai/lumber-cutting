import React from 'react';
import { render } from 'react-dom';
import { Flux } from 'flumpt';
import { List } from 'immutable';

import { SizeInput, SizeInputs } from './size-inputs';
import Result from './result';
import { lumberSize } from './constants';

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
    this.on('input:label:change', o => {
      this.update(state => {
        const newCuts = state.cuts.update(o.id, cut => ({
          ...cut,
          label: o.label,
        }));
        return {
          ...state,
          cuts: newCuts,
        };
      });
    });
    this.on('input:size:change', o => {
      this.update(state => {
        const newCuts = state.cuts.update(o.id, cut => ({
          ...cut,
          size: o.size,
        }));
        return {
          ...state,
          cuts: newCuts,
        };
      });
    });
    this.on('inputs:add', () => {
      this.update(state => {
        const id = state.inputs.count();
        const initial = {
          id: id,
          label: '',
          size: lumberSize,
        };
        const newInputs = state.inputs.push(
          <SizeInput key={id} {...initial}/>
        );
        const newCuts = state.cuts.push(initial);
        return {
          ...state,
          inputs: newInputs,
          cuts: newCuts,
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
    cuts: List(),
    inputs: List(),
  },
  middlewares: [],
});
