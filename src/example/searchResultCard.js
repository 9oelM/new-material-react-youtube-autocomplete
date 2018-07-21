import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

class searchResultCard extends Component {
  render() {
    const { title, imageLink } = this.props
    return (
      <Card>
        <CardMedia image={imageLink} title={title} />
        <CardContent>
          <Grid item xs zeroMinWidth>
            <Typography gutterBottom variant="headline" component="h2">
              {title}
            </Typography>
          </Grid>
        </CardContent>
      </Card>
    )
  }
}
