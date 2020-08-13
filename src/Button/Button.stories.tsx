import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Button, ButtonProps } from "./Button";
import { Icon } from "../Icon/Icon";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    children: { control: "text" },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  children: "Button text",
};

export const TextWithicon = () => {
  return (
    <Button variant="default">
      <span>Some button text</span>
      <Icon name="alert" color="neutral" index={9} />
    </Button>
  );
};

export const IconOnly = () => {
  return (
    <Button variant="default">
      <Icon name="alert" color="neutral" index={9} />
    </Button>
  );
};
