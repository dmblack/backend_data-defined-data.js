/* global expect */
/* eslint-env yarn */

import ddd from './../src';
let instance = ddd();

it("Confirms an export is available, and is type function", () => {
  expect(typeof ddd).toEqual('function');
});

it("Has some structure", () => {
  console.log(ddd());
  expect(ddd).toHaveProperty(state);
})