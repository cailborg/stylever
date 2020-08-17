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

export const DefaultWithicon = () => {
  return (
    <Button variant="default">
      Some button text
      <Icon name="Chevron Down" color="Neutral" index={9} />
    </Button>
  );
};

export const SeondaryWithicon = () => {
  return (
    <Button variant="secondary">
      Some button text
      <Icon name="Chevron Down" color="Neutral" index={9} />
    </Button>
  );
};

export const DefaultIconOnly = () => {
  return (
    <Button variant="default">
      <Icon name="Cross" color="Neutral" index={9} />
    </Button>
  );
};

export const SecondaryIconOnly = () => {
  return (
    <Button variant="secondary">
      <Icon name="Cross" color="Neutral" index={9} />
    </Button>
  );
};
