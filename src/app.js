import React from 'react';
import { render } from 'react-dom';
import { Flux } from 'flumpt';

import CutStore from './cut-store';
import Result from './result';
import SizeInputs from './size-inputs';
import Csv from './csv';

class App extends Flux {
  render(state) {
    return (
      <div>
        <ul className="tabs" data-ks-tabs>
          <li className="open tab-input-tab">
            <a href="#tab-input">入力</a>
          </li>
          <li className="tab-csv-tab">
            <a href="#tab-csv">インポート/エクスポート</a>
          </li>
          <li className="tab-result-tab">
            <a href="#tab-result">計算結果</a>
          </li>
        </ul>

        <div className="tab_pane_container">
          <article id="tab-input">
            <SizeInputs {...state}/>
          </article>
          <article id="tab-csv">
            <Csv {...state}/>
          </article>
          <article id="tab-result">
            <Result {...state}/>
          </article>
        </div>
      </div>
    );
  }
  subscribe() {
    this.on('input:label:change', il => {
      this.update(state => ({
        ...state,
        store: state.store.updateLabelOf(il.id, il.label),
      }));
    });
    this.on('input:size:change', is => {
      this.update(state => ({
        ...state,
        store: state.store.updateSizeOf(is.id, is.size),
      }));
    });
    this.on('input:color:change', ic => {
      this.update(state => ({
        ...state,
        store: state.store.updateColorOf(ic.id, ic.color),
      }));
    });
    this.on('input:copy', id => {
      this.update(state => ({
        ...state,
        store: state.store.copy(id),
      }));
    });
    this.on('input:remove', id => {
      this.update(state => ({
        ...state,
        store: state.store.remove(id),
      }));
    });
    this.on('inputs:add', () => {
      this.update(state => ({
        ...state,
        store: state.store.addDefault(),
      }));
    });
    this.on('inputs:import', data => {
      this.update(state => ({
        ...state,
        store: state.store.import(data),
      }));
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
