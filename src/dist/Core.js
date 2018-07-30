"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _downshift = _interopRequireDefault(require("downshift"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Input = _interopRequireDefault(require("@material-ui/core/Input"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

var _jsonp = _interopRequireDefault(require("jsonp"));

var _shortid = _interopRequireDefault(require("shortid"));

var _styles = require("@material-ui/core/styles");

var _blue = _interopRequireDefault(require("@material-ui/core/colors/blue"));

var _youtubeSearch = _interopRequireDefault(require("youtube-search"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var Core =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Core, _React$Component);

  function Core(props) {
    var _this;

    _classCallCheck(this, Core);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Core).call(this, props));
    _this.handleInputValueChange = _this.handleInputValueChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleItemToString = _this.handleItemToString.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.fetchSuggestionResults = _this.fetchSuggestionResults.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.fetchSearchResults = _this.fetchSearchResults.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getSearchSuggestions = _this.getSearchSuggestions.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleOnSelect = _this.handleOnSelect.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      inputValue: '',
      searchSuggestions: [],
      isMenuOpen: true
    };
    return _this;
  }

  _createClass(Core, [{
    key: "getSearchSuggestions",
    value: function getSearchSuggestions() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var result = data.map(function (elem) {
        return {
          text: elem[0],
          id: _shortid.default.generate()
        };
      });
      return _toConsumableArray(result);
    }
  }, {
    key: "fetchSuggestionResults",
    value: function fetchSuggestionResults(query) {
      var self = this,
          googleAutoSuggestURL = '//suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=';
      (0, _jsonp.default)("".concat(googleAutoSuggestURL).concat(query), function (error, data) {
        if (error && self.props.onSuggestError) {
          self.props.onSuggestError(error);
          return;
        }

        var searchResult = data[1];
        self.state.searchSuggestions = self.getSearchSuggestions(searchResult);
      }); // use jsonp at your risk
    }
  }, {
    key: "fetchSearchResults",
    value: function fetchSearchResults(searchWord) {
      var self = this;
      var option = this.props.option;

      var opt = _objectSpread({
        maxResults: 15
      }, option);

      (0, _youtubeSearch.default)(searchWord, opt, function (err, results) {
        if (err && self.props.onSearchError) {
          self.props.onSearchError(err);
          return;
        }

        self.props.onSearchResults ? self.props.onSearchResults(results) : function () {};
      });
    }
  }, {
    key: "handleInputValueChange",
    value: function handleInputValueChange(_inputValue) {
      this.fetchSuggestionResults(_inputValue);
      this.setState({
        inputValue: _inputValue
      });
    }
  }, {
    key: "handleItemToString",
    value: function handleItemToString(item) {
      return item ? item.text : '';
    }
  }, {
    key: "handleOnSelect",
    value: function handleOnSelect(selectedItem, stateAndHelpers) {
      var onSearchTrigger = this.props.onSearchTrigger;
      this.fetchSearchResults(selectedItem.text);
      this.setState({
        isMenuOpen: false
      });
      onSearchTrigger ? onSearchTrigger(selectedItem.text) : function (f) {
        return f;
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          searchSuggestions = _this$state.searchSuggestions,
          isMenuOpen = _this$state.isMenuOpen;
      var _this$props = this.props,
          _this$props$useMui = _this$props.useMui,
          useMui = _this$props$useMui === void 0 ? true : _this$props$useMui,
          _this$props$inputId = _this$props.inputId,
          inputId = _this$props$inputId === void 0 ? 'youtube-autocomplete-input' : _this$props$inputId,
          _this$props$menuId = _this$props.menuId,
          menuId = _this$props$menuId === void 0 ? 'youtube-autocomplete-menu' : _this$props$menuId,
          _this$props$itemClass = _this$props.itemClassName,
          itemClassName = _this$props$itemClass === void 0 ? 'youtube-autocomplete-items' : _this$props$itemClass,
          _this$props$theme = _this$props.theme,
          theme = _this$props$theme === void 0 ? (0, _styles.createMuiTheme)({
        primary: _blue.default
      }) : _this$props$theme,
          _this$props$placehold = _this$props.placeholderText,
          placeholderText = _this$props$placehold === void 0 ? 'Search youtube' : _this$props$placehold,
          onSearchTrigger = _this$props.onSearchTrigger;
      return _react.default.createElement("div", {
        id: "youtube-autocomplete"
      }, _react.default.createElement(_downshift.default, {
        onInputValueChange: this.handleInputValueChange,
        itemToString: this.handleItemToString,
        isOpen: isMenuOpen,
        onSelect: this.handleOnSelect
      }, function (_ref) {
        var getInputProps = _ref.getInputProps,
            getItemProps = _ref.getItemProps,
            getMenuProps = _ref.getMenuProps,
            isOpen = _ref.isOpen,
            onKeyDown = _ref.onKeyDown;
        return _react.default.createElement("div", null, useMui ? _react.default.createElement(_styles.MuiThemeProvider, {
          theme: theme
        }, _react.default.createElement(_Input.default, getInputProps({
          placeholder: placeholderText,
          fullWidth: true,
          onKeyDown: function onKeyDown(e) {
            _this2.setState({
              isMenuOpen: true
            });

            if (e.key === 'Enter') {
              // it processes it too fast that the previous inputValue is searched. 
              _this2.fetchSearchResults(_this2.state.inputValue);

              _this2.setState({
                isMenuOpen: false
              });

              onSearchTrigger ? onSearchTrigger(_this2.state.inputValue) : function (f) {
                return f;
              };
            }
          }
        })), isOpen ? _react.default.createElement(_Paper.default, _extends({
          square: true
        }, getMenuProps()), searchSuggestions.map(function (item, index) {
          return _react.default.createElement(_MenuItem.default, getItemProps({
            key: item.id,
            index: index,
            item: item,
            style: {
              zIndex: 1
            }
          }), item.text);
        })) : null) : _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("input", _extends({
          id: inputId
        }, getInputProps({
          placeholder: placeholderText,
          fullWidth: true,
          onKeyDown: function onKeyDown(e) {
            _this2.setState({
              isMenuOpen: true
            });

            if (e.key === 'Enter') {
              _this2.fetchSearchResults(_this2.state.inputValue);

              _this2.setState({
                isMenuOpen: false
              });

              onSearchTrigger ? onSearchTrigger(_this2.state.inputValue) : function (f) {
                return f;
              };
            }
          }
        }))), isOpen ? _react.default.createElement("div", _extends({
          id: menuId
        }, getMenuProps()), searchSuggestions.map(function (item, index) {
          return _react.default.createElement("div", _extends({
            className: itemClassName
          }, getItemProps({
            key: item.id,
            index: index,
            item: item,
            style: {
              zIndex: 1
            }
          })), item.text);
        })) : null));
      }));
    }
  }]);

  return Core;
}(_react.default.Component);

var _default = Core;
exports.default = _default;