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
    this.fetchData = this.fetchData.bind(this)
    this.getSearchSuggestions = this.getSearchSuggestions.bind(this)
    this.handleChange = this.handleChange.bind(this)
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
    console.log(result)
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

  handleChange = selectedItems => {
    console.log({ selectedItems })
  }

  render() {
    const { searchSuggestions, inputValue } = this.state
    return (
      <Downshift
        onInputValueChange={inputValue =>
          this.handleInputValueChange(inputValue)
        }
        onStateChange={(selection, ...rest) => {
          Object.keys(selection).forEach(each =>
            console.log(`${each} ${this.selectedItem}`),
          )
          Object.keys(rest).forEach(each =>
            console.log(`${each} ${this.selectedItem}`),
          )
        }}
        onChange={this.handleChange}
        itemToString={item => (item ? item.text : '')}
        inputValue={inputValue}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem,
        }) => (
          <div>
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
                    })}
                  >
                    {item.text}
                  </MenuItem>
                ))}
              </Paper>
            ) : null}
          </div>
        )}
      </Downshift>
    )
  }
}

class MenuItem extends React.Component {
  render() {
    const { children } = this.props
    return <MenuItemMui>{children}</MenuItemMui>
  }
}

export default YoutubeAutocomplete
