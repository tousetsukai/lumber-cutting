import React from 'react';
import { render } from 'react-dom';
import { Flux, Component } from 'flumpt';

class SizeInput extends Component {
  onLabelChange = (e) => {
    this.dispatch('input:label:change', { id: this.props.id, label: e.target.value });
  }
  onSizeChange = (e) => {
    this.dispatch('input:size:change', { id: this.props.id, size: e.target.value });
  }
  render() {
    return (
      <div>
        label:
        <input type="text" onChange={this.onLabelChange}/>
        size:
        <input type="number" onChange={this.onSizeChange}/>
      </div>
    );
  }
}

class SizeInputs extends Component {
  addInput = () => {
    console.log('click');
    this.dispatch('inputs:add');
  }
  render() {
    return (
      <div>
        {this.props.inputs}
        <button onClick={this.addInput}>木材の追加</button>
      </div>
    );
  }
}

class Result extends Component {
  render = () => {
    return (
      <p>{JSON.stringify(this.props)}</p>
    );
  }
}

class App extends Flux {
  render(state) {
    return (
      <div>
        <SizeInputs {...state}/>
        <Result {...state}/>
      </div>
    );
  }
  subscribe() {
    this.on('input:label:change', o => {
      this.update(state => {
        const newLumbers = state.lumbers.map(lumber => {
          if (lumber.id === o.id) {
            return {
              ...lumber,
              label: o.label,
            };
          } else {
            return lumber;
          }
        });
        return {
          ...state,
          lumbers: newLumbers,
        };
      });
    });
    this.on('input:size:change', o => {
      this.update(state => {
        const newLumbers = state.lumbers.map(lumber => {
          if (lumber.id === o.id) {
            return {
              ...lumber,
              size: o.size,
            };
          } else {
            return lumber;
          }
        });
        return {
          ...state,
          lumbers: newLumbers,
        };
      });
    });
    this.on('inputs:add', () => {
      console.log('inputs:add');
      this.update(state => {
        console.log(state);
        const id = state.inputs.length;
        const newInputs = state.inputs.concat([
          <SizeInput key={id} id={id}/>
        ]);
        const newLumbers = state.lumbers.concat([{ id: id, label: '', size: 0 }]);
        return {
          ...state,
          inputs: newInputs,
          lumbers: newLumbers,
        };
      });
    });
  }
}

export default new App({
  renderer: (el) => {
    render(el, document.getElementById('app'));
  },
  initialState: {
    lumbers: [],
    inputs: [],
  },
  middlewares: [],
});
