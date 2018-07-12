import React from 'react'
import Core from '../components/Core'
import MuiThemeProvider from '@material-ui/styles'

const YoutubeAutocomplete = ({ theme }) => {
  ;<MuiThemeProvider theme={theme}>
    <Core />
  </MuiThemeProvider>
}

export default YoutubeAutocomplete
