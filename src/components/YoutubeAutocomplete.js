import React from 'react'
import Downshift from 'downshift'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
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

  render() {
    return (
      <Downshift
        onInputValueChange={inputValue =>
          this.handleInputValueChange(inputValue)
        }
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
            <label {...getLabelProps()}>Enter a fruit</label>
            <input {...getInputProps()} />
            <ul {...getMenuProps()}>
              {isOpen
                ? this.state.searchSuggestions.map((item, index) => (
                    <li
                      {...getItemProps({
                        key: shortid.generate(),
                        index,
                        item,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? 'lightgray' : 'white',
                          fontWeight: selectedItem === item ? 'bold' : 'normal',
                          color: 'black',
                        },
                      })}
                    >
                      {item}
                    </li>
                  ))
                : null}
            </ul>
          </div>
        )}
      </Downshift>
    )
  }
}

YoutubeAutocomplete.propTypes = {}

export default YoutubeAutocomplete
