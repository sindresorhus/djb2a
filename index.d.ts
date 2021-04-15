/**
[DJB2a](http://www.cse.yorku.ca/~oz/hash.html#djb2) non-cryptographic hash function.

@returns The hash as a positive integer.

@example
```
import djb2a from 'djb2a';

djb2a('🦄🌈');
//=> 1484783307
```
*/
export default function djb2a(string: string): number;
