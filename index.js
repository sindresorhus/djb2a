'use strict';

// Explanation: https://stackoverflow.com/a/31621312/64949
const MAGIC_CONSTANT = 5381;

const djb2a = string => {
	let hash = MAGIC_CONSTANT;

	for (let i = 0; i < string.length; i++) {
		// Equivalent to: `hash * 33 ^ string.charCodeAt(i)`
		hash = ((hash << 5) + hash) ^ string.charCodeAt(i);
	}

	// Convert it to an unsigned 32-bit integer
	return hash >>> 0;
};

module.exports = djb2a;
// TODO: remove this in the next major version
module.exports.default = djb2a;
