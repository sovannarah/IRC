'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tag = require('../tag');

var _tag2 = _interopRequireDefault(_tag);

var _code = require('./code');

var _code2 = _interopRequireDefault(_code);

var _image = require('./image');

var _image2 = _interopRequireDefault(_image);

var _hr = require('./hr');

var _hr2 = _interopRequireDefault(_hr);

var _size = require('./size');

var _size2 = _interopRequireDefault(_size);

var _center = require('./center');

var _center2 = _interopRequireDefault(_center);

var _right = require('./right');

var _right2 = _interopRequireDefault(_right);

var _color = require('./color');

var _color2 = _interopRequireDefault(_color);

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

var _item = require('./item');

var _item2 = _interopRequireDefault(_item);

var _quote = require('./quote');

var _quote2 = _interopRequireDefault(_quote);

var _link = require('./link');

var _link2 = _interopRequireDefault(_link);

var _simple = require('./simple');

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