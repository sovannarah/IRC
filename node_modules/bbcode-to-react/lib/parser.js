'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // https://github.com/vishnevskiy/bbcodejs/blob/master/src/coffee/parser.coffee


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constants = require('./constants');

var _tags = require('./tags');

var _tags2 = _interopRequireDefault(_tags);

var _tag = require('./tag');

var _tag2 = _interopRequireDefault(_tag);

var _renderer = require('./renderer');

var _renderer2 = _interopRequireDefault(_renderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Parser = function () {
  function Parser() {
    var _this = this;

    var allowedTags = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, Parser);

    this.tags = {};

    if (!allowedTags) {
      this.tags = _tags2.default;
    } else {
      allowedTags.forEach(function (name) {
        if (_tags2.default[name]) {
          _this.tags[name] = _tags2.default[name];
        }
      });
    }

    this.renderer = new _renderer2.default();
  }

  _createClass(Parser, [{
    key: 'registerTag',
    value: function registerTag(name, tag) {
      this.tags[name] = tag;
    }
  }, {
    key: 'parseParams',
    value: function parseParams(token) {
      var params = [];

      function addParam(name, value) {
        if (name) {
          var n = name.trim();
          // ignore on* events attribute
          if (n.length && n.toLowerCase().indexOf('on') !== 0) {
            params.push([n, value]);
          }
        }
      }

      if (token) {
        var key = [];
        var target = key;
        var value = [];
        var terminate = ' ';
        var skipNext = false;

        Array.from(token).forEach(function (c) {
          if (skipNext) {
            skipNext = false;
          } else if (target === key && c === '=') {
            target = value;
          } else if (target === key && c === ':') {
            target = value;
          } else if (!value.length && c === '"') {
            terminate = c;
          } else if (c !== terminate) {
            target.push(c);
          } else {
            addParam(key.join(''), value.join(''));

            if (!_constants.SPACE_RE.test(terminate)) {
              skipNext = true;
            }

            target = key = [];
            value = [];
            terminate = ' ';
          }
        });

        addParam(key.join(''), value.join(''));
      }

      return params;
    }
  }, {
    key: 'createTextNode',
    value: function createTextNode(parent, text) {
      var ref = parent.children.slice(-1)[0];
      //console.log('ref', ref, text)
      if (ref != null && ref.STRIP_OUTER) {
        text = text.replace(_constants.START_NEWLINE_RE, '');
      }

      return new _tag2.default(this.renderer, { text: text, parent: parent });
    }
  }, {
    key: 'parse',
    value: function parse(input) {
      var root = new _tag2.default(this.renderer);
      var tokens = input.split(_constants.TOKEN_RE);
      var current = root;
      var token = null;
      while (tokens.length) {
        token = tokens.shift();
        if (!token.length) {
          continue;
        }

        if (token.match(_constants.TOKEN_RE)) {
          var params = this.parseParams(token.slice(1, -1));
          var tagName = params[0][0].toLowerCase();

          if (current.CLOSED_BY.indexOf(tagName) > -1) {
            tokens.unshift(token);
            tagName = '/' + current.name;
            params = [];
          }

          if (tagName[0] === '/') {
            tagName = tagName.slice(1);
            if (!this.tags[tagName]) {
              this.createTextNode(current, token);
              continue;
            }

            if (current.name === tagName) {
              current = current.parent;
            }
          } else {
            var cls = this.tags[tagName];
            if (!cls) {
              this.createTextNode(current, token);
              continue;
            }

            var tag = new cls(this.renderer, {
              name: tagName,
              parent: current,
              params: params
            });

            if (!tag.SELF_CLOSE && (tag.CLOSED_BY.indexOf(tagName) < 0 || current.name !== tagName)) {
              current = tag;
            }
          }
        } else {
          this.createTextNode(current, token);
        }
      }

      return root;
    }
  }, {
    key: 'toHTML',
    value: function toHTML(input) {
      return this.parse(input).toHTML();
    }
  }, {
    key: 'toReact',
    value: function toReact(input) {
      return this.parse(input).toReact();
    }
  }]);

  return Parser;
}();

exports.default = Parser;