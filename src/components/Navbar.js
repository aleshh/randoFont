import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CheckboxInput from './CheckboxInput'

export class Navbar extends Component {
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
          {/* <div>
            <input
              checked={this.props.state.categoriesWanted.includes('serif')}
              className="checkbox"
              name="serif"
              type="checkbox"
              value="name"
              onChange={this.props.changeStyles}
            /> Serif
          </div> */}
          <div>
            <input
              checked={this.props.state.categoriesWanted.includes('sans-serif')}
              className="checkbox"
              name="sans-serif"
              type="checkbox"
              value="name"
              onChange={this.props.changeStyles}
            /> Sans Serif
          </div>
          <div>
            <input
              checked={this.props.state.categoriesWanted.includes('display')}
              className="checkbox"
              name="display"
              type="checkbox"
              value="name"
              onChange={this.props.changeStyles}
              /> Display
          </div>
          <div>
            <input
              checked={this.props.state.categoriesWanted.includes('handwriting')}
              className="checkbox"
              name="handwriting"
              type="checkbox"
              value="name"
              onChange={this.props.changeStyles}
            /> Handwriting
          </div>
          <div>
            <input
              checked={this.props.state.categoriesWanted.includes('monospace')}
              className="checkbox"
              name="monospace"
              type="checkbox"
              value="name"
              onChange={this.props.changeStyles}
            /> Monospace
          </div>
          <button onClick={this.props.refreshFonts}>Reload</button>
        </div>
      </div>
    )
  }
}

Navbar.propTypes = {
  state: PropTypes.object.isRequired,
  changeStyles: PropTypes.func.isRequired,
  changeCount: PropTypes.func.isRequired,
  refreshFonts: PropTypes.func.isRequired
}

export default Navbar;
