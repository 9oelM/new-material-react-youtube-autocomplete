import React from 'react'
import Downshift from 'downshift'
import PropTypes from 'prop-types'
import Input from '@material-ui/core/Input'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import jsonp from 'jsonp'
import shortid from 'shortid'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import searchYoutube from 'youtube-search'

class Core extends React.Component {
  constructor(props) {
    super(props)
    this.handleInputValueChange = this.handleInputValueChange.bind(this)
    this.handleItemToString = this.handleItemToString.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.fetchSuggestionResults = this.fetchSuggestionResults.bind(this)
    this.fetchSearchResults = this.fetchSearchResults.bind(this)
    this.getSearchSuggestions = this.getSearchSuggestions.bind(this)
    this.state = {
      inputValue: '',
      searchSuggestions: [],
    }
  }

  getSearchSuggestions(data = []) {
    let result = data.map(elem => ({
      text: elem[0],
      id: shortid.generate(),
    }))
    return [...result]
  }

  fetchSuggestionResults(query) {
    const self = this,
      googleAutoSuggestURL =
        '//suggestqueries.google.com/complete/search?client=youtube&ds=yt&q='

    jsonp(`${googleAutoSuggestURL}${query}`, function(error, data) {
      if (error) {
        self.props.onSuggestError(error)
        return
      }
      let searchResult = data[1]

      self.state.searchSuggestions = self.getSearchSuggestions(searchResult)
    }) // for some reason, `fetch (https://github.com/github/fetch)` does not work on localhost hosting enviromnet due to CORS problems. But for some reason, jsonp works without any problems...
  }

  fetchSearchResults(searchWord) {
    const self = this

    let option = {
      maxResults: 15,
      key: this.props.apiKey,
    }

    searchYoutube(searchWord, option, function(err, results) {
      if (err) {
        self.props.onSearchError(err)
        return
      }
      self.props.onSearchResults(results)
    })
  }

  handleInputValueChange(_inputValue) {
    this.setState({ inputValue: _inputValue })
    this.fetchSuggestionResults(_inputValue)
  }

  handleItemToString(item) {
    return item ? item.text : ''
  }

  handleKeyDown(e) {
    console.log('handleKeyDown')
    if (e.key === 'Enter') {
      this.fetchSearchResults(this.state.inputValue)
    }
  }

  render() {
    const { searchSuggestions } = this.state
    const {
      useMui = true,
      inputId = 'youtube-autocomplete-input',
      menuId = 'youtube-autocomplete-menu',
      itemClassName = 'youtube-autocomplete-items',
      theme = createMuiTheme({
        primary: blue,
      }),
      placeholderText = 'Search youtube',
    } = this.props

    return (
      <Downshift
        onInputValueChange={this.handleInputValueChange}
        itemToString={this.handleItemToString}
        onSelect={selectedItem => this.fetchSearchResults(selectedItem.text)}
      >
        {({ getInputProps, getItemProps, getMenuProps, isOpen, onKeyDown }) => (
          <div>
            {useMui ? (
              <MuiThemeProvider theme={theme}>
                <Input
                  {...getInputProps({
                    placeholder: placeholderText,
                    fullWidth: true,
                    onKeyDown: e => {
                      if (e.key === 'Enter') {
                        this.fetchSearchResults(this.state.inputValue)
                        isOpen = false
                      }
                    },
                  })}
                />
                {isOpen ? (
                  <Paper square {...getMenuProps()}>
                    {searchSuggestions.map((item, index) => (
                      <MenuItem
                        {...getItemProps({
                          key: item.id,
                          index,
                          item,
                          style: {
                            zIndex: 1,
                          },
                        })}
                      >
                        {item.text}
                      </MenuItem>
                    ))}
                  </Paper>
                ) : null}
              </MuiThemeProvider>
            ) : (
              <React.Fragment>
                <input
                  id={inputId}
                  {...getInputProps({
                    placeholder: placeholderText,
                    onKeyDown: onKeyDown,
                  })}
                />
                {isOpen ? (
                  <div id={menuId} {...getMenuProps()}>
                    {searchSuggestions.map((item, index) => (
                      <div
                        className={itemClassName}
                        {...getItemProps({
                          key: item.id,
                          index,
                          item,
                        })}
                      >
                        {item.text}
                      </div>
                    ))}
                  </div>
                ) : null}
              </React.Fragment>
            )}
          </div>
        )}
      </Downshift>
    )
  }
}

export default Core