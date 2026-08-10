import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import axe from "axe-core";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

// CLAUDE.md is explicit that nothing in the standard check roster measures
// accessibility — wiring that sensor is our own work. jsdom doesn't paint or
// lay out the page, so rules that depend on actual rendering (contrast,
// visibility-on-screen) can't be evaluated here and are turned off; this
// catches structural/ARIA problems (missing labels, duplicate landmarks,
// invalid roles), not the full axe ruleset.
describe("accessibility: home page", () => {
  it("has no automatically detectable structural a11y violations", async () => {
    const dom = new JSDOM(readFileSync(resolve("dist/index.html"), "utf8"), {
      url: "https://comp4020-agentic-coding-studio.github.io/comp4020-crit2-ryschneider/",
    });

    const results = await axe.run(dom.window.document.documentElement, {
      rules: {
        "color-contrast": { enabled: false },
        "focus-order-semantics": { enabled: false },
      },
    });

    const messages = results.violations.map(
      (violation) =>
        `${violation.id} (${violation.impact}): ${violation.help} — ${violation.nodes.length} element(s)`,
    );
    expect(messages, messages.join("\n")).toEqual([]);
  });
});
