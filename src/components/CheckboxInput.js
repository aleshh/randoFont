import React from 'react'
import PropTypes from 'prop-types'

function CheckboxInput(props) {
  const { name, checked, changeStyles } = props;
  return (
    <div>
      <input
        checked={checked}
        className="checkbox"
        name={name}
        type="checkbox"
        value={name}
        onChange={changeStyles}
      /> {name}
    </div>
  )
}

CheckboxInput.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  changeStyles: PropTypes.func.isRequired
}

export default CheckboxInput;