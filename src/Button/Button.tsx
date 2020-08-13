import React, { ReactNode } from "react";
import styled from "styled-components";
import { Icon } from "../Icon/Icon";
import { theme } from "../theme";
import { useFocusRing } from "@react-aria/focus";

type ChildrenType = ReactNode | React.ReactElement<typeof Icon>;

export interface ButtonProps {
  trackingId?: string;
  variant: "primary" | "secondary" | "strong" | "default" | "weak";
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: ChildrenType;
}

const BaseButton = styled.button<ButtonProps>`
  box-sizing: border-box;
  color: ${(props) =>
    props.variant === "primary" || "strong"
      ? theme.color("neutral", 0)
      : theme.color("neutral", 9)};
  background: ${(props) =>
    props.variant === "primary"
      ? theme.color("purple", 9)
      : props.variant === "strong"
      ? theme.color("neutral", 9)
      : theme.color("red", 3)};
  border: none;
  padding: ${theme.space("xs")} ${theme.space("m")};
  text-align: center;
  border-radius: ${theme.radius("s")};
  transition: all ease-in-out ${theme.duration("quick")};
  cursor: pointer;
  &:focus {
    outline: none;
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
