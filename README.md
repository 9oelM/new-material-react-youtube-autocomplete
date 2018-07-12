# New-Material-React-Youtube-Autocomplete

## Usage example
```javascript
<YoutubeAutocomplete
  useMui = true,
  inputId = 'my-input',
  menuId = 'my-menu',
  itemClassName = 'my-items',
  theme = createMuiTheme({
    primary: red,
  }) />
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

