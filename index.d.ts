declare const djb2a: {
	/**
	[DJB2a](http://www.cse.yorku.ca/~oz/hash.html#djb2) non-cryptographic hash function.

	@returns The hash as a positive integer.

	@example
	```
	import djb2a = require('djb2a');

	djb2a('🦄🌈');
	//=> 1484783307
	```
	*/
	(string: string): number;

	// TODO: remove this in the next major version, refactor the whole definition to:
	// declare function djb2a(string: string): number;
	// export = djb2a;
	default: typeof djb2a;
};

export = djb2a;
