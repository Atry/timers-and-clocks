import '@testing-library/jest-dom';
import Rand from 'rand-seed';
import nock from 'nock';
nock.back.fixtures = `${__dirname}/__fixtures__`;
// https://github.com/nock/nock/blob/d9bab65/README.md#nock-back
// nock.back.setMode('update');
nock.back.setMode('lockdown');

beforeEach(() => {
  // Making Math.random deterministic, allowing for `toMatchSnapshot`.
  const rand = new Rand('my-seed');
  Math.random = jest.fn(() => rand.next());
});

