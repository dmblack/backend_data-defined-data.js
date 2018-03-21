/* global expect */
/* eslint-env yarn */

import ddd from './../src';
let instance = ddd();

it("Confirms an export is available, and is type function", () => {
  expect(typeof ddd).toEqual('function');
});

it('Can return a record', async () => {
  expect.assertions(1);
  const getOne = await instance.get(parseInt(1));
  expect(typeof getOne).toEqual('object');
});

it('Returns a record with content (seed)', async () => {
  expect.assertions(1);
  const getOne = await instance.get(parseInt(1));
  expect(getOne.instance.id).toEqual(1);
});