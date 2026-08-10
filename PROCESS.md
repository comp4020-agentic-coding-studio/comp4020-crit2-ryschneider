# Process overview

A reading-guide to how the work came together --- a map to your process, not an
essay about it. Markers read this file and follow its citations; they don't
trawl the repo for evidence you didn't point at, so if a moment mattered, cite
it.

This file is the shape; the course site's
[assessment page](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/topics/assessment/#what-you-submit)
is the requirement, and its
[word counts](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/topics/assessment/#word-counts)
cover every deliverable.

## What I built

An unsolicited redesign of thecrag.com's route search: an area picker (a
clickable NSW/ACT region map plus a text fallback), a filter panel (grade
range, style, star rating), and a results list of route cards, all client-side
against a small bundled route catalogue rather than a live API
([`6e1e1a4`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-ryschneider/commit/6e1e1a4b562818763c072ff01f5d43023aec2f45)).
The idea was to keep the parts of the original that work --- a dense,
scannable results list --- while replacing the parts that don't: the area
picker gives a spatial shortcut into the region hierarchy instead of a plain
dropdown, and every interactive control carries the ARIA labelling and
keyboard semantics the original page was missing.

## The moments that mattered

1. **What happened**: nothing in this repo's check roster measures
   accessibility --- `CLAUDE.md` says as much explicitly, and calls wiring that
   sensor out as the student's own work rather than something the template
   gives you for free. Before this, the only signal on the page's structure
   was `spec/invariants.test.ts`'s single generic heading-count check, which
   can't catch a broken heading *order*.
2. **What I did instead of the obvious thing**: the obvious move is to eyeball
   the rendered page and judge accessibility by look. Instead I added
   `spec/accessibility.test.ts`, which parses the built `dist/index.html` with
   jsdom and runs it through `axe-core`, following the same
   read-the-built-output pattern the existing spec tests already use. I turned
   off `color-contrast` and `focus-order-semantics` deliberately rather than
   leaving them silently green: jsdom doesn't paint or lay out the page, so a
   passing result for those two rules there would be meaningless, not
   reassuring.
3. **How I knew it was right**: the first run wasn't a clean pass to rubber-stamp
   --- it failed with a real `heading-order` violation. The results list's
   `<h2>Routes</h2>` was followed by each route card's name in an `<h4>`, with
   no `<h3>` between them. I fixed the card heading to `<h3>` and re-ran the
   full `pnpm check` roster (typecheck, build, lint, and the whole `vitest`
   suite, now 4 files / 17 tests), which went green, rather than just re-running
   the one new test in isolation.
4. **The citation**:
   [`096234a`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-ryschneider/commit/096234a)
   adds the sensor and the fix it found in the same commit --- the test and the
   bug it caught belong together in the history.

## Before you ship

I also ran `pnpm dlx linkinator ./dist --silent` locally per the workflow this
file recommends, staged under a directory named for the deployed base path
(`.../comp4020-crit2-ryschneider/index.html`) with `--server-root` pointed at
its parent so the absolute asset paths resolve the way they will on the real
GitHub Pages URL rather than 404'ing against an unprefixed local `dist/`. All
internal links resolved; the only non-2xx result was a `403` from
`thecrag.com` itself on an anti-bot HEAD request, not a link this site
controls.

## Before you ship

`pnpm check:evidence` verifies your citations resolve to real commits, that the
current reflection entry is in `reflections/`, and that your `CLAUDE.md` is
there --- before a marker ever opens the file. It checks that your map is
traceable, not that it is good: the marker judges whether your small,
deliberately chosen set of moments shows real judgement and reflection. A green
check is not a substitute for that curation.

Images are deliberately not checked, because whether one renders is visible the
moment you look. Open this file on GitHub and look at it before you ship.