import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const style = {
  position: 'relative',
  top: -2,
  marginLeft: 2,
  fontWeight: 'bold',
  backgroundColor: 'rgb(0, 92, 0)',
  color: 'white',
  borderRadius: 3,
  fontSize: 11,
  padding: '1px 3px 3px',
}

function NavbarFavCount({ favCount }) {
  return (
    <React.Fragment>
      { (favCount === 0) ?
          null :
          <span style={style}>
            {`${favCount}`}
          </span>
      }
    </React.Fragment>
  )
}

NavbarFavCount.propTypes = {
  favCount: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  favCount: state.fonts.favoriteFonts.length
})

export default connect(mapStateToProps, null)(NavbarFavCount)