import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Box, BoxPropsType } from "./Box";

export default {
  title: "Components/Box",
  component: Box,
  argTypes: {
    children: { control: "text" },
  },
} as Meta;

const Template: Story<BoxPropsType> = (args) => <Box {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  children: "Button text",
};
