import {expectType} from 'tsd';
import djb2a = require('.');

expectType<number>(djb2a('🦄🌈'));
