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
    const data = store.all().toArray().map((cut) => ({
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
        <div className="form_group form_group-horizontal">
          <button onClick={this.read}>CSVを読み込む</button>
          <button onClick={this.write}>CSVを書き出す</button>
        </div>
      </div>
    );
  }
}
