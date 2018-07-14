# New-Material-React-Youtube-Autocomplete

## Version Logs (important)
* `0.1.15`: npm module import breaks because the codes are not transpiled to es5. But es6 codes work, but when transpiled to es5 by babel, they still don't work--when you click on one of the autocompleted results, the input field's value does not change to that. Have to figure out why. 
* `0.1.151` npm module import does not break. But still: when you click on one of the autocompleted results, the input field's value does not change to that (if you are not manually using `src/wrapper/YoutubeAutocomplete.js` which is in es6 code, not transpiled)

## Why
Other similar repos were out of date, so I needed a new component that meets `@material-ui/core@^1.3.1`, `react@^16.4.1`, `react-dom@^16.4.1`.

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
  useMui = true,
  inputId = 'my-input',
  menuId = 'my-menu',
  itemClassName = 'my-items',
  theme = createMuiTheme({
    primary: red,
  }) />
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
    ...(additional color configurations)
  })
  ```

## Developing

### `npm run sw`
Starts the development server on `localhost:8080` and watches file changes to beautify & transpile them.

## Todos
* on Mouse Click on other places, close the autocompleting form.
* add an example for `useMui = {false}`
* add tests
* add gulpfile as the project is getting a bit bigger than before..

