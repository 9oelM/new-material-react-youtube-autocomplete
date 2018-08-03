import React, { Component } from 'react'
import YoutubeAutocomplete from './dist/Core'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import 'typeface-roboto'
import RenderSearchResults from './RenderSearchResults'
import './App.css'
import './Width'

const styles = {
  container: {
    display: 'flex',
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
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
  results: {
    marginTop: '15px',
  },
  '@media (max-height: 1024px)': {
    container: {
      justifyContent: 'flex-start',
      alignItems: 'center',
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
  constructor() {
    super()
    this.state = {
      searchResults: [],
      searchWord: '',
    }
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <Grid className={classes.container} container>
          <Paper className={`app ${classes.paper}`} square>
            <Typography
              id="heading"
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
              onSearchResults={result => {
                this.setState({ searchResults: result })
                console.log(result)
              }}
              onSearchTrigger={inputValue =>
                this.setState({ searchWord: inputValue })
              }
            />
          </Paper>
          <Paper id="results" className={classes.results} square>
            <RenderSearchResults
              searchWord={this.state.searchWord}
              searchResults={this.state.searchResults}
            />
          </Paper>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(App)
