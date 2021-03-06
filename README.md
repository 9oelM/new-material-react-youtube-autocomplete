# New-Material-React-Youtube-Autocomplete

## Why
Other similar repos were out of date, so I needed a new component that meets `@material-ui/core@^1.3.1`, `react@^16.4.1`, `react-dom@^16.4.1`. 

I also wanted to support other styling according to users' appetite by having `useMui (bool)` prop. 

## Demo
[Here](https://9oelm.github.io/new-material-react-youtube-autocomplete/)

## Install
```
npm --save install new-material-react-youtube-autocomplete
```

## Usage example
```javascript
import React, { Component } from 'react';
import YoutubeAutocomplete from 'new-material-react-youtube-autocomplete';
import { createMuiTheme } from '@material-ui/core/styles'

const App = () => {
  return (
  <YoutubeAutocomplete
    useMui = {true},
    placeholderText = "search"
    inputId = 'my-input',
    menuId = 'my-menu',
    itemClassName = 'my-items',
    theme = {createMuiTheme({
      primary: red,
    })}
    option={{
      maxResults:15,
      type:['video', 'playlist'],
      key: 'AIzaSyB8R4Bqkx25_-c58L7v1QaLReVw1FWea28'
    }}
    onSuggestError={error => console.log(`error: ${error}`)}
    onSearchError={error => console.log(`error: ${error}`)}
    onSearchResults={result => console.log(result)}
    onSearchTrigger={inputValue => console.log(`${inputValue} is being searched.`)}
  />
  )
}

export default App
```
## Props

### `useMui`
* **Default value**: `true`
* **Explanation**: Set it to `true` if you want Material UI components to be the basis of the autocompletion design. If you set it to `false`, you are going to want to use `inputId`, `menuId` and `itemClassName` to customize your css.

### `inputId`
* **Default value**: `'youtube-autocomplete-input'`
* **Explanation**: This will be the CSS id of the input element. 

### `menuId`
* **Default value**: `'youtube-autocomplete-menu'`
* **Explanation**: This will be the CSS id of the element that serves as the root of the autocompleted items (which is just a `div` element in the source code). 

### `itemClassName` 
* **Default value**: `'youtube-autocomplete-items'`
* **Explanation**: This will be the name of the class of elements that serve as the autocompleted items under the element that serves as the menu.

### `theme`
* **Default value**: 
  ```javascript
  createMuiTheme({
    primary: blue,
  })
  ```
* **Explanation**: This is only applicable if you are using [Material UI](https://github.com/mui-org/material-ui). Create your own theme like this:
  ```javascript
  import { createMuiTheme } from '@material-ui/core/styles'
  import red from '@material-ui/core/colors/red'
  const theme = createMuiTheme({
    primary: red,
    ...(additional theme configurations)
  })
  ```

for more theming techniques, refer to [this link](https://stackoverflow.com/questions/34971998/how-to-apply-custom-theme-in-material-ui)
### `option`
* **Default value**: 
  ```javascript
  {
    maxResults: 15
  }
  ```
* **Explanation**: This will be used to search videos on Youtube (not autocomplete, but real search). For detailed steps to get the api key, [refer to this link.](https://www.slickremix.com/docs/get-api-key-for-youtube/) **If you do not supply a value to this prop, the youtube video search callback (`onSearchResults`) would not work.

You can add options like `key` (which is necessary) or `type`.

For more option parameters, see [youtube api](https://developers.google.com/youtube/v3/docs/search/list).

### `onSuggestError`
* **Default value**: none
* **Explanation**: Callback that operates once there is an error while getting *suggestions*. Receives err object as a parameter: `function(error){yourContent}`.

### `onSearchError`
* **Default value**: none
* **Explanation**: Callback that operates once there is an error while getting *search results*. Receives err object as a parameter: `function(error){yourContent}`. 

### `onSearchResults`
* **Default value**: none
* **Explanation**: will be the callback function that receives search result in array. Can receive search results as an array: `function(searchResultArr){yourContent}`

### `onSearchTrigger`
* **Default value**: none
* **Explanation**: This callback is run when the component starts searching the videos on Youtube (easily said, when you hit Enter to search). You get the selected item's text value as the parameter: `function(searchText){..}`

## Notes on the root element (`div`)
It's got the id `youtube-autocomplete` for css stylings like z-index, which could be quite important for autocomplete boxes. 

## Developing

### `npm run sw`
Starts the development server on `localhost:8080` and watches file changes to prettier & babel them.

## Todos
* add callback for getting youtube search results (not suggestions but real results)
* on Mouse Click on other places, close the autocompleting form.
* add an example for `useMui = {false}`
* add tests
* add gulpfile as the project is getting a bit bigger than before..

## Changelogs 
* `0.1.15`: npm module import breaks because the codes are not transpiled to es5. But es6 codes work, but when transpiled to es5 by babel, they still don't work--when you click on one of the autocompleted results, the input field's value does not change to that. Have to figure out why. 
* `0.1.151` npm module import does not break. But still: when you click on one of the autocompleted results, the input field's value does not change to that (if you are not manually using `src/wrapper/YoutubeAutocomplete.js` which is in es6 code, not transpiled)
* `0.2` Error fixed. Now the transpiled code is OK.
* `0.3` Callbacks added
* `0.3.1` Added id `youtube-autocomplete` to the uppermost component, which is a simple div wrapping `Downshift` component.
* `0.4.0` Added `onSearchTrigger` prop, which is a callback that is run when the user searches an item.
* `0.5.0` Added a working example