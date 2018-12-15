import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CheckboxInput from './CheckboxInput'

import { setCategoriesWanted, setFontCount } from '../actions/fontActions';

export class Navbar extends Component {
  static propTypes = {
    setCategoriesWanted: PropTypes.func.isRequired,
    setFontCount: PropTypes.func.isRequired,
    // refreshFonts: PropTypes.func.isRequired
  }

  componentDidMount() {
    console.log('this.props.fontCount: ', this.props.fontCount);
    console.log('this.props.setFontCount: ', this.props.setFontCount);
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
              onChange={this.props.setFontCount}
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
            checked={this.props.categoriesWanted.includes('serif')}
            changeStyles={this.props.setCategoriesWanted}
          />
          <CheckboxInput
            name="sans-serif"
            checked={this.props.categoriesWanted.includes('sans-serif')}
            changeStyles={this.props.setCategoriesWanted}
          />
          <CheckboxInput
            name="display"
            checked={this.props.categoriesWanted.includes('display')}
            changeStyles={this.props.setCategoriesWanted}
          />
          <CheckboxInput
            name="handwriting"
            checked={this.props.categoriesWanted.includes('handwriting')}
            changeStyles={this.props.setCategoriesWanted}
          />
          <CheckboxInput
            name="monospace"
            checked={this.props.categoriesWanted.includes('monospace')}
            changeStyles={this.props.setCategoriesWanted}
          />
          {/* <button onClick={this.props.refreshFonts}>Reload</button> */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  categoriesWanted: state.fonts.categoriesWanted,
  fontCount: state.fonts.fontCount
})

export default connect(
  mapStateToProps, { setFontCount, setCategoriesWanted }
)(Navbar);
