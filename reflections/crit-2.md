# Crit 2 reflection

**What was the breakthrough that moved the work forward?**

The breakthrough wasn't in the redesign itself but in noticing what wasn't
being checked. `CLAUDE.md` says plainly that nothing in the default roster
measures accessibility, and it's easy to read that as a footnote rather than
a gap to close. Wiring up `axe-core` against the built HTML turned that gap
into a sensor, and the very first run justified the effort: it failed on a
real `heading-order` violation I would not have caught by looking at the
rendered page, because visually a route name reads fine at any heading level.
The fix was one line, but the moment that mattered was building the thing
that could see the problem at all, not the line itself.

**What did this work change about who I want to be as a developer?**

It sharpened a distinction I hadn't made explicit before: between a check
that passes because nothing's wrong, and a check that passes because it was
never capable of catching the thing that's wrong. A green suite is only as
honest as its coverage, and it's tempting to treat "the tests pass" as the
end of the question rather than the start of "passes at what?" I want to be
the kind of developer who asks that second question by default --- who
treats a clean run against a weak sensor with the same suspicion as a
failing run, and who spends effort growing the harness itself (a rule in
`CLAUDE.md`, a new sensor, a test that could actually fail) rather than only
ever satisfying the one that's already there.
