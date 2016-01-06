import React from 'react';
import { Component } from 'flumpt';

import calc from './calc';
import { lumberSize } from './constants';

class Lumber extends Component {
  render() {
    const { cuts } = this.props;
    const cutStyles = (cut) => ({
      width: `${cut.size / lumberSize * 100}%`,
      backgroundColor: `rgba(${cut.color.r},${cut.color.g},${cut.color.b},${cut.color.a})`,
    });
    return (
      <div className="lumber-wrapper">
        <p className="lumber-info">
          {cuts.map((cut, i) => (
             <span key={i} className="cut">{cut.label}<span className="size">{cut.size}</span></span>
          ))}</p>
        <div className="lumber">
          {cuts.map((cut, i) => (
             <div key={i} style={cutStyles(cut)} className="cut">
               {cut.label}
               <span className="size">{cut.size}</span>
             </div>)
           )}
        </div>
      </div>
    );
  }
}

export default class Result extends Component {
  render = () => {
    const { store } = this.props;
    const lumbers = calc(store.all());
    return (
      <ol className="result">
        {lumbers.map((lumber, i) => (<li key={i}><Lumber {...lumber}/></li>))}
      </ol>
    );
  }
}
