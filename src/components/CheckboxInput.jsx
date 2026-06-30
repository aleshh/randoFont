import React from 'react'
import PropTypes from 'prop-types'

function CheckboxInput({ name, checked, invertCategories, toggleCategoryWanted, className }) {

  return (
    <label
      className={className}
      onDoubleClick={invertCategories}
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
  invertCategories: PropTypes.func.isRequired,
  toggleCategoryWanted: PropTypes.func.isRequired,
  className: PropTypes.string
}

export default CheckboxInput;
