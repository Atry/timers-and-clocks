import '@testing-library/jest-dom';
import Rand from 'rand-seed';
import nock from 'nock';
import path from 'path';
nock.back.fixtures = `${__dirname}/__fixtures__`;

var nockDone: () => void = () => {
  fail('nockDone() should not be called until Nock Back is initialized');
};

beforeAll(async () => {
  const relativeTestPath = path.relative(__dirname, expect.getState().testPath);
  nockDone = (await nock.back(`${relativeTestPath}.json`)).nockDone;
});

afterAll(() => nockDone());

beforeEach(() => {
  // Making Math.random deterministic, allowing for `toMatchSnapshot`.
  const rand = new Rand('my-seed');
  Math.random = jest.fn(() => rand.next());
});
