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

const googleAutoSuggestURL =
  '//suggestqueries.google.com/complete/search?client=youtube&ds=yt&q='

const isEnter = event => event.key === 'Enter'

class Core extends React.Component {
  constructor(props) {
    super(props)
    this.handleInputValueChange = this.handleInputValueChange.bind(this)
    this.handleItemToString = this.handleItemToString.bind(this)
    this.fetchSuggestionResults = this.fetchSuggestionResults.bind(this)
    this.fetchSearchResults = this.fetchSearchResults.bind(this)
    this.getSearchSuggestions = this.getSearchSuggestions.bind(this)
    this.handleSuggestError = props.onSuggestError
    //this.handleSuggestError = this.handleSuggestError.bind(this)
    this.handleSearchError = props.onSearchError
    // this.handleSearchError = this.handleSearchError.bind(this)
    this.handleSearchResults = props.onSearchResults
    //this.handleSearchResults = this.handleSearchResults.bind(this)
    this.state = {
      inputValue: '',
      searchSuggestions: [],
      searchResults: [],
      apiKey: props.apiKey,
    }
  }

  getSearchSuggestions(data = []) {
    let result = []
    result = data.map(elem => ({
      text: elem[0],
      id: shortid.generate(),
    }))
    return result
  }

  fetchSuggestionResults(query) {
    let self = this

    jsonp(`${googleAutoSuggestURL}${query}`, function(error, data) {
      if (error) {
        this.handleSuggestError(error)
        return
      }
      let searchResult = data[1]

      self.state.searchSuggestions = self.getSearchSuggestions(searchResult)
    }) // for some reason, `fetch (https://github.com/github/fetch)` does not work on localhost hosting enviromnet due to CORS problems. But for some reason, jsonp works without any problems...
  }

  fetchSearchResults(searchWord) {
    let option = {
      maxResults: 15,
      key: this.state.apiKey,
    }
    searchYoutube(searchWord, option, function(err, results) {
      if (err) {
        this.handleSearchError(err)
        return
      }
      this.state.searchResults = results
      this.handleSearchResults(results)
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
    if (isEnter(e)) {
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
      placeholder = 'Search youtube',
    } = this.props

    return (
      <Downshift
        onInputValueChange={this.handleInputValueChange}
        itemToString={this.handleItemToString}
        onSelect={selectedItem => this.fetchSearchResults(selectedItem.text)}
        onOuterClick={() => this.setState({ isOpen: false })}
        onKeydown={this.handleKeyDown}
        placeholder={placeholder}
      >
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          isOpen,
          onKeyDown,
          placeholder,
        }) => (
          <div>
            {useMui ? (
              <MuiThemeProvider theme={theme}>
                <Input
                  {...getInputProps({
                    placeholder: { placeholder },
                    fullWidth: true,
                    onKeyDown: { onKeyDown },
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
                ) : null}{' '}
              </MuiThemeProvider>
            ) : (
              <React.Fragment>
                <input
                  id={inputId}
                  {...getInputProps({
                    placeholder: { placeholder },
                    onKeyDown: { onKeyDown },
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
