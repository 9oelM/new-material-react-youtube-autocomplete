'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0

var _react = _interopRequireDefault(require('react'))

var _downshift = _interopRequireDefault(require('downshift'))

var _propTypes = _interopRequireDefault(require('prop-types'))

var _Input = _interopRequireDefault(require('@material-ui/core/Input'))

var _Paper = _interopRequireDefault(require('@material-ui/core/Paper'))

var _MenuItem = _interopRequireDefault(require('@material-ui/core/MenuItem'))

var _jsonp = _interopRequireDefault(require('jsonp'))

var _shortid = _interopRequireDefault(require('shortid'))

var _styles = require('@material-ui/core/styles')

var _blue = _interopRequireDefault(require('@material-ui/core/colors/blue'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

function _typeof(obj) {
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof(obj) {
      return typeof obj
    }
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj
    }
  }
  return _typeof(obj)
}

function _extends() {
  _extends =
    Object.assign ||
    function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i]
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key]
          }
        }
      }
      return target
    }
  return _extends.apply(this, arguments)
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i]
    descriptor.enumerable = descriptor.enumerable || false
    descriptor.configurable = true
    if ('value' in descriptor) descriptor.writable = true
    Object.defineProperty(target, descriptor.key, descriptor)
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps)
  if (staticProps) _defineProperties(Constructor, staticProps)
  return Constructor
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
    return call
  }
  return _assertThisInitialized(self)
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o)
      }
  return _getPrototypeOf(o)
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function')
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true },
  })
  if (superClass) _setPrototypeOf(subClass, superClass)
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p
      return o
    }
  return _setPrototypeOf(o, p)
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    )
  }
  return self
}

var googleAutoSuggestURL =
  '//suggestqueries.google.com/complete/search?client=youtube&ds=yt&q='

var Core =
  /*#__PURE__*/
  (function(_React$Component) {
    _inherits(Core, _React$Component)

    function Core(props) {
      var _this

      _classCallCheck(this, Core)

      _this = _possibleConstructorReturn(
        this,
        _getPrototypeOf(Core).call(this, props),
      )
      _this.handleInputValueChange = _this.handleInputValueChange.bind(
        _assertThisInitialized(_assertThisInitialized(_this)),
      )
      _this.handleItemToString = _this.handleItemToString.bind(
        _assertThisInitialized(_assertThisInitialized(_this)),
      )
      _this.fetchData = _this.fetchData.bind(
        _assertThisInitialized(_assertThisInitialized(_this)),
      )
      _this.getSearchSuggestions = _this.getSearchSuggestions.bind(
        _assertThisInitialized(_assertThisInitialized(_this)),
      )
      _this.state = {
        inputValue: '',
        searchSuggestions: [],
      }
      return _this
    }

    _createClass(Core, [
      {
        key: 'getSearchSuggestions',
        value: function getSearchSuggestions() {
          var data =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : []
          var result = []
          result = data.map(function(elem) {
            return {
              text: elem[0],
              id: _shortid.default.generate(),
            }
          })
          return result
        },
      },
      {
        key: 'fetchData',
        value: function fetchData(query) {
          var self = this
          ;(0, _jsonp.default)(
            ''.concat(googleAutoSuggestURL).concat(query),
            function(error, data) {
              if (error) {
                console.log('error: \n        '.concat(error))
              }

              var searchResult = data[1]
              self.state.searchSuggestions = self.getSearchSuggestions(
                searchResult,
              )
            },
          ) // for some reason, `fetch (https://github.com/github/fetch)` does not work on localhost hosting enviromnet due to CORS problems. But for some reason, jsonp works without any problems...
        },
      },
      {
        key: 'handleInputValueChange',
        value: function handleInputValueChange(_inputValue) {
          this.setState({
            inputValue: _inputValue,
          })
          this.fetchData(_inputValue)
        },
      },
      {
        key: 'handleItemToString',
        value: function handleItemToString(item) {
          return item ? item.text : ''
        },
      },
      {
        key: 'render',
        value: function render() {
          var searchSuggestions = this.state.searchSuggestions
          var _this$props = this.props,
            _this$props$useMui = _this$props.useMui,
            useMui = _this$props$useMui === void 0 ? true : _this$props$useMui,
            _this$props$inputId = _this$props.inputId,
            inputId =
              _this$props$inputId === void 0
                ? 'youtube-autocomplete-input'
                : _this$props$inputId,
            _this$props$menuId = _this$props.menuId,
            menuId =
              _this$props$menuId === void 0
                ? 'youtube-autocomplete-menu'
                : _this$props$menuId,
            _this$props$itemClass = _this$props.itemClassName,
            itemClassName =
              _this$props$itemClass === void 0
                ? 'youtube-autocomplete-items'
                : _this$props$itemClass,
            _this$props$theme = _this$props.theme,
            theme =
              _this$props$theme === void 0
                ? (0, _styles.createMuiTheme)({
                    primary: _blue.default,
                  })
                : _this$props$theme
          return _react.default.createElement(
            _downshift.default,
            {
              onInputValueChange: this.handleInputValueChange,
              itemToString: this.handleItemToString,
            },
            function(_ref) {
              var getInputProps = _ref.getInputProps,
                getItemProps = _ref.getItemProps,
                getMenuProps = _ref.getMenuProps,
                isOpen = _ref.isOpen
              return _react.default.createElement(
                'div',
                null,
                useMui
                  ? _react.default.createElement(
                      _react.default.Fragment,
                      null,
                      _react.default.createElement(
                        _styles.MuiThemeProvider,
                        {
                          theme: theme,
                        },
                        _react.default.createElement(
                          _Input.default,
                          getInputProps({
                            placeholder: 'Search Youtube',
                            fullWidth: true,
                          }),
                        ),
                        isOpen
                          ? _react.default.createElement(
                              _Paper.default,
                              _extends(
                                {
                                  square: true,
                                },
                                getMenuProps(),
                              ),
                              searchSuggestions.map(function(item, index) {
                                return _react.default.createElement(
                                  _MenuItem.default,
                                  getItemProps({
                                    key: item.id,
                                    index: index,
                                    item: item,
                                    style: {
                                      zIndex: 1,
                                    },
                                  }),
                                  item.text,
                                )
                              }),
                            )
                          : null,
                        ' ',
                      ),
                    )
                  : _react.default.createElement(
                      _react.default.Fragment,
                      null,
                      _react.default.createElement(
                        'input',
                        _extends(
                          {
                            id: inputId,
                          },
                          getInputProps({
                            placeholder: 'Search Youtube',
                          }),
                        ),
                      ),
                      isOpen
                        ? _react.default.createElement(
                            'div',
                            _extends(
                              {
                                id: menuId,
                              },
                              getMenuProps(),
                            ),
                            searchSuggestions.map(function(item, index) {
                              return _react.default.createElement(
                                'div',
                                _extends(
                                  {
                                    className: itemClassName,
                                  },
                                  getItemProps({
                                    key: item.id,
                                    index: index,
                                    item: item,
                                  }),
                                ),
                                item.text,
                              )
                            }),
                          )
                        : null,
                    ),
              )
            },
          )
        },
      },
    ])

    return Core
  })(_react.default.Component)

var _default = Core
exports.default = _default
;('use strict')

function _typeof5(obj) {
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof5 = function _typeof5(obj) {
      return typeof obj
    }
  } else {
    _typeof5 = function _typeof5(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj
    }
  }
  return _typeof5(obj)
}

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0

var _react = _interopRequireDefault(require('react'))

var _downshift = _interopRequireDefault(require('downshift'))

var _propTypes = _interopRequireDefault(require('prop-types'))

var _Input = _interopRequireDefault(require('@material-ui/core/Input'))

var _Paper = _interopRequireDefault(require('@material-ui/core/Paper'))

var _MenuItem = _interopRequireDefault(require('@material-ui/core/MenuItem'))

var _jsonp = _interopRequireDefault(require('jsonp'))

var _shortid = _interopRequireDefault(require('shortid'))

var _styles = require('@material-ui/core/styles')

var _blue = _interopRequireDefault(require('@material-ui/core/colors/blue'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule
    ? obj
    : {
        default: obj,
      }
}

function _typeof(obj) {
  if (typeof Symbol === 'function' && _typeof5(Symbol.iterator) === 'symbol') {
    _typeof = function _typeof(obj) {
      return _typeof5(obj)
    }
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : _typeof5(obj)
    }
  }

  return _typeof(obj)
}

function _extends() {
  _extends =
    Object.assign ||
    function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key]
          }
        }
      }

      return target
    }

  return _extends.apply(this, arguments)
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i]
    descriptor.enumerable = descriptor.enumerable || false
    descriptor.configurable = true
    if ('value' in descriptor) descriptor.writable = true
    Object.defineProperty(target, descriptor.key, descriptor)
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps)
  if (staticProps) _defineProperties(Constructor, staticProps)
  return Constructor
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
    return call
  }

  return _assertThisInitialized(self)
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o)
      }
  return _getPrototypeOf(o)
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function')
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true,
    },
  })
  if (superClass) _setPrototypeOf(subClass, superClass)
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p
      return o
    }

  return _setPrototypeOf(o, p)
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    )
  }

  return self
}

var googleAutoSuggestURL =
  '//suggestqueries.google.com/complete/search?client=youtube&ds=yt&q='

var Core =
  /*#__PURE__*/
  (function(_React$Component) {
    _inherits(Core, _React$Component)

    function Core(props) {
      var _this

      _classCallCheck(this, Core)

      _this = _possibleConstructorReturn(
        this,
        _getPrototypeOf(Core).call(this, props),
      )
      _this.handleInputValueChange = _this.handleInputValueChange.bind(
        _assertThisInitialized(_assertThisInitialized(_this)),
      )
      _this.handleItemToString = _this.handleItemToString.bind(
        _assertThisInitialized(_assertThisInitialized(_this)),
      )
      _this.fetchData = _this.fetchData.bind(
        _assertThisInitialized(_assertThisInitialized(_this)),
      )
      _this.getSearchSuggestions = _this.getSearchSuggestions.bind(
        _assertThisInitialized(_assertThisInitialized(_this)),
      )
      _this.state = {
        inputValue: '',
        searchSuggestions: [],
      }
      return _this
    }

    _createClass(Core, [
      {
        key: 'getSearchSuggestions',
        value: function getSearchSuggestions() {
          var data =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : []
          var result = []
          result = data.map(function(elem) {
            return {
              text: elem[0],
              id: _shortid.default.generate(),
            }
          })
          return result
        },
      },
      {
        key: 'fetchData',
        value: function fetchData(query) {
          var self = this
          ;(0, _jsonp.default)(
            ''.concat(googleAutoSuggestURL).concat(query),
            function(error, data) {
              if (error) {
                console.log('error: \n        '.concat(error))
              }

              var searchResult = data[1]
              self.state.searchSuggestions = self.getSearchSuggestions(
                searchResult,
              )
            },
          ) // for some reason, `fetch (https://github.com/github/fetch)` does not work on localhost hosting enviromnet due to CORS problems. But for some reason, jsonp works without any problems...
        },
      },
      {
        key: 'handleInputValueChange',
        value: function handleInputValueChange(_inputValue) {
          this.setState({
            inputValue: _inputValue,
          })
          this.fetchData(_inputValue)
        },
      },
      {
        key: 'handleItemToString',
        value: function handleItemToString(item) {
          return item ? item.text : ''
        },
      },
      {
        key: 'render',
        value: function render() {
          var searchSuggestions = this.state.searchSuggestions
          var _this$props = this.props,
            _this$props$useMui = _this$props.useMui,
            useMui = _this$props$useMui === void 0 ? true : _this$props$useMui,
            _this$props$inputId = _this$props.inputId,
            inputId =
              _this$props$inputId === void 0
                ? 'youtube-autocomplete-input'
                : _this$props$inputId,
            _this$props$menuId = _this$props.menuId,
            menuId =
              _this$props$menuId === void 0
                ? 'youtube-autocomplete-menu'
                : _this$props$menuId,
            _this$props$itemClass = _this$props.itemClassName,
            itemClassName =
              _this$props$itemClass === void 0
                ? 'youtube-autocomplete-items'
                : _this$props$itemClass,
            _this$props$theme = _this$props.theme,
            theme =
              _this$props$theme === void 0
                ? (0, _styles.createMuiTheme)({
                    primary: _blue.default,
                  })
                : _this$props$theme
          return _react.default.createElement(
            _downshift.default,
            {
              onInputValueChange: this.handleInputValueChange,
              itemToString: this.handleItemToString,
            },
            function(_ref) {
              var getInputProps = _ref.getInputProps,
                getItemProps = _ref.getItemProps,
                getMenuProps = _ref.getMenuProps,
                isOpen = _ref.isOpen
              return _react.default.createElement(
                'div',
                null,
                useMui
                  ? _react.default.createElement(
                      _react.default.Fragment,
                      null,
                      _react.default.createElement(
                        _styles.MuiThemeProvider,
                        {
                          theme: theme,
                        },
                        _react.default.createElement(
                          _Input.default,
                          getInputProps({
                            placeholder: 'Search Youtube',
                            fullWidth: true,
                          }),
                        ),
                        isOpen
                          ? _react.default.createElement(
                              _Paper.default,
                              _extends(
                                {
                                  square: true,
                                },
                                getMenuProps(),
                              ),
                              searchSuggestions.map(function(item, index) {
                                return _react.default.createElement(
                                  _MenuItem.default,
                                  getItemProps({
                                    key: item.id,
                                    index: index,
                                    item: item,
                                    style: {
                                      zIndex: 1,
                                    },
                                  }),
                                  item.text,
                                )
                              }),
                            )
                          : null,
                        ' ',
                      ),
                    )
                  : _react.default.createElement(
                      _react.default.Fragment,
                      null,
                      _react.default.createElement(
                        'input',
                        _extends(
                          {
                            id: inputId,
                          },
                          getInputProps({
                            placeholder: 'Search Youtube',
                          }),
                        ),
                      ),
                      isOpen
                        ? _react.default.createElement(
                            'div',
                            _extends(
                              {
                                id: menuId,
                              },
                              getMenuProps(),
                            ),
                            searchSuggestions.map(function(item, index) {
                              return _react.default.createElement(
                                'div',
                                _extends(
                                  {
                                    className: itemClassName,
                                  },
                                  getItemProps({
                                    key: item.id,
                                    index: index,
                                    item: item,
                                  }),
                                ),
                                item.text,
                              )
                            }),
                          )
                        : null,
                    ),
              )
            },
          )
        },
      },
    ])

    return Core
  })(_react.default.Component)

var _default = Core
exports.default = _default
;('use strict')

function _typeof4(obj) {
  if (typeof Symbol === 'function' && _typeof5(Symbol.iterator) === 'symbol') {
    _typeof4 = function _typeof4(obj) {
      return _typeof5(obj)
    }
  } else {
    _typeof4 = function _typeof4(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : _typeof5(obj)
    }
  }

  return _typeof4(obj)
}

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0

var _react = _interopRequireDefault(require('react'))

var _downshift = _interopRequireDefault(require('downshift'))

var _propTypes = _interopRequireDefault(require('prop-types'))

var _Input = _interopRequireDefault(require('@material-ui/core/Input'))

var _Paper = _interopRequireDefault(require('@material-ui/core/Paper'))

var _MenuItem = _interopRequireDefault(require('@material-ui/core/MenuItem'))

var _jsonp = _interopRequireDefault(require('jsonp'))

var _shortid = _interopRequireDefault(require('shortid'))

var _styles = require('@material-ui/core/styles')

var _blue = _interopRequireDefault(require('@material-ui/core/colors/blue'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule
    ? obj
    : {
        default: obj,
      }
}

function _typeof(obj) {
  if (typeof Symbol === 'function' && _typeof4(Symbol.iterator) === 'symbol') {
    _typeof = function _typeof(obj) {
      return _typeof4(obj)
    }
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : _typeof4(obj)
    }
  }

  return _typeof(obj)
}

function _extends() {
  _extends =
    Object.assign ||
    function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key]
          }
        }
      }

      return target
    }

  return _extends.apply(this, arguments)
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i]
    descriptor.enumerable = descriptor.enumerable || false
    descriptor.configurable = true
    if ('value' in descriptor) descriptor.writable = true
    Object.defineProperty(target, descriptor.key, descriptor)
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps)
  if (staticProps) _defineProperties(Constructor, staticProps)
  return Constructor
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
    return call
  }

  return _assertThisInitialized(self)
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o)
      }
  return _getPrototypeOf(o)
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function')
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true,
    },
  })
  if (superClass) _setPrototypeOf(subClass, superClass)
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p
      return o
    }

  return _setPrototypeOf(o, p)
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    )
  }

  return self
}

var googleAutoSuggestURL =
  '//suggestqueries.google.com/complete/search?client=youtube&ds=yt&q='

var Core =
  /*#__PURE__*/
  (function(_React$Component) {
    _inherits(Core, _React$Component)

    function Core(props) {
      var _this

      _classCallCheck(this, Core)

      _this = _possibleConstructorReturn(
        this,
        _getPrototypeOf(Core).call(this, props),
      )
      _this.handleInputValueChange = _this.handleInputValueChange.bind(
        _assertThisInitialized(_assertThisInitialized(_this)),
      )
      _this.handleItemToString = _this.handleItemToString.bind(
        _assertThisInitialized(_assertThisInitialized(_this)),
      )
      _this.fetchData = _this.fetchData.bind(
        _assertThisInitialized(_assertThisInitialized(_this)),
      )
      _this.getSearchSuggestions = _this.getSearchSuggestions.bind(
        _assertThisInitialized(_assertThisInitialized(_this)),
      )
      _this.state = {
        inputValue: '',
        searchSuggestions: [],
      }
      return _this
    }

    _createClass(Core, [
      {
        key: 'getSearchSuggestions',
        value: function getSearchSuggestions() {
          var data =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : []
          var result = []
          result = data.map(function(elem) {
            return {
              text: elem[0],
              id: _shortid.default.generate(),
            }
          })
          return result
        },
      },
      {
        key: 'fetchData',
        value: function fetchData(query) {
          var self = this
          ;(0, _jsonp.default)(
            ''.concat(googleAutoSuggestURL).concat(query),
            function(error, data) {
              if (error) {
                console.log('error: \n        '.concat(error))
              }

              var searchResult = data[1]
              self.state.searchSuggestions = self.getSearchSuggestions(
                searchResult,
              )
            },
          ) // for some reason, `fetch (https://github.com/github/fetch)` does not work on localhost hosting enviromnet due to CORS problems. But for some reason, jsonp works without any problems...
        },
      },
      {
        key: 'handleInputValueChange',
        value: function handleInputValueChange(_inputValue) {
          this.setState({
            inputValue: _inputValue,
          })
          this.fetchData(_inputValue)
        },
      },
      {
        key: 'handleItemToString',
        value: function handleItemToString(item) {
          return item ? item.text : ''
        },
      },
      {
        key: 'render',
        value: function render() {
          var searchSuggestions = this.state.searchSuggestions
          var _this$props = this.props,
            _this$props$useMui = _this$props.useMui,
            useMui = _this$props$useMui === void 0 ? true : _this$props$useMui,
            _this$props$inputId = _this$props.inputId,
            inputId =
              _this$props$inputId === void 0
                ? 'youtube-autocomplete-input'
                : _this$props$inputId,
            _this$props$menuId = _this$props.menuId,
            menuId =
              _this$props$menuId === void 0
                ? 'youtube-autocomplete-menu'
                : _this$props$menuId,
            _this$props$itemClass = _this$props.itemClassName,
            itemClassName =
              _this$props$itemClass === void 0
                ? 'youtube-autocomplete-items'
                : _this$props$itemClass,
            _this$props$theme = _this$props.theme,
            theme =
              _this$props$theme === void 0
                ? (0, _styles.createMuiTheme)({
                    primary: _blue.default,
                  })
                : _this$props$theme
          return _react.default.createElement(
            _downshift.default,
            {
              onInputValueChange: this.handleInputValueChange,
              itemToString: this.handleItemToString,
            },
            function(_ref) {
              var getInputProps = _ref.getInputProps,
                getItemProps = _ref.getItemProps,
                getMenuProps = _ref.getMenuProps,
                isOpen = _ref.isOpen
              return _react.default.createElement(
                'div',
                null,
                useMui
                  ? _react.default.createElement(
                      _react.default.Fragment,
                      null,
                      _react.default.createElement(
                        _styles.MuiThemeProvider,
                        {
                          theme: theme,
                        },
                        _react.default.createElement(
                          _Input.default,
                          getInputProps({
                            placeholder: 'Search Youtube',
                            fullWidth: true,
                          }),
                        ),
                        isOpen
                          ? _react.default.createElement(
                              _Paper.default,
                              _extends(
                                {
                                  square: true,
                                },
                                getMenuProps(),
                              ),
                              searchSuggestions.map(function(item, index) {
                                return _react.default.createElement(
                                  _MenuItem.default,
                                  getItemProps({
                                    key: item.id,
                                    index: index,
                                    item: item,
                                    style: {
                                      zIndex: 1,
                                    },
                                  }),
                                  item.text,
                                )
                              }),
                            )
                          : null,
                        ' ',
                      ),
                    )
                  : _react.default.createElement(
                      _react.default.Fragment,
                      null,
                      _react.default.createElement(
                        'input',
                        _extends(
                          {
                            id: inputId,
                          },
                          getInputProps({
                            placeholder: 'Search Youtube',
                          }),
                        ),
                      ),
                      isOpen
                        ? _react.default.createElement(
                            'div',
                            _extends(
                              {
                                id: menuId,
                              },
                              getMenuProps(),
                            ),
                            searchSuggestions.map(function(item, index) {
                              return _react.default.createElement(
                                'div',
                                _extends(
                                  {
                                    className: itemClassName,
                                  },
                                  getItemProps({
                                    key: item.id,
                                    index: index,
                                    item: item,
                                  }),
                                ),
                                item.text,
                              )
                            }),
                          )
                        : null,
                    ),
              )
            },
          )
        },
      },
    ])

    return Core
  })(_react.default.Component)

var _default = Core
exports.default = _default
;('use strict')

function _typeof3(obj) {
  if (typeof Symbol === 'function' && _typeof4(Symbol.iterator) === 'symbol') {
    _typeof3 = function _typeof3(obj) {
      return _typeof4(obj)
    }
  } else {
    _typeof3 = function _typeof3(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : _typeof4(obj)
    }
  }

  return _typeof3(obj)
}

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0

var _react = _interopRequireDefault(require('react'))

var _downshift = _interopRequireDefault(require('downshift'))

var _propTypes = _interopRequireDefault(require('prop-types'))

var _Input = _interopRequireDefault(require('@material-ui/core/Input'))

var _Paper = _interopRequireDefault(require('@material-ui/core/Paper'))

var _MenuItem = _interopRequireDefault(require('@material-ui/core/MenuItem'))

var _jsonp = _interopRequireDefault(require('jsonp'))

var _shortid = _interopRequireDefault(require('shortid'))

var _styles = require('@material-ui/core/styles')

var _blue = _interopRequireDefault(require('@material-ui/core/colors/blue'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule
    ? obj
    : {
        default: obj,
      }
}

function _typeof(obj) {
  if (typeof Symbol === 'function' && _typeof3(Symbol.iterator) === 'symbol') {
    _typeof = function _typeof(obj) {
      return _typeof3(obj)
    }
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : _typeof3(obj)
    }
  }

  return _typeof(obj)
}

function _extends() {
  _extends =
    Object.assign ||
    function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key]
          }
        }
      }

      return target
    }

  return _extends.apply(this, arguments)
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i]
    descriptor.enumerable = descriptor.enumerable || false
    descriptor.configurable = true
    if ('value' in descriptor) descriptor.writable = true
    Object.defineProperty(target, descriptor.key, descriptor)
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps)
  if (staticProps) _defineProperties(Constructor, staticProps)
  return Constructor
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
    return call
  }

  return _assertThisInitialized(self)
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o)
      }
  return _getPrototypeOf(o)
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function')
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true,
    },
  })
  if (superClass) _setPrototypeOf(subClass, superClass)
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p
      return o
    }

  return _setPrototypeOf(o, p)
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    )
  }

  return self
}

var googleAutoSuggestURL =
  '//suggestqueries.google.com/complete/search?client=youtube&ds=yt&q='

var Core =
  /*#__PURE__*/
  (function(_React$Component) {
    _inherits(Core, _React$Component)

    function Core(props) {
      var _this

      _classCallCheck(this, Core)

      _this = _possibleConstructorReturn(
        this,
        _getPrototypeOf(Core).call(this, props),
      )
      _this.handleInputValueChange = _this.handleInputValueChange.bind(
        _assertThisInitialized(_assertThisInitialized(_this)),
      )
      _this.fetchData = _this.fetchData.bind(
        _assertThisInitialized(_assertThisInitialized(_this)),
      )
      _this.getSearchSuggestions = _this.getSearchSuggestions.bind(
        _assertThisInitialized(_assertThisInitialized(_this)),
      )
      _this.state = {
        inputValue: '',
        searchSuggestions: [],
      }
      return _this
    }

    _createClass(Core, [
      {
        key: 'getSearchSuggestions',
        value: function getSearchSuggestions() {
          var data =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : []
          var result = []
          result = data.map(function(elem) {
            return {
              text: elem[0],
              id: _shortid.default.generate(),
            }
          })
          return result
        },
      },
      {
        key: 'fetchData',
        value: function fetchData(query) {
          var self = this
          ;(0, _jsonp.default)(
            ''.concat(googleAutoSuggestURL).concat(query),
            function(error, data) {
              if (error) {
                console.log('error: \n        '.concat(error))
              }

              var searchResult = data[1]
              self.state.searchSuggestions = self.getSearchSuggestions(
                searchResult,
              )
            },
          ) // for some reason, `fetch (https://github.com/github/fetch)` does not work on localhost hosting enviromnet due to CORS problems. But for some reason, jsonp works without any problems...
        },
      },
      {
        key: 'handleInputValueChange',
        value: function handleInputValueChange(_inputValue) {
          this.setState({
            inputValue: _inputValue,
          })
          this.fetchData(_inputValue)
        },
      },
      {
        key: 'handleItemToString',
        value: function handleItemToString(item) {
          return item ? item.text : ''
        },
      },
      {
        key: 'render',
        value: function render() {
          var searchSuggestions = this.state.searchSuggestions
          var _this$props = this.props,
            _this$props$useMui = _this$props.useMui,
            useMui = _this$props$useMui === void 0 ? true : _this$props$useMui,
            _this$props$inputId = _this$props.inputId,
            inputId =
              _this$props$inputId === void 0
                ? 'youtube-autocomplete-input'
                : _this$props$inputId,
            _this$props$menuId = _this$props.menuId,
            menuId =
              _this$props$menuId === void 0
                ? 'youtube-autocomplete-menu'
                : _this$props$menuId,
            _this$props$itemClass = _this$props.itemClassName,
            itemClassName =
              _this$props$itemClass === void 0
                ? 'youtube-autocomplete-items'
                : _this$props$itemClass,
            _this$props$theme = _this$props.theme,
            theme =
              _this$props$theme === void 0
                ? (0, _styles.createMuiTheme)({
                    primary: _blue.default,
                  })
                : _this$props$theme
          return _react.default.createElement(
            _downshift.default,
            {
              onInputValueChange: this.handleInputValueChange,
              itemToString: this.handleItemToString,
            },
            function(_ref) {
              var getInputProps = _ref.getInputProps,
                getItemProps = _ref.getItemProps,
                getMenuProps = _ref.getMenuProps,
                isOpen = _ref.isOpen
              return _react.default.createElement(
                'div',
                null,
                useMui
                  ? _react.default.createElement(
                      _react.default.Fragment,
                      null,
                      _react.default.createElement(
                        _styles.MuiThemeProvider,
                        {
                          theme: theme,
                        },
                        _react.default.createElement(
                          _Input.default,
                          getInputProps({
                            placeholder: 'Search Youtube',
                            fullWidth: true,
                          }),
                        ),
                        isOpen
                          ? _react.default.createElement(
                              _Paper.default,
                              _extends(
                                {
                                  square: true,
                                },
                                getMenuProps(),
                              ),
                              searchSuggestions.map(function(item, index) {
                                return _react.default.createElement(
                                  _MenuItem.default,
                                  getItemProps({
                                    key: item.id,
                                    index: index,
                                    item: item,
                                    style: {
                                      zIndex: 1,
                                    },
                                  }),
                                  item.text,
                                )
                              }),
                            )
                          : null,
                        ' ',
                      ),
                    )
                  : _react.default.createElement(
                      _react.default.Fragment,
                      null,
                      _react.default.createElement(
                        'input',
                        _extends(
                          {
                            id: inputId,
                          },
                          getInputProps({
                            placeholder: 'Search Youtube',
                          }),
                        ),
                      ),
                      isOpen
                        ? _react.default.createElement(
                            'div',
                            _extends(
                              {
                                id: menuId,
                              },
                              getMenuProps(),
                            ),
                            searchSuggestions.map(function(item, index) {
                              return _react.default.createElement(
                                'div',
                                _extends(
                                  {
                                    className: itemClassName,
                                  },
                                  getItemProps({
                                    key: item.id,
                                    index: index,
                                    item: item,
                                  }),
                                ),
                                item.text,
                              )
                            }),
                          )
                        : null,
                    ),
              )
            },
          )
        },
      },
    ])

    return Core
  })(_react.default.Component)

var _default = Core
exports.default = _default
;('use strict')

function _typeof2(obj) {
  if (typeof Symbol === 'function' && _typeof3(Symbol.iterator) === 'symbol') {
    _typeof2 = function _typeof2(obj) {
      return _typeof3(obj)
    }
  } else {
    _typeof2 = function _typeof2(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : _typeof3(obj)
    }
  }

  return _typeof2(obj)
}

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0

var _react = _interopRequireDefault(require('react'))

var _downshift = _interopRequireDefault(require('downshift'))

var _propTypes = _interopRequireDefault(require('prop-types'))

var _Input = _interopRequireDefault(require('@material-ui/core/Input'))

var _Paper = _interopRequireDefault(require('@material-ui/core/Paper'))

var _MenuItem = _interopRequireDefault(require('@material-ui/core/MenuItem'))

var _jsonp = _interopRequireDefault(require('jsonp'))

var _shortid = _interopRequireDefault(require('shortid'))

var _styles = require('@material-ui/core/styles')

var _blue = _interopRequireDefault(require('@material-ui/core/colors/blue'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule
    ? obj
    : {
        default: obj,
      }
}

function _typeof(obj) {
  if (typeof Symbol === 'function' && _typeof2(Symbol.iterator) === 'symbol') {
    _typeof = function _typeof(obj) {
      return _typeof2(obj)
    }
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : _typeof2(obj)
    }
  }

  return _typeof(obj)
}

function _extends() {
  _extends =
    Object.assign ||
    function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key]
          }
        }
      }

      return target
    }

  return _extends.apply(this, arguments)
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i]
    descriptor.enumerable = descriptor.enumerable || false
    descriptor.configurable = true
    if ('value' in descriptor) descriptor.writable = true
    Object.defineProperty(target, descriptor.key, descriptor)
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps)
  if (staticProps) _defineProperties(Constructor, staticProps)
  return Constructor
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
    return call
  }

  return _assertThisInitialized(self)
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o)
      }
  return _getPrototypeOf(o)
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function')
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true,
    },
  })
  if (superClass) _setPrototypeOf(subClass, superClass)
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p
      return o
    }

  return _setPrototypeOf(o, p)
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    )
  }

  return self
}

var googleAutoSuggestURL =
  '//suggestqueries.google.com/complete/search?client=youtube&ds=yt&q='

var Core =
  /*#__PURE__*/
  (function(_React$Component) {
    _inherits(Core, _React$Component)

    function Core(props) {
      var _this

      _classCallCheck(this, Core)

      _this = _possibleConstructorReturn(
        this,
        _getPrototypeOf(Core).call(this, props),
      )
      _this.handleInputValueChange = _this.handleInputValueChange.bind(
        _assertThisInitialized(_assertThisInitialized(_this)),
      )
      _this.fetchData = _this.fetchData.bind(
        _assertThisInitialized(_assertThisInitialized(_this)),
      )
      _this.getSearchSuggestions = _this.getSearchSuggestions.bind(
        _assertThisInitialized(_assertThisInitialized(_this)),
      )
      _this.state = {
        inputValue: '',
        searchSuggestions: [],
      }
      return _this
    }

    _createClass(Core, [
      {
        key: 'getSearchSuggestions',
        value: function getSearchSuggestions() {
          var data =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : []
          var result = []
          result = data.map(function(elem) {
            return {
              text: elem[0],
              id: _shortid.default.generate(),
            }
          })
          return result
        },
      },
      {
        key: 'fetchData',
        value: function fetchData(query) {
          var self = this
          ;(0, _jsonp.default)(
            ''.concat(googleAutoSuggestURL).concat(query),
            function(error, data) {
              if (error) {
                console.log('error: \n        '.concat(error))
              }

              var searchResult = data[1]
              self.state.searchSuggestions = self.getSearchSuggestions(
                searchResult,
              )
            },
          ) // for some reason, `fetch (https://github.com/github/fetch)` does not work on localhost hosting enviromnet due to CORS problems. But for some reason, jsonp works without any problems...
        },
      },
      {
        key: 'handleInputValueChange',
        value: function handleInputValueChange(_inputValue) {
          this.setState({
            inputValue: _inputValue,
          })
          this.fetchData(_inputValue)
        },
      },
      {
        key: 'handleItemToString',
        value: function handleItemToString(item) {
          item ? item.text : ''
        },
      },
      {
        key: 'render',
        value: function render() {
          var searchSuggestions = this.state.searchSuggestions
          var _this$props = this.props,
            _this$props$useMui = _this$props.useMui,
            useMui = _this$props$useMui === void 0 ? true : _this$props$useMui,
            _this$props$inputId = _this$props.inputId,
            inputId =
              _this$props$inputId === void 0
                ? 'youtube-autocomplete-input'
                : _this$props$inputId,
            _this$props$menuId = _this$props.menuId,
            menuId =
              _this$props$menuId === void 0
                ? 'youtube-autocomplete-menu'
                : _this$props$menuId,
            _this$props$itemClass = _this$props.itemClassName,
            itemClassName =
              _this$props$itemClass === void 0
                ? 'youtube-autocomplete-items'
                : _this$props$itemClass,
            _this$props$theme = _this$props.theme,
            theme =
              _this$props$theme === void 0
                ? (0, _styles.createMuiTheme)({
                    primary: _blue.default,
                  })
                : _this$props$theme
          return _react.default.createElement(
            _downshift.default,
            {
              onInputValueChange: this.handleInputValueChange,
              itemToString: this.handleItemToString,
            },
            function(_ref) {
              var getInputProps = _ref.getInputProps,
                getItemProps = _ref.getItemProps,
                getMenuProps = _ref.getMenuProps,
                isOpen = _ref.isOpen
              return _react.default.createElement(
                'div',
                null,
                useMui
                  ? _react.default.createElement(
                      _react.default.Fragment,
                      null,
                      _react.default.createElement(
                        _styles.MuiThemeProvider,
                        {
                          theme: theme,
                        },
                        _react.default.createElement(
                          _Input.default,
                          getInputProps({
                            placeholder: 'Search Youtube',
                            fullWidth: true,
                          }),
                        ),
                        isOpen
                          ? _react.default.createElement(
                              _Paper.default,
                              _extends(
                                {
                                  square: true,
                                },
                                getMenuProps(),
                              ),
                              searchSuggestions.map(function(item, index) {
                                return _react.default.createElement(
                                  _MenuItem.default,
                                  getItemProps({
                                    key: item.id,
                                    index: index,
                                    item: item,
                                    style: {
                                      zIndex: 1,
                                    },
                                  }),
                                  item.text,
                                )
                              }),
                            )
                          : null,
                        ' ',
                      ),
                    )
                  : _react.default.createElement(
                      _react.default.Fragment,
                      null,
                      _react.default.createElement(
                        'input',
                        _extends(
                          {
                            id: inputId,
                          },
                          getInputProps({
                            placeholder: 'Search Youtube',
                          }),
                        ),
                      ),
                      isOpen
                        ? _react.default.createElement(
                            'div',
                            _extends(
                              {
                                id: menuId,
                              },
                              getMenuProps(),
                            ),
                            searchSuggestions.map(function(item, index) {
                              return _react.default.createElement(
                                'div',
                                _extends(
                                  {
                                    className: itemClassName,
                                  },
                                  getItemProps({
                                    key: item.id,
                                    index: index,
                                    item: item,
                                  }),
                                ),
                                item.text,
                              )
                            }),
                          )
                        : null,
                    ),
              )
            },
          )
        },
      },
    ])

    return Core
  })(_react.default.Component)

var _default = Core
exports.default = _default
