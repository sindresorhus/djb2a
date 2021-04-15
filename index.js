// Explanation: https://stackoverflow.com/a/31621312/64949
const MAGIC_CONSTANT = 5381;

export default function djb2a(string) {
	let hash = MAGIC_CONSTANT;

	for (let index = 0; index < string.length; index++) {
		// Equivalent to: `hash * 33 ^ string.charCodeAt(i)`
		hash = ((hash << 5) + hash) ^ string.charCodeAt(index);
	}

	// Convert it to an unsigned 32-bit integer.
	return hash >>> 0;
}
