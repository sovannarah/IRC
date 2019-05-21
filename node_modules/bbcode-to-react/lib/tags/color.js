'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tag = require('../tag');

var _tag2 = _interopRequireDefault(_tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // https://github.com/vishnevskiy/bbcodejs/blob/master/src/coffee/tags.coffee


var ColorTag = function (_Tag) {
  _inherits(ColorTag, _Tag);

  function ColorTag() {
    _classCallCheck(this, ColorTag);

    return _possibleConstructorReturn(this, (ColorTag.__proto__ || Object.getPrototypeOf(ColorTag)).apply(this, arguments));
  }

  _createClass(ColorTag, [{
    key: 'toHTML',
    value: function toHTML() {
      var color = this.params.color;

      if (!color) {
        return this.getContent();
      }

      return ['<span style="color:' + color + '">', this.getContent(), '</span>'];
    }
  }, {
    key: 'toReact',
    value: function toReact() {
      var color = this.params.color;

      if (!color) {
        return this.getComponents();
      }

      return _react2.default.createElement(
        'span',
        { style: { color: color } },
        this.getComponents()
      );
    }
  }]);

  return ColorTag;
}(_tag2.default);

exports.default = ColorTag;