import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import TestComponent from "./TestComponent";

export default {
  title: "Components/TestComponent",
  component: TestComponent,
  argTypes: {
    text: { control: "text" },
  },
} as Meta;

const Template: Story<TestComponentProps> = (args) => (
  <TestComponent {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  text: "The text of the component",
};
