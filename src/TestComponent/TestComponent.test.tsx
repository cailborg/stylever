import React from "react";
// import { render } from "@testing-library/react";
import { TestComponent } from "./TestComponent";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<TestComponent text="Some text" />).toJSON();
  expect(tree).toMatchSnapshot();
});
