// Explanation: https://stackoverflow.com/a/31621312/64949
const INITIAL_HASH = 5381n;

const textEncoder = new TextEncoder();

function djb2aHash(input, options) {
	if (typeof input === 'string') {
		if (options?.bytes) {
			input = textEncoder.encode(input);
		} else {
			// Process UTF-16 code units directly (faster than generator)
			let hash = INITIAL_HASH;
			for (let index = 0; index < input.length; index++) {
				// eslint-disable-next-line unicorn/prefer-code-point -- DJB2a operates on UTF-16 code units, not Unicode code points
				hash = ((hash << 5n) + hash) ^ BigInt(input.charCodeAt(index));
			}

			return hash;
		}
	} else if (!(input instanceof Uint8Array)) {
		throw new TypeError('Expected a string or Uint8Array');
	}

	// Process bytes (Uint8Array or encoded string)
	let hash = INITIAL_HASH;
	for (const byte of input) {
		hash = ((hash << 5n) + hash) ^ BigInt(byte);
	}

	return hash;
}

export default function djb2a(input, options) {
	return Number(BigInt.asUintN(32, djb2aHash(input, options)));
}

djb2a.bigint = function (input, options) {
	return BigInt.asUintN(64, djb2aHash(input, options));
};
