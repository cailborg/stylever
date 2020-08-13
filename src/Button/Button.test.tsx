import React from "react";
import { Icon } from "../Icon/Icon";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<Icon name="alert" />).toJSON();
  expect(tree).toMatchSnapshot();
});
