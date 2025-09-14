# djb2a

> [DJB2a](http://www.cse.yorku.ca/~oz/hash.html#djb2) non-cryptographic hash function

[DJB2a has good distribution and collisions are rare.](https://softwareengineering.stackexchange.com/questions/49550/which-hashing-algorithm-is-best-for-uniqueness-and-speed/145633#145633)

The implementation uses [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) internally for precision, avoiding integer overflow issues that can occur with JavaScript's regular number type when processing long strings.

## Install

```sh
npm install djb2a
```

## Usage

```js
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

// Return a 64-bit BigInt instead of a 32-bit number
djb2a.bigint('🦄🌈');
//=> 5779750603n

// BigInt with UTF-8 bytes
djb2a.bigint('🦄🌈', {bytes: true});
//=> 7564289453806755n
```

## API

### djb2a(input, options?)

Returns the hash as a positive 32-bit integer.

#### input

Type: `string | Uint8Array`

The input to hash. Strings are hashed as UTF-16 code units by default (see `options.bytes` to change this).

#### options

Type: `object`

##### bytes

Type: `boolean`\
Default: `false`

Interpret the string as UTF-8 encoded bytes instead of UTF-16 code units.

This provides compatibility with DJB2a implementations in other languages, which typically operate on UTF-8 bytes.

### djb2a.bigint(input, options?)

Returns the hash as a positive 64-bit BigInt.

Accepts the same arguments as the main function.

## Implementation notes

By default, this implementation processes strings as UTF-16 code units using JavaScript's `charCodeAt` method. This makes it a JavaScript-specific variant of DJB2a that differs from the original C implementation (which operates on bytes) for non-ASCII characters.

Use the `bytes` option to encode strings as UTF-8 for compatibility with other language implementations.

## Related

- [fnv1a](https://github.com/sindresorhus/fnv1a) - FNV-1a non-cryptographic hash function
- [sdbm](https://github.com/sindresorhus/sdbm) - SDBM non-cryptographic hash function
