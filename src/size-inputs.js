import React from 'react';
import { Component } from 'flumpt';

export class SizeInput extends Component {
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
        <input type="text" defaultValue={label} onChange={this.onLabelChange}/>
        size:
        <input type="number" defaultValue={size} onChange={this.onSizeChange}/>
      </div>
    );
  }
}

export class SizeInputs extends Component {
  addInput = () => {
    this.dispatch('inputs:add');
  }
  render() {
    return (
      <div>
        {this.props.inputs}
        <button onClick={this.addInput}>カットの追加</button>
      </div>
    );
  }
}
