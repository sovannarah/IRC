'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('./constants');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Renderer = function () {
  function Renderer(options) {
    _classCallCheck(this, Renderer);

    this.options = _extends({
      linkify: false
    }, options);
    this.contexts = [];
  }

  _createClass(Renderer, [{
    key: 'context',
    value: function context(_context, func) {
      var newOptions = _extends({}, this.options, _context);
      this.contexts.push(this.options);
      this.options = newOptions;
      var v = func();
      this.options = this.contexts.pop();
      return v;
    }
  }, {
    key: 'escape',
    value: function escape(value) {
      // Escapes a string so it is valid within XML or XHTML
      return value.replace(_constants.ESCAPE_RE, function (match) {
        return _constants.ESCAPE_DICT[match];
      });
    }
  }, {
    key: 'linkify',
    value: function linkify(value) {
      return value.replace(_constants.URL_RE, function () {
        var url = arguments.length <= 1 ? undefined : arguments[1];
        var proto = arguments.length <= 2 ? undefined : arguments[2];

        if (proto && ['http', 'https'].indexOf(proto) === -1) {
          return url; // bad protocol, no linkify
        }

        var href = proto ? url : 'http://' + url;

        return '<a href="' + href + '" target="_blank">' + url + '</a>';
      });
    }
  }, {
    key: 'strip',
    value: function strip(text) {
      return text.replace(/^\s+|\s+$/g, '');
    }
  }, {
    key: 'cosmeticReplace',
    value: function cosmeticReplace(value) {
      return value.replace(_constants.COSMETIC_RE, function () {
        var item = arguments.length <= 0 ? undefined : arguments[0];
        return _constants.COSMETIC_DICT[item] || item;
      });
    }
  }, {
    key: 'htmlAttributes',
    value: function htmlAttributes(attributes) {
      if (!attributes) {
        return '';
      }

      return Object.keys(attributes).map(function (k) {
        return k + '="' + attributes[k] + '"';
      }).join(' ');
    }
  }]);

  return Renderer;
}();

exports.default = Renderer;