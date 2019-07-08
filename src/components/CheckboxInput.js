import React from 'react'
import PropTypes from 'prop-types'

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function CheckboxInput(props) {
  const { name, checked, changeStyles } = props;

  return (
    <FormControlLabel style={{ fontSize: '12px'}}
      control={
        <Checkbox
          checked={checked}
          onChange={changeStyles}
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
  changeStyles: PropTypes.func.isRequired
}

export default CheckboxInput;