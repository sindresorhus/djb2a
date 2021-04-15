# djb2a

> [DJB2a](http://www.cse.yorku.ca/~oz/hash.html#djb2) non-cryptographic hash function

[DJB2a has good distribution and collisions are rare.](https://softwareengineering.stackexchange.com/questions/49550/which-hashing-algorithm-is-best-for-uniqueness-and-speed/145633#145633)

## Install

```
$ npm install djb2a
```

## Usage

```js
import djb2a from 'djb2a';

djb2a('🦄🌈');
//=> 1484783307
```

It returns the hash as a positive integer.

## Related

- [fnv1a](https://github.com/sindresorhus/fnv1a) - FNV-1a non-cryptographic hash function
- [sdbm](https://github.com/sindresorhus/sdbm) - SDBM non-cryptographic hash function
