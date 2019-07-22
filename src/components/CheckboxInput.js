import React from 'react'
import PropTypes from 'prop-types'

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function CheckboxInput({ name, checked, invertCategories, toggleCategoryWanted, className }) {

  return (
    <FormControlLabel
      style={{ fontSize: 'inherit'}}
      className={className}
      onDoubleClick={toggleCategoryWanted}
      control={
        <Checkbox
          checked={checked}
          onChange={toggleCategoryWanted}
          onDoubleClick={invertCategories}
          name={ name }
          value={ name }
          color="secondary"
        />
      }
      label={ name }
    />
  )
}

CheckboxInput.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  invertCategories: PropTypes.func.isRequired,
  toggleCategoryWanted: PropTypes.func.isRequired
}

export default CheckboxInput;