import test from 'ava';
import djb2a from './index.js';

test('main', t => {
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

	t.is(djb2a('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.'), 1_122_617_945);
});
