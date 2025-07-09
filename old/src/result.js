import React from 'react';
import { Component } from 'flumpt';
import Color from 'color';

import calc from './calc';
import { lumberSize } from './constants';

class Lumber extends Component {
  render() {
    const { rest, cuts } = this.props;
    const cutStyles = (cut, color) => {
      const { r, g, b, a } = cut.color;
      const bc = Math.floor(color.luminosity() * 200);
      return {
        width: `${cut.size / lumberSize * 100}%`,
        backgroundColor: `rgba(${r},${g},${b},${a})`,
        borderColor: `rgb(${bc},${bc},${bc})`,
      };
    };
    const cutSizeStyles = (color) => {
      const l = color.luminosity();
      const bc = Math.floor((l >= 0.5) ? (l * 256 - 128) : 243);
      return {
        color: `rgb(${bc},${bc},${bc})`,
      };
    };
    const cutColorStyle = (color) => ({
      backgroundColor: `rgba(${color.r},${color.g},${color.b},${color.a})`,
    });
    return (
      <div className="lumber-wrapper">
        <p className="lumber-info">
          {cuts.map((cut, i) => (
             <span key={i} className="cut">
               <span style={cutColorStyle(cut.color)} className="cut-color"></span>
               <span className="cut-label">{cut.label}</span>
               <span className="cut-size">{cut.size}</span>
             </span>
           ))}
          <span className="lumber-rest">残り{rest}mm</span>
        </p>
        <div className="lumber">
          {
            cuts.map((cut, i) => {
              const color = Color(cut.color);
              return (
                <div key={i} style={cutStyles(cut, color)} className="cut">
                  <span style={cutSizeStyles(color)} className="cut-size">
                    {cut.size}mm
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default class Result extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.tab === 'result';
  }
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
