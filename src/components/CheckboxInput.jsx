import React from 'react'
import PropTypes from 'prop-types'

function CheckboxInput({ name, checked, toggleCategoryWanted, className }) {

  return (
    <label
      className={className}
    >
      <input
        className="checkbox-input"
        type="checkbox"
        checked={checked}
        onChange={toggleCategoryWanted}
        name={ name }
        value={ name }
      />
      <span>{ name }</span>
    </label>
  )
}

CheckboxInput.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  toggleCategoryWanted: PropTypes.func.isRequired,
  className: PropTypes.string
}

export default CheckboxInput;
