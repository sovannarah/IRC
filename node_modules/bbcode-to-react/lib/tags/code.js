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


var CodeTag = function (_Tag) {
  _inherits(CodeTag, _Tag);

  function CodeTag(renderer) {
    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, CodeTag);

    var _this = _possibleConstructorReturn(this, (CodeTag.__proto__ || Object.getPrototypeOf(CodeTag)).call(this, renderer, settings));

    _this.STRIP_INNER = true;
    _this.inline = _this.params.code === 'inline';

    if (!_this.inline) {
      _this.STRIP_OUTER = true;
    }
    return _this;
  }

  _createClass(CodeTag, [{
    key: 'toHTML',
    value: function toHTML() {
      if (this.inline) {
        return ['<code>', this.getContent(true), '</code>'];
      }
      var lang = this.params.lang || this.params[this.name];
      if (lang) {
        return ['<pre class="prettyprint lang-' + lang + '">', this.getContent(true), '</pre>'];
      }
      return ['<pre>', this.getContent(true), '</pre>'];
    }
  }, {
    key: 'toReact',
    value: function toReact() {
      if (this.inline) {
        return _react2.default.createElement(
          'code',
          null,
          this.getContent(true)
        );
      }
      var lang = this.params.lang || this.params[this.name];

      var className = 'prettyprint';
      if (lang) {
        className += ' lang-' + lang;
      }
      return _react2.default.createElement(
        'pre',
        { className: className },
        this.getContent(true)
      );
    }
  }]);

  return CodeTag;
}(_tag2.default);

exports.default = CodeTag;