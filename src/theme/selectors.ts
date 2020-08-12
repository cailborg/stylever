import { ThemeProps } from "./theme";

import {
  getColor,
  getSpace,
  getFontSize,
  getLineHeight,
  getRadii,
  getBorderWidths,
  getShadows,
  getSizes,
  getDurations,
  getBorderStyles,
  getZIndices,
} from "./getters";

import { OmitThemeProp, Resolver } from "./types";

function createSelector<T extends (...args: any) => any>(getter: T) {
  function x(...args: OmitThemeProp<Parameters<T>>): Resolver<ReturnType<T>>;
  function x(...args: Parameters<T>): ReturnType<T>;
  function x(...args: any): any {
    if (args.length === getter.length) {
      return getter(...args);
    }

    return (props: ThemeProps) => getter(...args, props);
  }

  return x;
}

export const space = createSelector(getSpace);
export const color = createSelector(getColor);
export const fontSize = createSelector(getFontSize);
export const lineHeight = createSelector(getLineHeight);
export const radius = createSelector(getRadii);
export const borderWidth = createSelector(getBorderWidths);
export const shadow = createSelector(getShadows);
export const size = createSelector(getSizes);
export const duration = createSelector(getDurations);
export const borderStyle = createSelector(getBorderStyles);
export const zIndex = createSelector(getZIndices);
