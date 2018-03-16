/* global expect */
/* eslint-env yarn */

import ddd from '../src';
let instance = ddd();

it("Confirms an export is available, and is type function", () => {
  expect(typeof ddd).toEqual('function');
});

it('Can return a record', async () => {
  expect.assertions(1);
  const getOne = await instance.load(parseInt(1));
  console.log(getOne);
  expect(typeof getOne).toEqual('object');
});
