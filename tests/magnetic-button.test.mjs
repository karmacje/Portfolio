import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire, Module } from "node:module";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const typescript = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const componentPath = fileURLToPath(new URL("../components/MagneticButton.tsx", import.meta.url));

async function renderMagneticButton(props) {
  const source = await readFile(componentPath, "utf8");
  const compiledSource = typescript.transpileModule(source, {
    compilerOptions: {
      jsx: typescript.JsxEmit.ReactJSX,
      module: typescript.ModuleKind.CommonJS,
      target: typescript.ScriptTarget.ES2020,
    },
  }).outputText;
  const componentModule = new Module(componentPath);
  componentModule.filename = componentPath;
  componentModule.paths = Module._nodeModulePaths(path.dirname(componentPath));
  componentModule._compile(compiledSource, componentPath);

  return renderToStaticMarkup(React.createElement(componentModule.exports.default, props));
}

test("MagneticButton renders an accessible link with its directional icon", async () => {
  const markup = await renderMagneticButton({ href: "#contact", children: "Contact me" });

  assert.match(markup, /<a[^>]*href="#contact"/);
  assert.match(markup, /Contact me/);
  assert.match(markup, /<svg[^>]*aria-hidden="true"/);
});

test("MagneticButton preserves native summary disclosure semantics", async () => {
  const markup = await renderMagneticButton({ as: "summary", children: "View Case Study" });

  assert.match(markup, /<summary[^>]*>/);
  assert.match(markup, /View Case Study/);
  assert.doesNotMatch(markup, /<button/);
});
