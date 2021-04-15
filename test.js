import test from 'ava';
import djb2a from './index.js';

test('main', t => {
	t.is(djb2a(''), 5381);
	t.is(djb2a('🦄🌈'), 1484783307);

	t.is(djb2a('h'), 177613);
	t.is(djb2a('he'), 5861128);
	t.is(djb2a('hel'), 193417316);
	t.is(djb2a('hell'), 2087804040);
	t.is(djb2a('hello'), 178056679);
	t.is(djb2a('hello '), 1580903143);
	t.is(djb2a('hello w'), 630196144);
	t.is(djb2a('hello wo'), 3616603615);
	t.is(djb2a('hello wor'), 3383802317);
	t.is(djb2a('hello worl'), 4291293953);
	t.is(djb2a('hello world'), 4173747013);

	t.is(djb2a('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.'), 1122617945);
});
