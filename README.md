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

const App = () => {
  return (
  <YoutubeAutocomplete
    useMui = {true},
    placeholderText = "search"
    inputId = 'my-input',
    menuId = 'my-menu',
    itemClassName = 'my-items',
    theme = createMuiTheme({
      primary: red,
    })
    apiKey="AIzaSyB8R4Bqkx25_-c58L7v1QaLReVw1FWea28"
    onSuggestError={error => console.log(`error: ${error}`)}
    onSearchError={error => console.log(`error: ${error}`)}
    onSearchResults={result => console.log(result)}
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

### `apiKey`
* **Default value**: `''`
* **Explanation**: This will be used to search videos on Youtube (not autocomplete, but real search). For detailed steps to get the api key, [refer to this link.](https://www.slickremix.com/docs/get-api-key-for-youtube/) **If you do not supply a value to this prop, the youtube video search callback (`onSearchResults`) would not work.

### `onSuggestError`
* **Default value**: none
* **Explanation**: Callback that operates once there is an error while getting *suggestions*. Receives err object as a parameter: `function(error){yourContent}`.

### `onSearchError`
* **Default value**: none
* **Explanation**: Callback that operates once there is an error while getting *search results*. Receives err object as a parameter: `function(error){yourContent}`.

### `onSearchResults`
* **Default value**: none
* **Explanation**: will be the callback function that receives search result in array. Can receive search results as an array: `function(searchResultArr){yourContent}`

## Developing

### `npm run sw`
Starts the development server on `localhost:8080` and watches file changes to beautify & transpile them.

## Todos
* add callback for getting youtube search results (not suggestions but real results)
* on Mouse Click on other places, close the autocompleting form.
* add an example for `useMui = {false}`
* add tests
* add gulpfile as the project is getting a bit bigger than before..

## Version Logs 
* `0.1.15`: npm module import breaks because the codes are not transpiled to es5. But es6 codes work, but when transpiled to es5 by babel, they still don't work--when you click on one of the autocompleted results, the input field's value does not change to that. Have to figure out why. 
* `0.1.151` npm module import does not break. But still: when you click on one of the autocompleted results, the input field's value does not change to that (if you are not manually using `src/wrapper/YoutubeAutocomplete.js` which is in es6 code, not transpiled)
* `0.2` Error fixed. Now the transpiled code is OK.
* `0.3` Callbacks added