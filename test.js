import test from 'ava';
import djb2a from './index.js';

test('main function returns number', t => {
	t.is(djb2a(''), 5381);
	t.is(djb2a('🦄🌈'), 1_484_783_307);

	t.is(djb2a('h'), 177_613);
	t.is(djb2a('he'), 5_861_128);
	t.is(djb2a('hel'), 193_417_316);
	t.is(djb2a('hell'), 2_087_804_040);
	t.is(djb2a('hello'), 178_056_679);
	t.is(djb2a('hello '), 1_580_903_143);
	t.is(djb2a('hello w'), 630_196_144);
	t.is(djb2a('hello wo'), 3_616_603_615);
	t.is(djb2a('hello wor'), 3_383_802_317);
	t.is(djb2a('hello worl'), 4_291_293_953);
	t.is(djb2a('hello world'), 4_173_747_013);

	// Test with long Lorem ipsum text
	const loremIpsum = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. '
		+ 'Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. '
		+ 'Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. '
		+ 'Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, '
		+ 'venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. '
		+ 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. '
		+ 'Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. '
		+ 'Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. '
		+ 'Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, '
		+ 'venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. '
		+ 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. '
		+ 'Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. '
		+ 'Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. '
		+ 'Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, '
		+ 'venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.';
	t.is(djb2a(loremIpsum), 1_122_617_945);
});

test('bigint method returns 64-bit BigInt', t => {
	t.is(djb2a.bigint(''), 5381n);
	t.is(djb2a.bigint('🦄🌈'), 5_779_750_603n);
	t.is(djb2a.bigint('hello'), 210_631_454_183n);
	t.is(djb2a.bigint('hello world'), 13_769_359_310_528_598_853n);

	// Test that it returns BigInt type
	t.is(typeof djb2a.bigint('test'), 'bigint');

	// Test that it's 64-bit truncated
	const longString = 'x'.repeat(10_000);
	const result = djb2a.bigint(longString);
	t.true(result >= 0n);
	t.true(result < 2n ** 64n);
});

test('number and bigint methods handle 32-bit vs 64-bit correctly', t => {
	const testStrings = [
		'',
		'a',
		'abc',
		'hello world',
		'🦄🌈',
		'你好世界',
		'a'.repeat(100),
		'test'.repeat(1000),
	];

	for (const string_ of testStrings) {
		const numberResult = djb2a(string_);
		const bigintResult = djb2a.bigint(string_);

		// Check that number result is 32-bit
		t.true(numberResult >= 0);
		t.true(numberResult <= 4_294_967_295);

		// Check that bigint result is 64-bit
		t.true(bigintResult >= 0n);
		t.true(bigintResult < 2n ** 64n);

		// The lower 32 bits of bigint should match the number result
		t.is(BigInt(numberResult), bigintResult & 0xFF_FF_FF_FFn, `Lower 32 bits should match for "${string_.slice(0, 20)}..."`);
	}
});

test('handles edge cases', t => {
	// Very long string
	const longString = 'x'.repeat(10_000);
	t.is(typeof djb2a(longString), 'number');
	t.is(typeof djb2a.bigint(longString), 'bigint');
	t.true(djb2a(longString) >= 0);
	t.true(djb2a(longString) <= 4_294_967_295); // Max 32-bit unsigned

	// Unicode characters
	t.is(typeof djb2a('😀😁😂🤣😃😄😅😆'), 'number');
	t.is(typeof djb2a.bigint('😀😁😂🤣😃😄😅😆'), 'bigint');

	// Special characters
	t.is(typeof djb2a('\0\t\n\r'), 'number');
	t.is(typeof djb2a.bigint('\0\t\n\r'), 'bigint');
});

test('results are within correct ranges', t => {
	const testCases = [
		'',
		'a',
		'z'.repeat(1000),
		'\uFFFF'.repeat(100),
		'🦄'.repeat(100),
	];

	for (const string_ of testCases) {
		const result = djb2a(string_);
		t.true(result >= 0, `Result for "${string_.slice(0, 20)}..." should be >= 0`);
		t.true(result <= 4_294_967_295, `Result for "${string_.slice(0, 20)}..." should be <= 2^32-1`);

		const bigintResult = djb2a.bigint(string_);
		t.true(bigintResult >= 0n, `BigInt result for "${string_.slice(0, 20)}..." should be >= 0`);
		t.true(bigintResult < 2n ** 64n, `BigInt result for "${string_.slice(0, 20)}..." should be < 2^64`);
	}
});

test('bytes option processes strings as UTF-8', t => {
	// ASCII (same in UTF-8 and UTF-16)
	t.is(djb2a('hello', {bytes: true}), djb2a('hello'));

	// Non-ASCII (different in UTF-8 vs UTF-16)
	t.not(djb2a('🦄', {bytes: true}), djb2a('🦄'));
	t.not(djb2a('café', {bytes: true}), djb2a('café'));
	t.not(djb2a('你好', {bytes: true}), djb2a('你好'));

	// Specific expected values for UTF-8 encoding
	t.is(djb2a('🦄', {bytes: true}), 2_083_441_928);
	t.is(djb2a('🦄🌈', {bytes: true}), 1_642_026_147);

	// BigInt version
	t.is(djb2a.bigint('🦄', {bytes: true}), 6_378_409_224n);
	t.is(djb2a.bigint('🦄🌈', {bytes: true}), 7_564_289_453_806_755n);
});

test('accepts Uint8Array input', t => {
	// Test with basic byte array
	t.is(djb2a(new Uint8Array([1, 2, 3])), 193_375_973);
	t.is(djb2a(new Uint8Array([97, 98, 99])), 193_409_669); // 'abc' in ASCII

	// BigInt version
	t.is(djb2a.bigint(new Uint8Array([1, 2, 3])), 193_375_973n);
	t.is(djb2a.bigint(new Uint8Array([97, 98, 99])), 193_409_669n);

	// Empty array
	t.is(djb2a(new Uint8Array([])), 5381);
	t.is(djb2a.bigint(new Uint8Array([])), 5381n);

	// Uint8Array with bytes option should be ignored (already bytes)
	t.is(djb2a(new Uint8Array([1, 2, 3]), {bytes: true}), djb2a(new Uint8Array([1, 2, 3])));
});

test('Buffer input works like Uint8Array', t => {
	// eslint-disable-next-line n/prefer-global/buffer
	const buffer = globalThis.Buffer;
	if (!buffer) {
		t.pass('Buffer not available in this environment');
		return;
	}

	// Buffer should work the same as Uint8Array
	const bytes = [1, 2, 3];
	t.is(djb2a(buffer.from(bytes)), djb2a(new Uint8Array(bytes)));
	t.is(djb2a.bigint(buffer.from(bytes)), djb2a.bigint(new Uint8Array(bytes)));

	// String encoded as UTF-8 in Buffer
	const utf8String = '🦄';
	const utf8Buffer = buffer.from(utf8String, 'utf8');
	t.is(djb2a(utf8Buffer), djb2a(utf8String, {bytes: true}));
});

test('string with bytes option matches equivalent Uint8Array', t => {
	const encoder = new TextEncoder();

	const testStrings = ['hello', 'café', '🦄🌈', '你好世界', 'αβγδε'];

	for (const string_ of testStrings) {
		const utf8Bytes = encoder.encode(string_);

		// 32-bit version
		t.is(
			djb2a(string_, {bytes: true}),
			djb2a(utf8Bytes),
			`String "${string_}" with bytes option should match its UTF-8 Uint8Array`,
		);

		// 64-bit version
		t.is(
			djb2a.bigint(string_, {bytes: true}),
			djb2a.bigint(utf8Bytes),
			`BigInt: String "${string_}" with bytes option should match its UTF-8 Uint8Array`,
		);
	}
});

test('handles strings with null bytes', t => {
	const withNull = 'hello\0world';
	t.is(typeof djb2a(withNull), 'number');
	t.is(typeof djb2a.bigint(withNull), 'bigint');

	// Should process null byte correctly
	t.not(djb2a('helloworld'), djb2a(withNull));
	t.not(djb2a.bigint('helloworld'), djb2a.bigint(withNull));
});

test('handles large Uint8Array efficiently', t => {
	const largeArray = new Uint8Array(100_000);
	for (let i = 0; i < largeArray.length; i++) {
		largeArray[i] = i % 256;
	}

	const result = djb2a(largeArray);
	const bigintResult = djb2a.bigint(largeArray);

	t.is(typeof result, 'number');
	t.is(typeof bigintResult, 'bigint');
	t.true(result >= 0);
	t.true(result <= 4_294_967_295);
	t.true(bigintResult >= 0n);
	t.true(bigintResult < 2n ** 64n);
});

test('consistency between repeated hashing', t => {
	const inputs = [
		'test',
		new Uint8Array([1, 2, 3]),
		'🦄',
	];

	for (const input of inputs) {
		const hash1 = djb2a(input);
		const hash2 = djb2a(input);
		const bigint1 = djb2a.bigint(input);
		const bigint2 = djb2a.bigint(input);

		t.is(hash1, hash2, 'Same input should produce same hash');
		t.is(bigint1, bigint2, 'Same input should produce same BigInt hash');
	}
});

test('different inputs produce different hashes (collision test)', t => {
	const inputs = [
		'',
		'a',
		'aa',
		'aaa',
		'b',
		'ab',
		'ba',
		'hello',
		'world',
	];

	const hashes = new Set();
	const bigintHashes = new Set();

	for (const input of inputs) {
		hashes.add(djb2a(input));
		bigintHashes.add(djb2a.bigint(input));
	}

	// All different inputs should produce different hashes (for this small set)
	t.is(hashes.size, inputs.length, 'No collisions in 32-bit hashes');
	t.is(bigintHashes.size, inputs.length, 'No collisions in 64-bit hashes');
});

test('throws TypeError for invalid input types', t => {
	const invalidInputs = [
		null,
		undefined,
		42,
		true,
		{},
		[],
		Symbol('test'),
		() => {},
	];

	for (const input of invalidInputs) {
		t.throws(
			() => djb2a(input),
			{instanceOf: TypeError, message: 'Expected a string or Uint8Array'},
			`Should throw for ${String(input)}`,
		);

		t.throws(
			() => djb2a.bigint(input),
			{instanceOf: TypeError, message: 'Expected a string or Uint8Array'},
			`BigInt should throw for ${String(input)}`,
		);
	}
});

test('bytes option is ignored for Uint8Array input', t => {
	const bytes = new Uint8Array([1, 2, 3, 4, 5]);

	// Bytes option should have no effect when input is already Uint8Array
	t.is(
		djb2a(bytes),
		djb2a(bytes, {bytes: true}),
		'bytes option should be ignored for Uint8Array',
	);

	t.is(
		djb2a.bigint(bytes),
		djb2a.bigint(bytes, {bytes: true}),
		'bytes option should be ignored for Uint8Array (bigint)',
	);

	// Verify with false too
	t.is(
		djb2a(bytes),
		djb2a(bytes, {bytes: false}),
		'bytes: false should also be ignored for Uint8Array',
	);
});

test('result bounds are correct', t => {
	const testInputs = [
		'',
		'a',
		'test',
		'🦄',
		new Uint8Array([]),
		new Uint8Array([255]),
		new Uint8Array([0, 1, 2, 3, 4]),
	];

	for (const input of testInputs) {
		const numberResult = djb2a(input);
		const bigintResult = djb2a.bigint(input);

		// Number result should be 32-bit unsigned integer
		t.true(Number.isInteger(numberResult), 'Result should be an integer');
		t.true(numberResult >= 0, 'Result should be non-negative');
		t.true(numberResult <= 0xFF_FF_FF_FF, 'Result should be <= 2^32-1');

		// BigInt result should be non-negative 64-bit
		t.is(typeof bigintResult, 'bigint', 'bigint method should return BigInt');
		t.true(bigintResult >= 0n, 'BigInt result should be non-negative');
		t.true(bigintResult < 2n ** 64n, 'BigInt result should be < 2^64');
	}
});

test('UTF-16 surrogate pairs are handled correctly', t => {
	// Test that surrogate pairs are processed as separate code units (UTF-16 behavior)
	const emoji = '💩'; // U+1F4A9 - pile of poo emoji
	const surrogates = '\uD83D\uDCA9'; // Same emoji via surrogate pairs

	// These should be identical (same UTF-16 representation)
	t.is(djb2a(emoji), djb2a(surrogates));
	t.is(djb2a.bigint(emoji), djb2a.bigint(surrogates));

	// Verify it processes as 2 code units, not 1 code point
	t.is(emoji.length, 2, 'Emoji should be 2 UTF-16 code units');

	// With bytes option, should process as UTF-8
	const emojiBytes = djb2a(emoji, {bytes: true});
	const emojiUtf16 = djb2a(emoji);
	t.not(emojiBytes, emojiUtf16, 'UTF-8 and UTF-16 should give different results for emoji');

	// Verify UTF-8 encoding has different length
	const utf8Bytes = new TextEncoder().encode(emoji);
	t.is(utf8Bytes.length, 4, 'Emoji should be 4 UTF-8 bytes');
	t.is(djb2a(utf8Bytes), emojiBytes, 'Direct UTF-8 bytes should match bytes option');
});

test('handles extreme values and edge cases', t => {
	// Empty cases
	t.is(BigInt(djb2a('')), djb2a.bigint('') & 0xFF_FF_FF_FFn, 'Empty string: 32-bit should match lower bits of 64-bit');
	t.is(djb2a(new Uint8Array([])), 5381, 'Empty Uint8Array should return initial hash');

	// Max single byte values
	t.is(typeof djb2a('\u{FFFF}'), 'number', 'Max UTF-16 code unit should work');
	t.is(typeof djb2a(new Uint8Array([255])), 'number', 'Max byte value should work');

	// Very long string (but not so long it slows down tests)
	const longString = 'a'.repeat(50_000);
	const longResult = djb2a(longString);
	const longBigint = djb2a.bigint(longString);

	t.is(typeof longResult, 'number');
	t.is(typeof longBigint, 'bigint');
	t.true(longResult >= 0 && longResult <= 0xFF_FF_FF_FF);
	t.true(longBigint >= 0n && longBigint < 2n ** 64n);
});

test('deterministic results across multiple invocations', t => {
	const testCases = [
		'hello world',
		'🦄🌈',
		new Uint8Array([1, 2, 3, 4, 5]),
		'',
	];

	// Test that the function returns identical results when called multiple times
	for (const input of testCases) {
		const results = Array.from({length: 10}, () => djb2a(input));
		const bigintResults = Array.from({length: 10}, () => djb2a.bigint(input));

		// All results should be identical
		t.true(results.every(result => result === results[0]), 'All number results should be identical');
		t.true(bigintResults.every(result => result === bigintResults[0]), 'All BigInt results should be identical');
	}
});

test('Node.js Buffer integration', t => {
	// eslint-disable-next-line n/prefer-global/buffer
	const buffer = globalThis.Buffer;

	if (!buffer) {
		t.pass('Buffer not available in this environment');
		return;
	}

	// Buffer.from creates a Uint8Array in Node.js
	const testBuffer = buffer.from('hello', 'utf8');
	const testUint8Array = new Uint8Array(testBuffer);

	t.true(testBuffer instanceof Uint8Array, 'Buffer should be instanceof Uint8Array');
	t.is(djb2a(testBuffer), djb2a(testUint8Array), 'Buffer and equivalent Uint8Array should hash identically');
	t.is(djb2a.bigint(testBuffer), djb2a.bigint(testUint8Array), 'Buffer and Uint8Array BigInt hashes should match');

	// Test that Buffer created from UTF-8 matches string with bytes option
	const unicodeString = '🦄🌈';
	const utf8Buffer = buffer.from(unicodeString, 'utf8');
	t.is(djb2a(utf8Buffer), djb2a(unicodeString, {bytes: true}), 'UTF-8 Buffer should match string with bytes option');
});
