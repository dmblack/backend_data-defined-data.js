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

it("Conforms to a data object standard", async () => {
  expect.assertions(5);
  const getOne = await instance.get(parseInt(1));
  console.log(JSON.stringify(getOne));
  expect(getOne).toHaveProperty('attributes');
  expect(getOne).toHaveProperty('attributesHistory');
  expect(getOne).toHaveProperty('definition');
  expect(getOne).toHaveProperty('instance');
  expect(getOne).toHaveProperty('relationships');
})