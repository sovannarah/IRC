'use strict';

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

var _tag = require('./tag');

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