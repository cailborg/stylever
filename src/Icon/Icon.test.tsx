import React from "react";
import { Icon } from "./Icon";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<Icon name="Cross" />).toJSON();
  expect(tree).toMatchSnapshot();
});
