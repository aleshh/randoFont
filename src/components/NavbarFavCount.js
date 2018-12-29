import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

function NavbarFavCount({ favCount }) {
  return (
    <React.Fragment>
      { (favCount === 0) ?
          null :
          <span className="navbar-fav-count">
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