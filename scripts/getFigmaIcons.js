const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");
const fetch = require("node-fetch");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
global.DOMParser = new JSDOM().window.DOMParser;
const SVGO = require("svgo");
const svgo = new SVGO({
  plugins: [
    {
      cleanupAttrs: true,
    },
    {
      removeDoctype: true,
    },
    {
      removeXMLProcInst: true,
    },
    {
      removeComments: true,
    },
    {
      removeMetadata: true,
    },
    {
      removeTitle: true,
    },
    {
      removeDesc: true,
    },
    {
      removeUselessDefs: true,
    },
    {
      removeEditorsNSData: true,
    },
    {
      removeEmptyAttrs: true,
    },
    {
      removeHiddenElems: true,
    },
    {
      removeEmptyText: true,
    },
    {
      removeEmptyContainers: true,
    },
    {
      removeViewBox: false,
    },
    {
      cleanupEnableBackground: true,
    },
    {
      convertStyleToAttrs: true,
    },
    {
      convertColors: true,
    },
    {
      convertPathData: true,
    },
    {
      convertTransform: true,
    },
    {
      removeUnknownsAndDefaults: true,
    },
    {
      removeNonInheritableGroupAttrs: true,
    },
    {
      removeUselessStrokeAndFill: true,
    },
    {
      removeUnusedNS: true,
    },
    {
      cleanupIDs: true,
    },
    {
      cleanupNumericValues: true,
    },
    {
      moveElemsAttrsToGroup: true,
    },
    {
      moveGroupAttrsToElems: true,
    },
    {
      collapseGroups: true,
    },
    {
      removeRasterImages: false,
    },
    {
      mergePaths: true,
    },
    {
      convertShapeToPath: true,
    },
    {
      sortAttrs: true,
    },
    {
      removeDimensions: true,
    },
    {
      removeAttrs: { attrs: "(stroke|fill)" },
    },
  ],
});

function xmlToJson(xml) {
  var obj = {};

  if (xml.nodeType == 1) {
    if (xml.attributes.length > 0) {
      obj["attributes"] = {};
      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        obj["attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType == 3) {
    obj = xml.nodeValue;
  }
  var textNodes = [].slice.call(xml.childNodes).filter(function (node) {
    return node.nodeType === 3;
  });
  if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
    obj = [].slice.call(xml.childNodes).reduce(function (text, node) {
      return text + node.nodeValue;
    }, "");
  } else if (xml.hasChildNodes()) {
    for (var i = 0; i < xml.childNodes.length; i++) {
      var item = xml.childNodes.item(i);
      var nodeName = item.nodeName;
      if (typeof obj[nodeName] == "undefined") {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof obj[nodeName].push == "undefined") {
          var old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
    }
  }
  return obj;
}

async function imageURL(id) {
  const response = await fetch(
    `https://api.figma.com/v1/images/${process.env.FIGMA_FILE_ID}?ids=${id}&format=svg`,

    {
      headers: {
        "X-Figma-Token": process.env.FIGMA_PAT,
      },
    }
  );

  const file = await response.json();
  let url = Object.values(file.images);
  return url[0];
}

(async () => {
  try {
    const response = await fetch(
      `https://api.figma.com/v1/files/${process.env.FIGMA_FILE_ID}?node-id=39%3A2`,

      {
        headers: {
          "X-Figma-Token": process.env.FIGMA_PAT,
        },
      }
    );

    const file = await response.json();
    const icons = file.document.children[2].children[0].children;
    let store = {};
    for (const icon of icons) {
      let result = await imageURL(icon.id);
      let fetchedURL = await fetch(result);
      let fetchedXML = await fetchedURL.text();
      let optimisedXML = await svgo.optimize(fetchedXML);
      var nodeXML = new DOMParser().parseFromString(
        optimisedXML.data,
        "text/xml"
      );
      let resultJSON = await xmlToJson(nodeXML);
      let path = resultJSON.svg.path.attributes.d;
      console.log(icon.name, path);
      store[icon.name] = { title: icon.name, drawn: path };
    }
    fs.writeFileSync(
      "src/Icon/iconsConfig.json",
      JSON.stringify(store, null, 2),
      (err) => {
        if (err) throw err;
      }
    );
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
