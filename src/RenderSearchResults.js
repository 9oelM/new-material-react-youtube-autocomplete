import React, { Component, Fragment } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import shortid from 'shortid'

const styles = {
  outer: {
    padding: '10px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    padding: '50px',
    textAlign: 'center',
  },
  image: {
    width: '360px',
    height: '180px',
  },
  cardContentContainer: {
    width: '360px',
  },
  '@media (max-width: 555px)': {
    image: {
      width: `${360 * 0.8}px`,
      height: `${180 * 0.8}px`,
    },
    cardContentContainer: {
      width: `${360 * 0.8}px`,
    },
    heading: {
      padding: '50px 10px 10px 10px',
    },
  },
}

const RenderSearchResults = ({ searchWord, searchResults, classes }) => {
  const resultsView = searchResults.map(item => {
    return (
      <div key={shortid.generate()} className={classes.outer}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.image}
            image={item.thumbnails.medium.url}
            title={item.title}
          />
          <div className={classes.cardContentContainer}>
            <CardContent>
              <Typography variant="headline" component="h2">
                {item.title.length > 40
                  ? `${item.title.substring(0, 40)}...`
                  : item.title}
              </Typography>
              <Typography component="p">
                {item.description.length > 135
                  ? `${item.description.substring(0, 135)}...`
                  : item.description}
              </Typography>
            </CardContent>
          </div>
        </Card>
      </div>
    )
  })
  return (
    <Fragment>
      <Typography
        gutterBottom
        variant="headline"
        component="h1"
        className={classes.heading}
      >
        Results for {searchWord}
      </Typography>
      {resultsView}
    </Fragment>
  )
}

export default withStyles(styles)(RenderSearchResults)
