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


var LinkTag = function (_Tag) {
  _inherits(LinkTag, _Tag);

  function LinkTag() {
    _classCallCheck(this, LinkTag);

    return _possibleConstructorReturn(this, (LinkTag.__proto__ || Object.getPrototypeOf(LinkTag)).apply(this, arguments));
  }

  _createClass(LinkTag, [{
    key: 'toHTML',
    value: function toHTML() {
      var _this2 = this;

      var url = this.renderer.strip(this.params[this.name] || this.getContent(true));
      if (/javascript:/i.test(url)) {
        url = '';
      }

      if (!url || !url.length) {
        return this.getContent();
      }

      return this.renderer.context({ linkify: false }, function () {
        return ['<a href="' + url + '" target="_blank">', _this2.getContent(), '</a>'];
      });
    }
  }, {
    key: 'toReact',
    value: function toReact() {
      var url = this.renderer.strip(this.params[this.name] || this.getContent(true));
      if (/javascript:/i.test(url)) {
        url = '';
      }

      if (!url || !url.length) {
        return this.getComponents();
      }

      if (this.name === 'email') {
        url = 'mailto:' + url;
      }

      return _react2.default.createElement(
        'a',
        { href: url, target: '_blank', rel: 'noopener noreferrer' },
        this.getComponents()
      );
    }
  }]);

  return LinkTag;
}(_tag2.default);

exports.default = LinkTag;