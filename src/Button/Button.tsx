import React from "react";
import styled from "styled-components";
import { Icon, IconDisplayName } from "../Icon/Icon";
import { theme } from "../theme";
import { useFocusRing } from "@react-aria/focus";

type StringOrIcon = string | React.ReactElement<typeof Icon>;

type ChildrenType = StringOrIcon | StringOrIcon[];

export interface ButtonProps {
  trackingId?: string;
  variant: "primary" | "secondary" | "strong" | "default" | "weak";
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: ChildrenType;
}

const isChildIconOnly = (children: ChildrenType) => {
  if (React.Children.count(children) === 1) {
    const child = React.Children.toArray(children)[0] as React.ReactElement;

    const childType = child?.type as React.FC;

    return (
      childType?.displayName === IconDisplayName || childType?.name === "Icon"
    );
  }

  return false;
};

const BaseButton = styled.button<ButtonProps>`
  box-sizing: border-box;
  max-width: ${(props) =>
    isChildIconOnly(props.children) ? "min-content" : "100%"};
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Roboto", sans-serif;
  color: ${(props) =>
    props.variant === "primary"
      ? theme.color("Neutral", 0)
      : props.variant === "strong"
      ? theme.color("Neutral", 0)
      : theme.color("Neutral", 9)};
  background: ${(props) =>
    props.variant === "primary"
      ? theme.color("Primary", 7)
      : props.variant === "strong"
      ? theme.color("Secondary", 7)
      : theme.color("Neutral", 1)};
  border: none;
  padding: 0px
    ${(props) =>
      props.variant === "primary"
        ? theme.space("xs")
        : props.variant === "secondary"
        ? theme.space("xs")
        : theme.space("xxs")};
  height: ${(props) =>
    props.variant === "primary"
      ? theme.space("xl")
      : props.variant === "secondary"
      ? theme.space("xl")
      : theme.space("m")};
  text-align: center;
  border-radius: ${theme.radius("s")};
  transition: all ease-in-out ${theme.duration("quick")};
  cursor: pointer;
  &:hover {
    background: ${(props) =>
      props.variant === "primary"
        ? theme.color("Primary", 6)
        : props.variant === "strong"
        ? theme.color("Secondary", 6)
        : theme.color("Neutral", 0)};
  }
  &:active {
    background: ${(props) =>
      props.variant === "primary"
        ? theme.color("Primary", 9)
        : props.variant === "strong"
        ? theme.color("Secondary", 9)
        : theme.color("Neutral", 3)};
  }
  &:focus {
    outline: none;
  }
  & > :first-child {
    margin-left: ${(props) =>
      isChildIconOnly(props.children) ? "0px" : theme.space("xxxs")};
  }
`;

export const Button: React.FC<ButtonProps> = ({
  trackingId,
  variant,
  type,
  disabled,
  onClick,
  children,
}) => {
  let { isFocusVisible, focusProps } = useFocusRing();

  return (
    <BaseButton
      {...focusProps}
      style={{
        boxShadow: isFocusVisible ? "0px 0px 0px 4px dodgerblue" : "none",
      }}
      disabled={disabled}
      variant={variant}
      type={type}
      onClick={onClick}
      data-tracking-id={trackingId}
    >
      {children}
    </BaseButton>
  );
};
