import React from "react";
import { Box } from "./Box";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<Box>Box content</Box>).toJSON();
  expect(tree).toMatchSnapshot();
});
