import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class CheckboxInput extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    changeStyles: PropTypes.func.isRequired
  }

  render() {
    return (
      <div>
        <input
          checked={this.props.checked}
          className="checkbox"
          name={this.props.name}
          type="checkbox"
          value={this.props.name}
          onChange={this.props.changeStyles}
        /> {this.props.name}
      </div>
      )
  }
}

export default CheckboxInput;