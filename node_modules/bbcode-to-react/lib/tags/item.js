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


var ListItemTag = function (_Tag) {
  _inherits(ListItemTag, _Tag);

  function ListItemTag(renderer) {
    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, ListItemTag);

    var _this = _possibleConstructorReturn(this, (ListItemTag.__proto__ || Object.getPrototypeOf(ListItemTag)).call(this, renderer, settings));

    _this.CLOSED_BY = ['*', '/list'];
    _this.STRIP_INNER = true;
    return _this;
  }

  _createClass(ListItemTag, [{
    key: 'toHTML',
    value: function toHTML() {
      return ['<li>', this.getContent(), '</li>'];
    }
  }, {
    key: 'toReact',
    value: function toReact() {
      return _react2.default.createElement(
        'li',
        null,
        this.getComponents()
      );
    }
  }]);

  return ListItemTag;
}(_tag2.default);

exports.default = ListItemTag;