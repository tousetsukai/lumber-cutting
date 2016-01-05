import React from 'react';
import { Component } from 'flumpt';

import calc from './calc';

class Lumber extends Component {
  render() {
    const { cuts } = this.props;
    return (
      <div style={{ width: '1000px', height: '20px', display: 'flex', backgroundColor: '#999999' }}>
        {cuts.map((cut, i) => (<div key={i}>[{cut.label}:{cut.size}]</div>))}
      </div>
    );
  }
}

export default class Result extends Component {
  render = () => {
    const { store } = this.props;
    const lumbers = calc(store.all());
    return (
      <div>
        {lumbers.map((lumber, i) => (<Lumber key={i} {...lumber}/>))}
      </div>
    );
  }
}
