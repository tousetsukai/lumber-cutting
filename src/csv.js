import React from 'react';
import { Component } from 'flumpt';
import parse from 'csv-parse';
import stringify from 'csv-stringify';

export default class Csv extends Component {

  state = {
    opened: false,
  }

  read = () => {
    const text = document.getElementById('csv-area').value;
    const options = {
      columns: true,
    };
    parse(text, options, (err, data) => {
      if (err) {
        console.error(err); // eslint-disable-line no-console
      } else {
        this.dispatch('inputs:import', data.map(cut => ({
          ...cut,
          color: {
            r: cut.r * 1,
            g: cut.g * 1,
            b: cut.b * 1,
            a: cut.a * 1,
          },
        })));
      }
    });
  }

  write = () => {
    const { store } = this.props;
    const data = store.all().map((cut) => ({
      label: cut.label,
      size: cut.size,
      r: cut.color.r,
      g: cut.color.g,
      b: cut.color.b,
      a: cut.color.a,
    }));
    const options = {
      header: true,
    };
    stringify(data, options, (err, out) => {
      if (err) {
        console.error(err); // eslint-disable-line no-console
      } else {
        document.getElementById('csv-area').value = out;
      }
    });
  }

  render() {
    return (
      <div>
        <textarea id="csv-area" className="csv-area"/>
        <div className="csv-buttons form_group form_group-horizontal">
          <button data-ks-tooltip="カット情報を読み込みます"
                  data-ks-tooltip-position="bottom"
                  onClick={this.read}>インポート</button>
          <button data-ks-tooltip="入力されたカット情報を書き出します。コピーして保存してください"
                  data-ks-tooltip-position="bottom"
                  onClick={this.write}>エクスポート</button>
        </div>
      </div>
    );
  }
}
