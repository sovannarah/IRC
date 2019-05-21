(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define("bbcode-to-react", ["react"], factory);
	else if(typeof exports === 'object')
		exports["bbcode-to-react"] = factory(require("react"));
	else
		root["bbcode-to-react"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(4);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // https://github.com/vishnevskiy/bbcodejs/blob/master/src/coffee/tags.coffee
	
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _constants = __webpack_require__(3);
	
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

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var NEWLINE_RE = exports.NEWLINE_RE = /\r?\n/g;
	var LINE_BREAK = exports.LINE_BREAK = '<br />';
	
	var SPACE_RE = exports.SPACE_RE = /^\s*$/;
	var TOKEN_RE = exports.TOKEN_RE = /(\[\/?.+?\])/;
	var START_NEWLINE_RE = exports.START_NEWLINE_RE = /^\r?\n/;
	
	var ESCAPE_RE = exports.ESCAPE_RE = /[&<>"]/g;
	var ESCAPE_DICT = exports.ESCAPE_DICT = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;'
	};
	
	var URL_RE = exports.URL_RE = /\b((?:([\w-]+):(\/{1,3})|www[.])(?:(?:(?:[^\s&()]|&amp;|&quot;)*(?:[^!"#$%&'()*+,.:;<=>?@\[\]^`{|}~\s]))|(?:\((?:[^\s&()]|&amp;|&quot;)*\)))+)/g;
	
	var COSMETIC_DICT = exports.COSMETIC_DICT = {
	  '--': '&ndash;',
	  '---': '&mdash;',
	  '...': '&#8230;',
	  '(c)': '&copy;',
	  '(reg)': '&reg;',
	  '(tm)': '&trade;'
	};
	
	var COSMETIC_RE = exports.COSMETIC_RE = /--|---|\.\.\.|\(c\)|\(reg\)|\(tm\)/;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _parser = __webpack_require__(5);
	
	var _parser2 = _interopRequireDefault(_parser);
	
	var _tag = __webpack_require__(1);
	
	var _tag2 = _interopRequireDefault(_tag);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// export default new Parser();
	
	// export {
	//   Parser,
	//   Tag
	// };
	
	module.exports = new _parser2.default();
	module.exports.Parser = _parser2.default;
	module.exports.Tag = _tag2.default;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // https://github.com/vishnevskiy/bbcodejs/blob/master/src/coffee/parser.coffee
	
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _constants = __webpack_require__(3);
	
	var _tags = __webpack_require__(12);
	
	var _tags2 = _interopRequireDefault(_tags);
	
	var _tag = __webpack_require__(1);
	
	var _tag2 = _interopRequireDefault(_tag);
	
	var _renderer = __webpack_require__(6);
	
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

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _constants = __webpack_require__(3);
	
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

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _tag = __webpack_require__(1);
	
	var _tag2 = _interopRequireDefault(_tag);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // https://github.com/vishnevskiy/bbcodejs/blob/master/src/coffee/tags.coffee
	
	
	var CenterTag = function (_Tag) {
	  _inherits(CenterTag, _Tag);
	
	  function CenterTag() {
	    _classCallCheck(this, CenterTag);
	
	    return _possibleConstructorReturn(this, (CenterTag.__proto__ || Object.getPrototypeOf(CenterTag)).apply(this, arguments));
	  }
	
	  _createClass(CenterTag, [{
	    key: 'toHTML',
	    value: function toHTML() {
	      return ['<div style="text-align:center;">', this.getContent(), '</div>'];
	    }
	  }, {
	    key: 'toReact',
	    value: function toReact() {
	      return _react2.default.createElement(
	        'div',
	        { style: { textAlign: 'center' } },
	        this.getComponents()
	      );
	    }
	  }]);
	
	  return CenterTag;
	}(_tag2.default);
	
	exports.default = CenterTag;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _tag = __webpack_require__(1);
	
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

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _tag = __webpack_require__(1);
	
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

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _tag = __webpack_require__(1);
	
	var _tag2 = _interopRequireDefault(_tag);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // https://github.com/vishnevskiy/bbcodejs/blob/master/src/coffee/tags.coffee
	
	
	var HorizontalRuleTag = function (_Tag) {
	  _inherits(HorizontalRuleTag, _Tag);
	
	  function HorizontalRuleTag(renderer) {
	    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    _classCallCheck(this, HorizontalRuleTag);
	
	    var _this = _possibleConstructorReturn(this, (HorizontalRuleTag.__proto__ || Object.getPrototypeOf(HorizontalRuleTag)).call(this, renderer, settings));
	
	    _this.SELF_CLOSE = true;
	    _this.STRIP_OUTER = true;
	    return _this;
	  }
	
	  _createClass(HorizontalRuleTag, [{
	    key: 'toHTML',
	    value: function toHTML() {
	      return '<hr />';
	    }
	  }, {
	    key: 'toReact',
	    value: function toReact() {
	      return _react2.default.createElement('hr', null);
	    }
	  }]);
	
	  return HorizontalRuleTag;
	}(_tag2.default);
	
	exports.default = HorizontalRuleTag;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _tag = __webpack_require__(1);
	
	var _tag2 = _interopRequireDefault(_tag);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // https://github.com/vishnevskiy/bbcodejs/blob/master/src/coffee/tags.coffee
	
	
	var ImageTag = function (_Tag) {
	  _inherits(ImageTag, _Tag);
	
	  function ImageTag() {
	    _classCallCheck(this, ImageTag);
	
	    return _possibleConstructorReturn(this, (ImageTag.__proto__ || Object.getPrototypeOf(ImageTag)).apply(this, arguments));
	  }
	
	  _createClass(ImageTag, [{
	    key: 'toHTML',
	    value: function toHTML() {
	      var attributes = {
	        src: this.renderer.strip(this.getContent(true))
	      };
	
	      if (this.params.width) {
	        attributes.width = this.params.width;
	      }
	
	      if (this.params.height) {
	        attributes.height = this.params.height;
	      }
	
	      return '<img ' + this.renderer.htmlAttributes(attributes) + ' />';
	    }
	  }, {
	    key: 'toReact',
	    value: function toReact() {
	      var src = this.getContent(true);
	      return _react2.default.createElement('img', {
	        role: 'presentation',
	        src: src,
	        width: this.params.width,
	        height: this.params.height
	      });
	    }
	  }]);
	
	  return ImageTag;
	}(_tag2.default);
	
	exports.default = ImageTag;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _tag = __webpack_require__(1);
	
	var _tag2 = _interopRequireDefault(_tag);
	
	var _code = __webpack_require__(8);
	
	var _code2 = _interopRequireDefault(_code);
	
	var _image = __webpack_require__(11);
	
	var _image2 = _interopRequireDefault(_image);
	
	var _hr = __webpack_require__(10);
	
	var _hr2 = _interopRequireDefault(_hr);
	
	var _size = __webpack_require__(19);
	
	var _size2 = _interopRequireDefault(_size);
	
	var _center = __webpack_require__(7);
	
	var _center2 = _interopRequireDefault(_center);
	
	var _right = __webpack_require__(17);
	
	var _right2 = _interopRequireDefault(_right);
	
	var _color = __webpack_require__(9);
	
	var _color2 = _interopRequireDefault(_color);
	
	var _list = __webpack_require__(15);
	
	var _list2 = _interopRequireDefault(_list);
	
	var _item = __webpack_require__(13);
	
	var _item2 = _interopRequireDefault(_item);
	
	var _quote = __webpack_require__(16);
	
	var _quote2 = _interopRequireDefault(_quote);
	
	var _link = __webpack_require__(14);
	
	var _link2 = _interopRequireDefault(_link);
	
	var _simple = __webpack_require__(18);
	
	var _simple2 = _interopRequireDefault(_simple);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  b: (0, _simple2.default)('strong'),
	  i: (0, _simple2.default)('em'),
	  u: (0, _simple2.default)('u'),
	  s: (0, _simple2.default)('strike'),
	  h1: (0, _simple2.default)('h1', { STRIP_OUTER: true }),
	  h2: (0, _simple2.default)('h2', { STRIP_OUTER: true }),
	  h3: (0, _simple2.default)('h3', { STRIP_OUTER: true }),
	  h4: (0, _simple2.default)('h4', { STRIP_OUTER: true }),
	  h5: (0, _simple2.default)('h5', { STRIP_OUTER: true }),
	  h6: (0, _simple2.default)('h6', { STRIP_OUTER: true }),
	  pre: (0, _simple2.default)('pre'),
	  table: (0, _simple2.default)('table', { DISCARD_TEXT: true }),
	  thead: (0, _simple2.default)('thead', { DISCARD_TEXT: true }),
	  tbody: (0, _simple2.default)('tbody', { DISCARD_TEXT: true }),
	  tr: (0, _simple2.default)('tr', { DISCARD_TEXT: true }),
	  th: (0, _simple2.default)('th'),
	  td: (0, _simple2.default)('td'),
	  code: _code2.default,
	  img: _image2.default,
	  hr: _hr2.default,
	  size: _size2.default,
	  center: _center2.default,
	  right: _right2.default,
	  color: _color2.default,
	  list: _list2.default,
	  '*': _item2.default,
	  quote: _quote2.default,
	  url: _link2.default,
	  link: _link2.default,
	  email: _link2.default
	};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _tag = __webpack_require__(1);
	
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

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _tag = __webpack_require__(1);
	
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

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _tag = __webpack_require__(1);
	
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

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _tag = __webpack_require__(1);
	
	var _tag2 = _interopRequireDefault(_tag);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // https://github.com/vishnevskiy/bbcodejs/blob/master/src/coffee/tags.coffee
	
	
	var QuoteTag = function (_Tag) {
	  _inherits(QuoteTag, _Tag);
	
	  function QuoteTag(renderer) {
	    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    _classCallCheck(this, QuoteTag);
	
	    var _this = _possibleConstructorReturn(this, (QuoteTag.__proto__ || Object.getPrototypeOf(QuoteTag)).call(this, renderer, settings));
	
	    _this.STRIP_INNER = true;
	    _this.STRIP_OUTER = true;
	    return _this;
	  }
	
	  _createClass(QuoteTag, [{
	    key: 'toHTML',
	    value: function toHTML() {
	      var pieces = ['<blockquote>', this.getContent()];
	      var citation = this.params.quote;
	
	      if (citation) {
	        pieces.push('<small>');
	        pieces.push(citation);
	        pieces.push('</small>');
	      }
	
	      pieces.push('</blockquote>');
	
	      return pieces;
	    }
	  }, {
	    key: 'toReact',
	    value: function toReact() {
	      var citation = this.params.quote;
	      return _react2.default.createElement(
	        'blockquote',
	        null,
	        citation && _react2.default.createElement(
	          'small',
	          null,
	          citation,
	          ' wrote:'
	        ),
	        this.getComponents()
	      );
	    }
	  }]);
	
	  return QuoteTag;
	}(_tag2.default);
	
	exports.default = QuoteTag;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _tag = __webpack_require__(1);
	
	var _tag2 = _interopRequireDefault(_tag);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // https://github.com/vishnevskiy/bbcodejs/blob/master/src/coffee/tags.coffee
	
	
	var RightTag = function (_Tag) {
	  _inherits(RightTag, _Tag);
	
	  function RightTag() {
	    _classCallCheck(this, RightTag);
	
	    return _possibleConstructorReturn(this, (RightTag.__proto__ || Object.getPrototypeOf(RightTag)).apply(this, arguments));
	  }
	
	  _createClass(RightTag, [{
	    key: 'toHTML',
	    value: function toHTML() {
	      return ['<div style="text-align:right;">', this.getContent(), '</div>'];
	    }
	  }, {
	    key: 'toReact',
	    value: function toReact() {
	      return _react2.default.createElement(
	        'div',
	        { style: { textAlign: 'right' } },
	        this.getComponents()
	      );
	    }
	  }]);
	
	  return RightTag;
	}(_tag2.default);
	
	exports.default = RightTag;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _tag = __webpack_require__(1);
	
	var _tag2 = _interopRequireDefault(_tag);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	exports.default = function (name, attributes) {
	  var SimpleTag = function (_Tag) {
	    _inherits(SimpleTag, _Tag);
	
	    function SimpleTag(renderer) {
	      var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      _classCallCheck(this, SimpleTag);
	
	      var _this = _possibleConstructorReturn(this, (SimpleTag.__proto__ || Object.getPrototypeOf(SimpleTag)).call(this, renderer, settings));
	
	      Object.keys(attributes || {}).forEach(function (key) {
	        _this[key] = attributes[key];
	      });
	      return _this;
	    }
	
	    _createClass(SimpleTag, [{
	      key: 'toHTML',
	      value: function toHTML() {
	        var htmlAttributes = this.renderer.htmlAttributes(this.params);
	
	        if (htmlAttributes) {
	          htmlAttributes = ' ' + htmlAttributes;
	        }
	
	        return ['<' + name + htmlAttributes + '>', this.getContent(), '</' + name + '>'];
	      }
	    }, {
	      key: 'toReact',
	      value: function toReact() {
	        var Name = name;
	        return _react2.default.createElement(
	          Name,
	          this.params,
	          this.getComponents()
	        );
	      }
	    }]);
	
	    return SimpleTag;
	  }(_tag2.default);
	
	  return SimpleTag;
	};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _tag = __webpack_require__(1);
	
	var _tag2 = _interopRequireDefault(_tag);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // https://github.com/vishnevskiy/bbcodejs/blob/master/src/coffee/tags.coffee
	
	
	var SizeTag = function (_Tag) {
	  _inherits(SizeTag, _Tag);
	
	  function SizeTag() {
	    _classCallCheck(this, SizeTag);
	
	    return _possibleConstructorReturn(this, (SizeTag.__proto__ || Object.getPrototypeOf(SizeTag)).apply(this, arguments));
	  }
	
	  _createClass(SizeTag, [{
	    key: 'toHTML',
	    value: function toHTML() {
	      var size = this.params.size;
	
	      if (isNaN(size)) {
	        return this.getContent();
	      }
	      return ['<span style="font-size:' + size + 'px">', this.getContent(), '</span>'];
	    }
	  }, {
	    key: 'toReact',
	    value: function toReact() {
	      var size = this.params.size;
	
	      if (isNaN(size)) {
	        return this.getComponents();
	      }
	
	      return _react2.default.createElement(
	        'span',
	        { style: { fontSize: size + 'px' } },
	        this.getComponents()
	      );
	    }
	  }]);
	
	  return SizeTag;
	}(_tag2.default);
	
	exports.default = SizeTag;

/***/ })
/******/ ])
});
;
//# sourceMappingURL=bbcode-to-react.js.map