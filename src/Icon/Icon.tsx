import React from "react";
import styled from "styled-components";
import data from "./iconsConfig.json";
import { theme, Theme, ColorIndex } from "../theme";

export interface IconProps {
  name: keyof typeof data;
  color?: keyof Theme["colors"];
  index?: ColorIndex;
}

const getIconConfig = (name: keyof typeof data) => {
  if (data.hasOwnProperty(name)) {
    return data[name];
  }
};

export const Icon: React.FC<IconProps> = ({
  name,
  color = "neutral",
  index,
}) => {
  const StyledSVG = styled.svg`
    fill: ${theme.color(color, index)};
  `;
  const values = getIconConfig(name) as { drawn: string; title: string };
  return (
    <StyledSVG
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      role="img"
    >
      <title>{values.title}</title>
      <path d={values.drawn} fillRule="evenodd" clipRule="evenodd" />
    </StyledSVG>
  );
};
