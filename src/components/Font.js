import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import heart from '../heart.js';

import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { toggleFavorite } from '../actions/fontActions';

const useStyles = makeStyles({
  card: {
    margin: '25px',
    // maxWidth: '800px',
  },
});

const Font = props => {
  const classes = useStyles();
  const { font, sampleSentence, favorite, toggleFavorite } = props;

  return (
    <Box justifyContent="center">
    <Grid xs="10" alignItems="center">
      <Card className={classes.card}>
        <CardContent>
          <Typography
            variant="h3"
            style={{fontFamily: font.family}}
            // contentEditable without a React warning in the console
            ref={function(e){if(e != null) e.contentEditable=true;}}
          >
            {sampleSentence}
          </Typography>
          <Typography>
            font:&nbsp;<span className="font-info">{font.family}</span>&#8203;
            category:&nbsp;<span className="font-info">{font.category}</span>&#8203;
            variants:&nbsp;<span className="font-info">{font.variants.length}</span>&#8203;
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            href={'https://fonts.google.com/specimen/' + font.family}
            target="_blank"
            rel="noopener noreferrer"
            title="Open in Google Fonts"
          >
            Open
          </Button>
        </CardActions>
      </Card>
    </Grid>
    </Box>
  )

  return (
    <div className="font-card">

      <p>
        <span
          className={favorite ? 'heart favorite' : 'heart'}
          title={favorite ? 'Remove from Favorites' : 'Add to Favorites'}
          onClick={() => toggleFavorite(font)}
        >
          {heart}
        </span>
      </p>
    </div>
    )
}

Font.propTypes = {
  font: PropTypes.object.isRequired,
  sampleSentence: PropTypes.string.isRequired,
  favorite: PropTypes.bool.isRequired,
  toggleFavorite: PropTypes.func.isRequired
}

export default connect(null, { toggleFavorite })(Font);