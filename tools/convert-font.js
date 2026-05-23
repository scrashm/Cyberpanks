const fs = require("fs");
const path = require("path");
const { Font, woff2 } = require("./fonteditor-core/lib/main");

const root = path.join(__dirname, "..");
const svgPath = path.join(root, "assets/fonts/cybersiberia.svg");
const outDir = path.join(root, "assets/fonts");
const wasmUrl = path.join(__dirname, "fonteditor-core/woff2/woff2.wasm");

async function main() {
  const svg = fs.readFileSync(svgPath, "utf8");
  const font = Font.create(svg, { type: "svg" });

  fs.writeFileSync(path.join(outDir, "cybersiberia.ttf"), font.write({ type: "ttf" }));
  fs.writeFileSync(path.join(outDir, "cybersiberia.woff"), font.write({ type: "woff" }));

  await woff2.init(wasmUrl);
  fs.writeFileSync(path.join(outDir, "cybersiberia.woff2"), font.write({ type: "woff2" }));

  console.log("Created: cybersiberia.ttf, .woff, .woff2");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
