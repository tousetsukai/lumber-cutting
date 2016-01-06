import React from 'react';
import { Component } from 'flumpt';
import ColorPicker from 'react-color';

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
    this.dispatch('input:color:change', { id: this.props.id, color: color.rgb });
  }
  openColorPicker = () => {
    this.setState({ displayColorPicker: true });
  }
  onCloseColorPicker = () => {
    this.setState({ displayColorPicker: false });
  }
  copy = () => {
    this.dispatch('input:copy', this.props.id);
  }
  remove = () => {
    this.dispatch('input:remove', this.props.id);
  }
  render() {
    const { label, size, color } = this.props;
    console.log(this.props.id, this.state.displayColorPicker);
    return (
      <div className="size-input form_group form_group-horizontal">
        <label>名前</label>
        <input type="text" value={label} onChange={this.onLabelChange}/>
        <label>長さ(mm)</label>
        <input type="number" value={size} min={10} max={3650} onChange={this.onSizeChange}/>
        <button onClick={this.openColorPicker}>色</button>
        <ColorPicker display={this.state.displayColorPicker}
                     onChangeComplete={this.onColorChange}
                     onClose={this.onCloseColorPicker}
                     color={color}
                     positionCSS={{
                       position: 'absolute',
                       top: '50px',
                       left: '350px',
                     }}
                     type="sketch"/>
        <div style={{backgroundColor: `rgba(${color.r},${color.g},${color.b},${color.a})`}} className="color"/>
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
