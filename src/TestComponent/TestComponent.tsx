import React from "react";

interface TestComponentProps {
  text: string;
}

const TestComponent: React.FC<TestComponentProps> = ({ text }) => (
  <div>{text}</div>
);

export default TestComponent;
