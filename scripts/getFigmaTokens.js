const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");
const fetch = require("node-fetch");

const nonFigmaDefinedStyleProperties = {
  borderStyles: {
    none: "none",
    dotted: "dotted",
    solid: "solid",
  },
  durations: {
    instant: 0,
    immediate: 150,
    quick: 250,
    moderate: 500,
    slow: 1000,
    glacial: 2000,
  },
  zIndices: {
    auto: "auto",
    top: 9999,
    "500": 500,
    "400": 400,
    "300": 300,
    "200": 200,
    "100": 100,
    "0": 0,
    bottom: -9999,
  },
};

const checkNull = (variable) => {
  if (variable == null) {
    return 0;
  } else {
    return variable;
  }
};

const appendUnit = (value, unit) => (!value ? "0" : `${value}${unit}`);

const extractStyleProperties = (layer) => {
  switch (layer.name) {
    case "colors":
      return {
        colors: Object.fromEntries(
          layer.children.map((colors) => [
            [colors.name],
            Array.from(
              colors.children.map(
                (color) =>
                  `rgba(${Math.round(
                    color.fills[0].color.r * 255
                  )}, ${Math.round(color.fills[0].color.g * 255)}, ${Math.round(
                    color.fills[0].color.b * 255
                  )}, ${Math.round(color.fills[0].color.a)})`
              )
            ).reverse(),
          ])
        ),
      };

    case "space":
      return {
        space: Object.fromEntries(
          layer.children.map((space) => [[space.name], space.size.x])
        ),
      };

    case "sizes":
      return {
        sizes: Object.fromEntries(
          layer.children.map((sizes) => [
            sizes.name,
            sizes.absoluteBoundingBox.width,
          ])
        ),
      };

    case "typography":
      return {
        fonts: Object.fromEntries(
          layer.children.map((type) => [
            [type.name],
            `${type.style.fontFamily.replace(/\s+/g, "")}, san-serif`,
          ])
        ),
        fontSize: Object.fromEntries(
          layer.children.map((type) => [[type.name], type.style.fontSize])
        ),
        fontWeight: Object.fromEntries(
          layer.children.map((type) => [[type.name], type.style.fontWeight])
        ),
        lineHeight: Object.fromEntries(
          layer.children.map((type) => [[type.name], type.style.lineHeightPx])
        ),
        letterSpacing: Object.fromEntries(
          layer.children.map((type) => [[type.name], type.style.letterSpacing])
        ),
      };
    case "radii":
      return {
        radii: Object.fromEntries(
          layer.children.map((radii) => [
            [radii.name],
            checkNull(radii.cornerRadius),
          ])
        ),
      };
    case "borderWidths":
      return {
        borderWidths: Object.fromEntries(
          layer.children.map((border) => [[border.name], border.strokeWeight])
        ),
      };
    case "shadows":
      return {
        shadows: Object.fromEntries(
          layer.children.map((shadow) => [
            shadow.name,
            `${appendUnit(shadow.effects[0].offset.x, "px")} ${appendUnit(
              shadow.effects[0].offset.y,
              "px"
            )} ${appendUnit(shadow.effects[0].radius, "px")} rgba(${
              shadow.effects[0].color.r
            }, ${shadow.effects[0].color.g}, ${
              shadow.effects[0].color.b
            }, ${shadow.effects[0].color.a.toFixed(2)})`,
          ])
        ),
      };

    default:
      return {};
  }
};

(async () => {
  try {
    const response = await fetch(
      `https://api.figma.com/v1/files/${process.env.FIGMA_FILE_ID}?geometry=paths`,

      {
        headers: {
          "X-Figma-Token": process.env.FIGMA_PAT,
        },
      }
    );

    const file = await response.json();

    const theme = file.document.children[1].children.reduce(
      (accumulator, layer) => ({
        ...accumulator,
        ...extractStyleProperties(layer),
      }),
      nonFigmaDefinedStyleProperties
    );

    console.log(theme);

    fs.writeFileSync("src/theme/tokens.json", JSON.stringify(theme));

    process.exit();
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
})();
