import theme from "./tokens.json";

export type Theme = typeof theme;

export type ThemeProps = { theme?: Theme };

export type ColorType = keyof Theme["colors"];

export type ColorIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Space = keyof Theme["space"];

export type Sizes = keyof Theme["sizes"];

export type Radii = keyof Theme["radii"];

export type BorderWidths = keyof Theme["borderWidths"];

export type Shadows = keyof Theme["shadows"];

export type Durations = keyof Theme["durations"];

export type ZIndices = keyof Theme["zIndices"];

export type BorderStyles = keyof Theme["borderStyles"];

export type FontSize = keyof Theme["fontSize"];

export type LineHeight = keyof Theme["lineHeight"];

export default theme;
