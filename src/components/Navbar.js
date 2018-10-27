import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CheckboxInput from './CheckboxInput'

export class Navbar extends Component {
  static propTypes = {
    state: PropTypes.object.isRequired,
    changeStyles: PropTypes.func.isRequired,
    changeCount: PropTypes.func.isRequired,
    refreshFonts: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="navbar">
        <h1>randoFont</h1>
        <div className="controls">
          <div>
            <select
              id="qty"
              defaultValue="3"
              name="fontCount"
              onChange={this.props.changeCount}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="8">8</option>
              <option value="12">12</option>
            </select> Qty.
          </div>
          <CheckboxInput
            name="serif"
            checked={this.props.state.categoriesWanted.includes('serif')}
            changeStyles={this.props.changeStyles}
          />
          <CheckboxInput
            name="sans-serif"
            checked={this.props.state.categoriesWanted.includes('sans-serif')}
            changeStyles={this.props.changeStyles}
          />
          <CheckboxInput
            name="display"
            checked={this.props.state.categoriesWanted.includes('display')}
            changeStyles={this.props.changeStyles}
          />
          <CheckboxInput
            name="handwriting"
            checked={this.props.state.categoriesWanted.includes('handwriting')}
            changeStyles={this.props.changeStyles}
          />
          <CheckboxInput
            name="monospace"
            checked={this.props.state.categoriesWanted.includes('monospace')}
            changeStyles={this.props.changeStyles}
          />
          <button onClick={this.props.refreshFonts}>Reload</button>
        </div>
      </div>
    )
  }
}

export default Navbar;
