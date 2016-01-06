import React from 'react';
import { render } from 'react-dom';
import { Flux, Component } from 'flumpt';

import CutStore from './cut-store';
import Result from './result';
import SizeInputs from './size-inputs';
import Csv from './csv';

class Tabs extends Component {

  open = (kind) => () => {
    this.dispatch('tabs:open', kind);
  }

  render() {
    const { state } = this.props;
    return (
      <div>
        <ul className="tabs" data-ks-tabs>
          <li className="open tab-input-tab">
            <a href="#tab-input" onClick={this.open('input')}>入力</a>
          </li>
          <li className="tab-csv-tab">
            <a href="#tab-csv" onClick={this.open('csv')}>インポート/エクスポート</a>
          </li>
          <li className="tab-result-tab">
            <a href="#tab-result" onClick={this.open('result')}>計算結果</a>
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
}

class App extends Flux {
  render(state) {
    return <Tabs state={state}/>;
  }
  subscribe() {
    this.on('tabs:open', kind => {
      this.update(state => ({
        ...state,
        tab: kind,
      }));
    });
    this.on('input:label:change', il => {
      this.update(state => {
        state.store.updateLabelOf(il.id, il.label);
        return state;
      });
    });
    this.on('input:size:change', is => {
      this.update(state => {
        state.store.updateSizeOf(is.id, is.size);
        return state;
      });
    });
    this.on('input:color:change', ic => {
      this.update(state => {
        state.store.updateColorOf(ic.id, ic.color);
        return state;
      });
    });
    this.on('input:copy', id => {
      this.update(state => {
        state.store.copy(id);
        return state;
      });
    });
    this.on('input:remove', id => {
      this.update(state => {
        state.store.remove(id);
        return state;
      });
    });
    this.on('inputs:add', () => {
      this.update(state => {
        state.store.addDefault();
        return state;
      });
    });
    this.on('inputs:import', data => {
      this.update(state => {
        state.store.import(data);
        window.k$.status({
          text: 'インポートが完了しました',
          type: 'status-green',
        });
        return state;
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
    tab: 'input',
  },
  middlewares: [],
});
