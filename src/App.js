import React, { Component } from 'react'
import YoutubeAutocomplete from './dist/Core'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import 'typeface-roboto'

const styles = {
  container: {
    display: 'flex',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    maxWidth: 500,
    height: '10%',
    minHeight: '77px',
    padding: '50px',
  },
  heading: {
    paddingBottom: '10px',
  },
  '@media (max-height: 1024px)': {
    container: {
      justifyContent: 'center',
      alignItems: 'start',
    },
    paper: {
      maxWidth: 'initial',
      height: 'initial',
      minHeight: 'initial',
      padding: '50px',
    },
  },
}

class App extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.container}>
        <Paper className={`app ${classes.paper}`} square>
          <Typography
            variant="headline"
            component="h1"
            className={classes.heading}
          >
            new-material-react-youtube-autocomplete
          </Typography>
          <YoutubeAutocomplete
            option={{
              maxResults: 15,
              type: ['video', 'playlist'],
              key: 'AIzaSyB8R4Bqkx25_-c58L7v1QaLReVw1FWea28',
            }}
            onSuggestError={error => console.log(`error: ${error}`)}
            onSearchError={error => console.log(`error: ${error}`)}
            onSearchResults={result => console.log(result)}
            onSearchTrigger={inputValue =>
              console.log(`${inputValue} is being searched.`)
            }
          />
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(App)
