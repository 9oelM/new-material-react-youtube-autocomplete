"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Core = _interopRequireDefault(require("../components/Core"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  Kind of a wrapper. Provided for future extension to other functions. 
*/
var YoutubeAutocomplete = function YoutubeAutocomplete(_ref) {
  var useMui = _ref.useMui,
      inputId = _ref.inputId,
      menuId = _ref.menuId,
      itemClassName = _ref.itemClassName,
      theme = _ref.theme;
  return _react.default.createElement(_Core.default, {
    useMui: useMui,
    inputId: inputId,
    menuId: menuId,
    itemClassName: itemClassName,
    theme: theme
  });
};

YoutubeAutocomplete.propTypes = {
  theme: _propTypes.default.func.isRequired
};
var _default = YoutubeAutocomplete;
exports.default = _default;
