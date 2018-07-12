import React from 'react'
import PropTypes from 'prop-types'
import Core from '../components/Core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'

const YoutubeAutocomplete = ({
  theme = createMuiTheme({
    palette: {
      primary: blue,
    },
  }),
}) => {
  return (
    <MuiThemeProvider theme={theme}>
      <Core
        useMui={true}
        inputId="youtube-autocomplete-input"
        menuId="youtube-autocomplete-menu"
        itemClassName="youtube-autocomplete-menu"
      />
    </MuiThemeProvider>
  )
}

YoutubeAutocomplete.propTypes = {
  theme: PropTypes.func.isRequired,
}

export default YoutubeAutocomplete
