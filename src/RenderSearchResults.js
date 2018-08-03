import React, { Component, Fragment } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import shortid from 'shortid'

const styles = {
  card: {
    padding: '10px',
  },
  heading: {
    padding: '50px',
  },
}

const RenderSearchResults = ({ searchWord, searchResults, classes }) => {
  const resultsView = searchResults.map(item => {
    return (
      <Card className={classes.card} key={shortid.generate()}>
        <CardContent>
          <Typography variant="headline" component="h2">
            {item.title}
          </Typography>
          <Typography component="p">{item.description}</Typography>
        </CardContent>
        <CardMedia
          image={item.thumbnails.medium.toString()}
          title={item.title}
        />
      </Card>
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
