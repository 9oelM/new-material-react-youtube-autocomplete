import React from 'react'
import Downshift from 'downshift'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import Paper from '@material-ui/core/Paper'
import MenuItemMui from '@material-ui/core/MenuItem'
import jsonp from 'jsonp'
import shortid from 'shortid'

const googleAutoSuggestURL =
  '//suggestqueries.google.com/complete/search?client=youtube&ds=yt&q='

class YoutubeAutocomplete extends React.Component {
  constructor(props) {
    super(props)
    this.handleInputValueChange = this.handleInputValueChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.fetchData = this.fetchData.bind(this)
    this.getSearchSuggestions = this.getSearchSuggestions.bind(this)

    this.state = {
      inputValue: '',
      searchSuggestions: [],
    }
  }

  getSearchSuggestions(data = []) {
    let result = []
    result = data.map(elem => elem[0])
    return result
  }

  fetchData(query) {
    let self = this

    jsonp(`${googleAutoSuggestURL}${query}`, function(error, data) {
      if (error) console.log(error)

      let searchResult = data[1]

      self.state.searchSuggestions = self.getSearchSuggestions(searchResult)

      console.log(self.state.searchSuggestions)
    }) // for some reason, `fetch (https://github.com/github/fetch)` does not work on localhost hosting enviromnet due to CORS problems. But for some reason, jsonp works without any problems...
  }

  handleInputValueChange(_inputValue) {
    this.setState({ inputValue: _inputValue })
    this.fetchData(this.state.inputValue)
  }

  handleChange(selectedItem, stateAndHelpers = {}) {
    this.setState({ inputValue: selectedItem.textContent })
  }

  render() {
    const { searchSuggestions, inputValue } = this.state
    return (
      <Downshift
        onInputValueChange={inputValue =>
          this.handleInputValueChange(inputValue)
        }
        onChange={(selectedItem, stateAndHelpers) =>
          this.handleChange(selectedItem, stateAndHelpers)
        }
        inputValue={inputValue}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          isOpen,
          inputValue,
        }) => (
          <div>
            <Input
              {...getInputProps()}
              placeholder="Search Youtube"
              value={inputValue}
            />
            {isOpen ? (
              <Paper square {...getMenuProps()}>
                {searchSuggestions.map((eachSuggestion, index) => {
                  return (
                    <MenuItem key={shortid.generate()}>
                      {eachSuggestion}
                    </MenuItem>
                  )
                })}
              </Paper>
            ) : null}
          </div>
        )}
      </Downshift>
    )
  }
}

class MenuItem extends React.Component {
  constructor() {
    super()
  }

  render() {
    const { children } = this.props
    let handleClick
    return <MenuItemMui>{children}</MenuItemMui>
  }
}

export default YoutubeAutocomplete
