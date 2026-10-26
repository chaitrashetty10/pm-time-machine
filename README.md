# PM Time Machine

**Rewrite the decisions that shaped technology.**
A playable product management simulator. Step into the product manager's chair at a turning point in tech history, make two hard decisions, see the consequences, and replay to explore alternate timelines.

**Live demo:** https://chaitrashetty10.github.io/pm-time-machine/
**Feedback form:** https://forms.gle/AjePQcNBjiTGCqnh8

## The problem

Aspiring product managers learn mostly by reading about decisions, not making them. Case studies explain what happened, and frameworks explain what to do, but few places let a beginner practice a hard trade-off and see the consequences without real-world risk.

## Who it is for

Aspiring product managers who want to practice difficult product decisions and understand the trade-offs before they face them in a real role or interview. Early-career PMs and educators are a later audience.

*Early evidence:* an informal poll of 6 aspiring PMs found 4 who had never practiced a trade-off hands-on. This is a small sample, to be validated with more testing.

## How it works

1. **Pick a case study.** Start with the featured ones on Home, or browse all of them on the Cases tab with search and filters.
2. **Read the brief.** Role, key tension, and the situation.
3. **Make two decisions.** Each choice changes three scores from 0 to 100: customer trust, product quality and team morale. No choice is perfect.
4. **See your scorecard.** Profile, verdict, a recap of your decisions, your alternate timeline, a PM lesson, and the other timelines you did not take.
5. **Ask the coach and replay.** Tap a question to understand your result, then try a different path or another case study. Progress is saved in the browser.

## What is inside

- **322 case studies:** 8 hand-written classics plus 314 generated from 7 crisis patterns (Crash, Privacy, Scale, Safety, Pricing, Accuracy, First-Run Drop-Off) across 56 fictional products in 7 eras. Safety and Accuracy only pair with products where they make sense.
- **10 featured case studies** shown by default (the 8 classics plus HealthChat Guide and PayPocket Wallet).
- **Rule-based simulation engine.** Each crisis type has its own scoring pattern, key tension and PM lesson.
- **An Insights tab** with your progress, badges and product insights across the five AARRR stages (visits, scenarios finished, days played, shares, revenue plan). Insights shows data from the current device only.
- **Light and dark themes**, mobile-friendly layout, keyboard shortcuts (1, 2, 3).

All scenarios are fictionalized and inspired by tech history. They are not reconstructions of real events, and all product names are invented.

## Why not just ask ChatGPT?

Curated scenarios, tracked scores, alternate timelines, a debrief and replay, not open-ended chat. The game needs no AI and no server. The scorecard has a built-in coach with notes written by Claude and eight questions you can tap, such as "Which score mattered most here?" and "How do I explain this in an interview?". Every case study also has a case file before you play and a "what went well / what went wrong" debrief after.

## Tech

One static file, `index.html`. HTML, CSS and vanilla JavaScript, no build step, no dependencies, no backend. Progress is stored in `localStorage`.

## Run it locally

Open `index.html` in any modern browser.

## Deploy

**GitHub Pages:** Settings > Pages > Source: "Deploy from a branch" > `main` and `/ (root)`. The site appears at `https://YOUR-USERNAME.github.io/REPO-NAME/` after about a minute.
**Vercel / Netlify:** import the repo with no build command and no output directory.

## Configuration

Two settings at the top of the script in `index.html`:

- `FEEDBACK_URL`: the feedback form link shown on every scorecard.
- `APP_URL`: optional. Leave empty to use the page's own address in "Share" text.

## Limitations

- Generated case studies share a structure within each crisis type, so they feel similar. The featured set is the best experience.
- Scoring is a teaching model, not a prediction of real outcomes.
- Insights and badges are per-device. Central feedback is collected through the Google Form.

## License

MIT. See `LICENSE`.
