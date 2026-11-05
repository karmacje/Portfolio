import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const navigation = await readFile(new URL("../components/SiteNavigation.tsx", import.meta.url), "utf8");
const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

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
