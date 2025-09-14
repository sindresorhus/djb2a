export type Options = {
	/**
	Interpret the string as UTF-8 encoded bytes instead of UTF-16 code units.

	This provides compatibility with DJB2a implementations in other languages, which typically operate on UTF-8 bytes.

	@default false

	@example
	```
	import djb2a from 'djb2a';

	djb2a('🦄', {bytes: true});
	//=> 2083441928
	```
	*/
	readonly bytes?: boolean;
};

declare const djb2a: {
	/**
	[DJB2a](http://www.cse.yorku.ca/~oz/hash.html#djb2) non-cryptographic hash function.

	@param input - The string or Uint8Array to hash.
	@param options - Hashing options.
	@returns The hash as a positive 32-bit integer.

	@example
	```
	import djb2a from 'djb2a';

	// Hash a string (UTF-16 code units by default)
	djb2a('🦄🌈');
	//=> 1484783307

	// Hash a string as UTF-8 bytes for cross-language compatibility
	djb2a('🦄🌈', {bytes: true});
	//=> 1642026147

	// Hash bytes directly
	djb2a(new Uint8Array([1, 2, 3]));
	//=> 193375973
	```
	*/
	(input: string | Uint8Array, options?: Options): number;

	/**
	[DJB2a](http://www.cse.yorku.ca/~oz/hash.html#djb2) non-cryptographic hash function.

	@param input - The string or Uint8Array to hash.
	@param options - Hashing options.
	@returns The hash as a positive 64-bit BigInt.

	@example
	```
	import djb2a from 'djb2a';

	// Return a 64-bit BigInt instead of a 32-bit number
	djb2a.bigint('🦄🌈');
	//=> 5779750603n

	// BigInt with UTF-8 bytes
	djb2a.bigint('🦄🌈', {bytes: true});
	//=> 7564289453806755n

	// Hash bytes directly
	djb2a.bigint(new Uint8Array([1, 2, 3]));
	//=> 193375973n
	```
	*/
	bigint(input: string | Uint8Array, options?: Options): bigint;
};

export default djb2a;
