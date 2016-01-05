import React from 'react';
import { Component } from 'flumpt';

class SizeInput extends Component {
  onLabelChange = (e) => {
    this.dispatch('input:label:change', { id: this.props.id, label: e.target.value });
  }
  onSizeChange = (e) => {
    this.dispatch('input:size:change', { id: this.props.id, size: e.target.value });
  }
  render() {
    const { label, size } = this.props;
    return (
      <div>
        label:
        <input type="text" value={label} onChange={this.onLabelChange}/>
        size:
        <input type="number" value={size} min={10} max={3650} onChange={this.onSizeChange}/>
      </div>
    );
  }
}

export default class SizeInputs extends Component {
  addInput = () => {
    this.dispatch('inputs:add');
  }
  render() {
    return (
      <div>
        {this.props.store.all().map(cut => (
           <SizeInput key={cut.id} {...cut}/>
        ))}
        <button onClick={this.addInput}>カットの追加</button>
      </div>
    );
  }
}
