import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const navigation = await readFile(new URL("../components/SiteNavigation.tsx", import.meta.url), "utf8");
const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
const projectList = await readFile(new URL("../components/ProjectList.tsx", import.meta.url), "utf8");

function getColorToken(name) {
  const match = styles.match(new RegExp(`${name}:\\s*(#[\\da-f]{6})`, "i"));
  assert.ok(match, `Expected ${name} to be a six-digit hex color token`);
  return match[1];
}

function contrastRatio(firstColor, secondColor) {
  function luminance(color) {
    const [red, green, blue] = color.slice(1).match(/../g).map((channel) => {
      const value = Number.parseInt(channel, 16) / 255;
      return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2;
    });

    return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
  }

  const luminances = [luminance(firstColor), luminance(secondColor)].sort((a, b) => b - a);
  return (luminances[0] + 0.05) / (luminances[1] + 0.05);
}

test("accent and solid button colors meet WCAG AA text contrast", () => {
  const blue = getColorToken("--blue");
  const ground = getColorToken("--ground");
  const surface = getColorToken("--surface");
  const selectionColors = styles.match(/::selection\s*\{([^}]*)\}/)?.[1];
  const selectionForegroundToken = selectionColors?.match(/color:\s*var\((--[\w-]+)\)/)?.[1];

  assert.ok(
    contrastRatio(blue, ground) >= 4.5,
    `Expected blue on ground to meet 4.5:1 contrast, got ${contrastRatio(blue, ground).toFixed(2)}:1`,
  );
  assert.ok(
    contrastRatio(surface, blue) >= 4.5,
    `Expected surface on blue to meet 4.5:1 contrast, got ${contrastRatio(surface, blue).toFixed(2)}:1`,
  );
  assert.ok(selectionForegroundToken, "Expected selection text to use a color token");
  const selectionForeground = getColorToken(selectionForegroundToken);
  assert.ok(
    contrastRatio(selectionForeground, blue) >= 4.5,
    `Expected selected text on blue to meet 4.5:1 contrast, got ${contrastRatio(selectionForeground, blue).toFixed(2)}:1`,
  );
});

test("mobile navigation exposes an accessible scroll-triggered menu", () => {
  const mobileStyles = styles.split("@media (max-width: 760px)").at(-1);

  assert.match(navigation, /aria-expanded=\{isMenuOpen\}/);
  assert.match(navigation, /aria-controls="primary-navigation-links"/);
  assert.match(navigation, /id="primary-navigation-links"/);
  assert.match(navigation, /setIsMenuOpen\(false\)/);
  assert.match(mobileStyles, /\.nav-actions\s*\{[^}]*grid-column:\s*1/s);
  assert.match(mobileStyles, /^\s*\.nav-actions\s*\{[^}]*display:\s*none/ms);
  assert.match(styles, /\.site-header\.is-scrolled nav ul\s*\{[^}]*display:\s*none/s);
  assert.match(styles, /\.site-header\.is-scrolled\.is-menu-open nav ul\s*\{[^}]*display:\s*flex/s);
});

test("mobile hero places the portrait before the introduction", () => {
  assert.match(styles, /grid-template-areas:\s*"portrait"\s*"content"/);
});

test("tablet hero preserves the phone portrait crop instead of stretching it full width", () => {
  const mobileStyles = styles.slice(
    styles.indexOf("@media (max-width: 760px)"),
    styles.indexOf("@media (min-width: 600px) and (max-width: 760px)"),
  );
  const tabletPortraitStyles = styles.split(
    "@media (min-width: 600px) and (max-width: 760px)",
  ).at(-1  );

  assert.match(mobileStyles, /\.profile-frame\s*\{[^}]*max-width:\s*24rem/s);
  assert.match(mobileStyles, /\.profile-frame\s*\{[^}]*margin-inline:\s*auto/s);
  assert.match(tabletPortraitStyles, /\.profile img\s*\{[^}]*height:\s*clamp\(20rem,\s*42vw,\s*24rem\)/s);
});

test("short landscape tablet hero stacks the portrait and copy without overlap", () => {
  const landscapeStyles = styles.split(
    "@media (min-width: 761px) and (max-height: 500px)",
  ).at(-1);

  assert.notEqual(landscapeStyles, styles);
  assert.match(landscapeStyles, /\.hero-layout\s*\{[^}]*grid-template-areas:[\s\S]*?"portrait"[\s\S]*?"content"/);
  assert.match(landscapeStyles, /\.hero-content\s*\{[^}]*transform:\s*none/s);
  assert.match(landscapeStyles, /\.profile-frame\s*\{[^}]*transform:\s*none/s);
});

test("contact footer keeps its links and copyright in a compact mobile layout", () => {
  assert.match(page, /className="footer-socials"/);
  assert.match(page, />Email me\s*<span/);
  assert.doesNotMatch(styles, /\.contact-footer\s*\{[^}]*border-top\s*:/s);
});

test("site header and footer sit outside the main landmark", () => {
  assert.equal((page.match(/<main>/g) ?? []).length, 1);
  assert.match(navigation, /<header[\s\S]*<\/header>/);
  assert.match(page, /return\s*\(\s*<>[\s\S]*?<SiteNavigation\s*\/>\s*<main>/);
  assert.match(page, /<\/main>\s*<footer className="contact-footer/);
});

test("mobile case study and scroll cue have 44px tap areas", () => {
  const mobileStyles = styles.slice(
    styles.indexOf("@media (max-width: 760px)"),
    styles.indexOf("@media (min-width: 600px) and (max-width: 760px)"),
  );

  assert.match(mobileStyles, /\.project-item summary\s*\{[^}]*display:\s*inline-flex[^}]*min-height:\s*44px/s);
  assert.match(mobileStyles, /\.scroll-cue\s*\{[^}]*min-height:\s*44px/s);
});

test("project entries expose labeled image and pending testimonial placeholders", () => {
  assert.match(projectList, /projects\.map\(\(project\) => \(/);
  assert.match(
    projectList,
    /<figure className="project-preview-placeholder">[\s\S]*?<figcaption>Project image placeholder<\/figcaption>/,
  );
  assert.match(projectList, /<section className="project-testimonial" aria-labelledby=/);
  assert.match(
    projectList,
    /<figure className="testimonial-portrait-placeholder">[\s\S]*?<figcaption>Portrait placeholder<\/figcaption>/,
  );
  assert.match(projectList, /Quote, name, role, and portrait pending approval\./);
});
