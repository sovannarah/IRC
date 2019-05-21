'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // https://github.com/vishnevskiy/bbcodejs/blob/master/src/coffee/tags.coffee


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tag = function () {
  function Tag(renderer) {
    var _this = this;

    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Tag);

    this.renderer = renderer;
    this.CLOSED_BY = [];
    this.SELF_CLOSE = false;
    this.STRIP_INNER = false;
    this.STRIP_OUTER = false;
    this.DISCARD_TEXT = false;

    this.name = settings.name || null;
    this.parent = settings.parent || null;
    this.text = settings.text || '';
    this.params = {};
    this.children = [];

    if (this.parent) {
      this.parent.children.push(this);
    }

    settings.params = settings.params || [];

    settings.params.forEach(function (item) {
      if (item.length > 1 && item[1]) {
        _this.params[item[0]] = item[1];
      }
    });
  }

  _createClass(Tag, [{
    key: 'getComponents',
    value: function getComponents() {
      var _this2 = this;

      var components = [];
      if (this.text && this.text.length) {
        // todo linkify and emotion
        components.push(this.text);
      }

      this.children.forEach(function (child) {
        if (!(_this2.DISCARD_TEXT && child.name === null)) {
          var childComponents = child.toReact();
          components.push(childComponents);
        }
      });

      return _react2.default.Children.toArray(components);
    }
  }, {
    key: 'getContent',
    value: function getContent() {
      var _this3 = this;

      var raw = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var pieces = [];
      var text = void 0;
      var content = void 0;

      if (this.text && this.text.length) {
        text = this.renderer.escape(this.text);

        if (!raw) {
          if (this.renderer.options.linkify) {
            text = this.renderer.linkify(text);
          }
          text = this.renderer.cosmeticReplace(text.replace(_constants.NEWLINE_RE, _constants.LINE_BREAK));
        }

        pieces.push(text);
      }

      this.children.forEach(function (child) {
        if (raw) {
          pieces.push(child.toText());
        } else {
          if (!(_this3.DISCARD_TEXT && child.name === null)) {
            var childPieces = child.toHTML();
            if (typeof childPieces === 'string') {
              pieces.push(childPieces);
            } else {
              pieces.push.apply(pieces, _toConsumableArray(childPieces));
            }
          }
        }
      });

      content = pieces.join('');

      if (!raw && this.STRIP_INNER) {
        content = this.renderer.strip(content);

        while (content.slice(0, _constants.LINE_BREAK.length) === _constants.LINE_BREAK) {
          content = content.slice(_constants.LINE_BREAK.length);
        }
        while (content.slice(-_constants.LINE_BREAK.length) === _constants.LINE_BREAK) {
          content = content.slice(0, -_constants.LINE_BREAK.length);
        }
        content = this.renderer.strip(content);
      }
      return content;
    }
  }, {
    key: 'toText',
    value: function toText() {
      var _this4 = this;

      var contentAsHTML = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var pieces = [];

      if (this.name !== null) {
        if (this.params.length) {
          var params = Object.keys(this.params).map(function (k) {
            return k + '=' + _this4.params[k];
          }).join(' ');

          if (this.params[this.name]) {
            pieces.push('[' + params + ']');
          } else {
            pieces.push('[' + this.name + ' ' + params + ']');
          }
        } else {
          pieces.push('[' + this.name + ']');
        }
      }

      pieces.push(this.getContent(!contentAsHTML));

      if (this.name !== null && this.CLOSED_BY.indexOf(this.name) === -1) {
        pieces.push('[/' + this.name + ']');
      }

      return pieces.join('');
    }
  }, {
    key: 'toHTML',
    value: function toHTML() {
      var pieces = this.toText(true);

      return typeof pieces === 'string' ? pieces : pieces.join('');
    }
  }, {
    key: 'toReact',
    value: function toReact() {
      return _react2.default.Children.toArray(this.getComponents());
    }
  }]);

  return Tag;
}();

exports.default = Tag;