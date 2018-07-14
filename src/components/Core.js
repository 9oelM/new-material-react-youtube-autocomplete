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

const googleAutoSuggestURL =
  '//suggestqueries.google.com/complete/search?client=youtube&ds=yt&q='

class Core extends React.Component {
  constructor(props) {
    super(props)
    this.handleInputValueChange = this.handleInputValueChange.bind(this)
    this.handleItemToString = this.handleItemToString.bind(this)
    this.fetchData = this.fetchData.bind(this)
    this.getSearchSuggestions = this.getSearchSuggestions.bind(this)
    this.state = {
      inputValue: '',
      searchSuggestions: [],
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

  fetchData(query) {
    let self = this

    jsonp(`${googleAutoSuggestURL}${query}`, function(error, data) {
      if (error) {
        console.log(`error: 
        ${error}`)
      }
      let searchResult = data[1]

      self.state.searchSuggestions = self.getSearchSuggestions(searchResult)
    }) // for some reason, `fetch (https://github.com/github/fetch)` does not work on localhost hosting enviromnet due to CORS problems. But for some reason, jsonp works without any problems...
  }

  handleInputValueChange(_inputValue) {
    this.setState({ inputValue: _inputValue })
    this.fetchData(_inputValue)
  }

  handleItemToString(item) {
    return item ? item.text : ''
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
    } = this.props

    return (
      <Downshift
        onInputValueChange={this.handleInputValueChange}
        itemToString={this.handleItemToString}
      >
        {({ getInputProps, getItemProps, getMenuProps, isOpen }) => (
          <div>
            {useMui ? (
              <React.Fragment>
                <MuiThemeProvider theme={theme}>
                  <Input
                    {...getInputProps({
                      placeholder: 'Search Youtube',
                      fullWidth: true,
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
              </React.Fragment>
            ) : (
              <React.Fragment>
                <input
                  id={inputId}
                  {...getInputProps({
                    placeholder: 'Search Youtube',
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
