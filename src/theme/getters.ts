import defaultTheme, {
  ColorType,
  ColorIndex,
  ThemeProps,
  Space,
  FontSize,
  LineHeight,
  Radii,
  BorderWidths,
  Shadows,
  Sizes,
  Durations,
  BorderStyles,
  ZIndices,
} from "./theme";

function getTheme(props: ThemeProps) {
  return props.theme && props.theme.colors ? props.theme : defaultTheme;
}

export function getColor(
  type: ColorType,
  index: ColorIndex,
  props?: ThemeProps
) {
  return getTheme(props).colors[type][index];
}

export function getSpace(space: Space, props?: ThemeProps) {
  return getTheme(props).space[space] + "px";
}

export function getSizes(sizes: Sizes, props?: ThemeProps) {
  return getTheme(props).sizes[sizes] + "px";
}

export function getRadii(radii: Radii, props?: ThemeProps) {
  return getTheme(props).radii[radii] + "px";
}

export function getBorderWidths(
  borderWidths: BorderWidths,
  props?: ThemeProps
) {
  return getTheme(props).borderWidths[borderWidths] + "px";
}

export function getShadows(shadows: Shadows, props?: ThemeProps) {
  return getTheme(props).shadows[shadows];
}

export function getDurations(durations: Durations, props?: ThemeProps) {
  return getTheme(props).durations[durations] + "ms";
}

export function getZIndices(zIndices: ZIndices, props?: ThemeProps) {
  return getTheme(props).zIndices[zIndices];
}

export function getBorderStyles(
  borderStyles: BorderStyles,
  props?: ThemeProps
) {
  return getTheme(props).borderStyles[borderStyles];
}

export function getFontSize(fontSize: FontSize, props?: ThemeProps) {
  return getTheme(props).fontSize[fontSize] / 16 + "rem";
}

export function getLineHeight(lineHeight: LineHeight, props?: ThemeProps) {
  return getTheme(props).lineHeight[lineHeight] / 16 + "rem";
}
