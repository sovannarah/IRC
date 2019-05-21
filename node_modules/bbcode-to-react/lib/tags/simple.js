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