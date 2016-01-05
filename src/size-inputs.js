import React from 'react';
import { Component } from 'flumpt';

class SizeInput extends Component {
  onLabelChange = (e) => {
    this.dispatch('input:label:change', { id: this.props.id, label: e.target.value });
  }
  onSizeChange = (e) => {
    this.dispatch('input:size:change', { id: this.props.id, size: e.target.value });
  }
  copy = () => {
    this.dispatch('input:copy', this.props.id);
  }
  remove = () => {
    this.dispatch('input:remove', this.props.id);
  }
  render() {
    const { label, size } = this.props;
    return (
      <div className="form_group form_group-horizontal">
        <label>名前</label>
        <input type="text" value={label} onChange={this.onLabelChange}/>
        <label>長さ(mm)</label>
        <input type="number" value={size} min={10} max={3650} onChange={this.onSizeChange}/>
        <button onClick={this.copy}>コピー</button>
        <button onClick={this.remove}>x</button>
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
