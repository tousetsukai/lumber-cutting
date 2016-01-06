import React from 'react';
import { Component } from 'flumpt';

class SizeInput extends Component {
  state = {
    displayColorPicker: false,
  }
  onLabelChange = (e) => {
    this.dispatch('input:label:change', { id: this.props.id, label: e.target.value });
  }
  onSizeChange = (e) => {
    this.dispatch('input:size:change', { id: this.props.id, size: e.target.value });
  }
  onColorChange = (color) => {
    this.dispatch('input:color:change', { id: this.props.id, color: color });
  }
  pickColor = () => {
    this.setState({ displayColorPicker: true });
  }
  copy = () => {
    this.dispatch('input:copy', this.props.id);
  }
  remove = () => {
    this.dispatch('input:remove', this.props.id);
  }
  render() {
    const { label, size, color } = this.props;
    const { rgb } = color;
    return (
      <div className="size-input form_group form_group-horizontal">
        <label>名前</label>
        <input type="text" value={label} onChange={this.onLabelChange}/>
        <label>長さ(mm)</label>
        <input type="number" value={size} min={10} max={3650} onChange={this.onSizeChange}/>
        <button onClick={this.pickColor}>色</button>
        <div style={{backgroundColor: `rgba(${rgb.r},${rgb.b},${rgb.g},${rgb.a})`}} className="color"/>
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
