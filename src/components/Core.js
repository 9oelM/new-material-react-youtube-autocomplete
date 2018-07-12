import React from 'react'
import Downshift from 'downshift'
import PropTypes from 'prop-types'
import Input from '@material-ui/core/Input'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import jsonp from 'jsonp'
import shortid from 'shortid'
const googleAutoSuggestURL =
  '//suggestqueries.google.com/complete/search?client=youtube&ds=yt&q='

class Core extends React.Component {
  constructor(props) {
    super(props)
    this.handleInputValueChange = this.handleInputValueChange.bind(this)
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

      console.log(self.state.searchSuggestions)
    }) // for some reason, `fetch (https://github.com/github/fetch)` does not work on localhost hosting enviromnet due to CORS problems. But for some reason, jsonp works without any problems...
  }

  handleInputValueChange(_inputValue) {
    this.setState({ inputValue: _inputValue })
    this.fetchData(_inputValue)
  }

  handleItemToString = item => (item ? item.text : '')

  render() {
    const { searchSuggestions } = this.state
    const { useMui } = this.prop

    return (
      <Downshift
        onInputValueChange={this.handleInputValueChange}
        itemToString={this.handleItemToString}
      >
        {({ getInputProps, getItemProps, getMenuProps, isOpen }) => (
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

export default Core
