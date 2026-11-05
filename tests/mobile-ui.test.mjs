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

test("contact footer keeps its links and copyright in a compact mobile layout", () => {
  assert.match(page, /className="footer-socials"/);
  assert.match(page, />Email me\s*<span/);
  assert.doesNotMatch(styles, /\.contact-footer\s*\{[^}]*border-top\s*:/s);
});
