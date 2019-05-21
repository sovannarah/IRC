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


var ListTag = function (_Tag) {
  _inherits(ListTag, _Tag);

  function ListTag(renderer) {
    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, ListTag);

    var _this = _possibleConstructorReturn(this, (ListTag.__proto__ || Object.getPrototypeOf(ListTag)).call(this, renderer, settings));

    _this.STRIP_INNER = true;
    _this.STRIP_OUTER = true;
    return _this;
  }

  _createClass(ListTag, [{
    key: 'toHTML',
    value: function toHTML() {
      var listType = this.params.list;

      if (listType === '1') {
        return ['<ol>', this.getContent(), '</ol>'];
      }

      if (listType === 'a') {
        return ['<ol style="list-style-type:lower-alpha;">', this.getContent(), '</ol>'];
      }

      if (listType === 'A') {
        return ['<ol style="list-style-type:upper-alpha;">', this.getContent(), '</ol>'];
      }

      return ['<ul>', this.getContent(), '</ul>'];
    }
  }, {
    key: 'toReact',
    value: function toReact() {
      var listType = this.params.list;

      var listTypes = {
        a: 'lower-alpha',
        A: 'upper-alpha',
        i: 'lower-roman',
        I: 'upper-roman',
        '1': 'decimal'
      };

      if (listTypes[listType]) {
        return _react2.default.createElement(
          'ol',
          {
            style: {
              listStyleType: listTypes[listType]
            }
          },
          this.getComponents()
        );
      }

      return _react2.default.createElement(
        'ul',
        null,
        this.getComponents()
      );
    }
  }]);

  return ListTag;
}(_tag2.default);

exports.default = ListTag;