import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Favorite, FavoriteBorder, OpenInNew } from '@material-ui/icons'

import { toggleFavorite } from '../actions/fontActions';

const useStyles = makeStyles({
  card: {
    margin: '25px',
  },
  fontDetail: {
    fontWeight: 'bold',
  },
  slash: {
    color: '#bbb',
    fontWeight: 'bold',
  },
});

const Slash = props => {
  const classes = useStyles();
  return <span className={classes.slash}> &nbsp;/&nbsp; </span>
}

const Font = props => {
  const classes = useStyles();
  const { font, sampleSentence, favorite, toggleFavorite } = props;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          variant="h3"
          gutterBottom
          style={{fontFamily: font.family}}
          // contentEditable without a React warning in the console
          ref={function(e){if(e != null) e.contentEditable=true;}}
        >
          {sampleSentence}
        </Typography>
        <Typography>
          font:&nbsp;<span className={classes.fontDetail}>{font.family}</span>
          <Slash />
          category:&nbsp;<span className={classes.fontDetail}>{font.category}</span>
          <Slash />
          variants:&nbsp;<span className={classes.fontDetail}>{font.variants.length}</span>
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => toggleFavorite(font)}
          title={favorite ? 'Remove from Favorites' : 'Add to Favorites'}
        >
          { favorite ? <Favorite /> : <FavoriteBorder /> }
        </Button>
        <Button
          href={'https://fonts.google.com/specimen/' + font.family}
          target="_blank"
          rel="noopener noreferrer"
          title="Open in Google Fonts"
        >
          <OpenInNew />
        </Button>
      </CardActions>
    </Card>
  )
}

Font.propTypes = {
  font: PropTypes.object.isRequired,
  sampleSentence: PropTypes.string.isRequired,
  favorite: PropTypes.bool.isRequired,
  toggleFavorite: PropTypes.func.isRequired
}

export default connect(null, { toggleFavorite })(Font);
