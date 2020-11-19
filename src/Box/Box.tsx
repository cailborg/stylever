import React from "react";
import styled from "styled-components";
import { theme, Space } from "../theme";

export interface BoxPropsType {
  paddingTop?: Space;
  paddingRight?: Space;
  paddingBottom?: Space;
  paddingLeft?: Space;
  marginTop?: Space;
  marginRight?: Space;
  marginBottom?: Space;
  marginLeft?: Space;
  children: React.ReactNode;
  maxWidth?: "jumbo" | "xl" | "l" | "m" | "s" | "xs";
  height?: "auto" | "100%" | "100vh";
  display?: "flex" | "block" | "inline-block";
  flexDirection?: "column" | "row" | "column-reverse" | "row-reverse";
  flexWrap?: "wrap" | "nowrap";
  alignItems?: "flex-start" | "flex-end" | "center";
  justifyContent?: "flex-start" | "flex-end" | "center";
  position?: "absolute" | "relative" | "fixed";
  textAlign?: "left" | "center" | "right";
}

const StyledBox = styled.div<BoxPropsType>`
  box-sizing: border-box;
  max-width: ${(props) => theme.size(props.maxWidth)};
  display: ${(props) => props.display};
  flex-direction: ${(props) => props.flexDirection};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  font-family: "Roboto", sans-serif;
  text-align: ${(props) => props.textAlign};
  border: none;
  height: auto;
  padding-top: ${(props) => theme.space(props.paddingTop)};
  padding-bottom: ${(props) => theme.space(props.paddingBottom)};
  padding-left: ${(props) => theme.space(props.paddingLeft)};
  padding-right: ${(props) => theme.space(props.paddingRight)};
  border-radius: ${theme.radius("s")};
`;

export const Box: React.FC<BoxPropsType> = ({
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  maxWidth,
  display,
  flexDirection,
  children,
}) => {
  return (
    <StyledBox
      maxWidth={maxWidth}
      display={display}
      paddingTop={paddingTop}
      paddingRight={paddingRight}
      paddingBottom={paddingBottom}
      paddingLeft={paddingLeft}
      flexDirection={flexDirection}
    >
      {children}
    </StyledBox>
  );
};
