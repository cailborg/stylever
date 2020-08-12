import React from "react";
import styled from "styled-components";
import { theme } from "../theme";

export interface TestComponentProps {
  text: string;
}

const StyledDiv = styled.div`
  color: ${theme.color("purple", 0)};
  background: ${theme.color("red", 9)};
  border: 1px solid black;
  padding: ${theme.space("m")};
  width: ${theme.size("m")};
  text-align: center;
  border-radius: ${theme.radius("m")};
  border-width: ${theme.borderWidth("thick")};
  border-style: ${theme.borderStyle("dotted")};
  box-shadow: ${theme.shadow("medium")};
  animation-duration: ${theme.duration("quick")};
  z-index: ${theme.zIndex("auto")};
`;

const StyledHeading = styled.h1`
  font-size: ${theme.fontSize("heading-xs")};
  line-height: ${theme.lineHeight("body-3")};
`;

const StyledDescription = styled.h2``;

export const TestComponent: React.FC<TestComponentProps> = ({ text }) => (
  <StyledDiv data-testid="test-component">
    <StyledHeading className="heading">I'm the test component</StyledHeading>
    <StyledDescription>{text}</StyledDescription>
  </StyledDiv>
);
