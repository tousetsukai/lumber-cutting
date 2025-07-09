import React from 'react';
import { Component } from 'flumpt';
import parse from 'csv-parse';
import stringify from 'csv-stringify';

import { lumberSize } from './constants';

export default class Csv extends Component {

  read = () => {
    const text = document.getElementById('csv-import-area').value;
    const options = {
      columns: true,
    };
    parse(text, options, (err, data) => {
      if (err) {
        console.error(err); // eslint-disable-line no-console
      } else {
        this.dispatch('inputs:import', data.map((cut, id) => ({
          label: cut.label || ('支柱' + id),
          size: cut.size || lumberSize,
          color: {
            r: (cut.r || 240) * 1,
            g: (cut.g || 225) * 1,
            b: (cut.b || 170) * 1,
            a: (cut.a || 1) * 1,
          },
        })));
      }
    });
  }

  componentWillUpdate = (nextProps) => {
    const { store } = nextProps;
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
        document.getElementById('csv-export-area').value = out;
      }
    });
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.tab === 'csv';
  }

  render() {
    return (
      <div>
        <div className="csv-area-wrapper">
          <p>
            保存したデータを貼り付けて読み込むことができます。データ形式はCSVです (Excelなどで作成する場合はヘッダーを label, size, r, g, b, a としてください)。
          </p>
          <textarea id="csv-import-area" className="csv-area"/>
          <div className="csv-buttons">
            <button data-ks-tooltip="データを読み込み、現在のデータを上書きします"
                    data-ks-tooltip-position="bottom"
                    onClick={this.read}>読み込む</button>
          </div>
        </div>
        <hr/>
        <div className="csv-area-wrapper">
          <p>
            現在の入力データです。コピーして保存してください。
          </p>
          <textarea id="csv-export-area" className="csv-area" readOnly/>
        </div>
      </div>
    );
  }
}
