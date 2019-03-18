import {expectType} from 'tsd-check';
import djb2a from '.';

expectType<number>(djb2a('🦄🌈'));
