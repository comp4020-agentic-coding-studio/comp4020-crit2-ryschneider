import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

// Crit 2 ("Unsolicited redesign") spec line under test: "the organisation is
// real (and your page includes a link to their real site)". This can't verify
// the organisation is real, but a link out to somewhere that isn't this site
// is the checkable half of that line — the rest is judged at the crit.
const SITE_ORIGIN = "https://comp4020-agentic-coding-studio.github.io";

describe("redesign: home page", () => {
  const doc = new JSDOM(
    readFileSync(resolve("dist/index.html"), "utf8"),
  ).window.document;

  it("links out to the real organisation's own site", () => {
    const externalLinks = [...doc.querySelectorAll("a[href]")].filter(
      (a) => {
        const href = a.getAttribute("href") ?? "";
        return /^https?:\/\//.test(href) && !href.startsWith(SITE_ORIGIN);
      },
    );
    expect(
      externalLinks.length,
      "expected at least one <a> linking to the organisation's real site",
    ).toBeGreaterThan(0);
  });
});
