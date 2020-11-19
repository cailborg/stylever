import React from "react";
import { Button } from "./Button";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer
    .create(<Button variant="default">Some button text</Button>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
