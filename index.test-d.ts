import {expectType} from 'tsd';
import djb2a from './index.js';

expectType<number>(djb2a('🦄🌈'));
