[README.md](https://github.com/user-attachments/files/33898518/README.md)
# PM Time Machine

**Rewrite the decisions that shaped technology.**
A playable product management simulator. Step into the product manager's chair at a turning point in tech history, make two hard decisions, see the consequences, and replay to explore alternate timelines.

**Live demo:** _add your link here after deploying_ (for example `https://YOUR-USERNAME.github.io/pm-time-machine/`)
**Feedback form:** https://forms.gle/AjePQcNBjiTGCqnh8

## The problem

Aspiring product managers learn mostly by reading about decisions, not making them. Case studies explain what happened, and frameworks explain what to do, but few places let a beginner practice a hard trade-off and see the consequences without real-world risk.

## Who it is for

Aspiring product managers who want to practice difficult product decisions and understand the trade-offs before they face them in a real role or interview. Early-career PMs and educators are a later audience.

*Early evidence:* an informal poll of 6 aspiring PMs found 4 who had never practiced a trade-off hands-on. This is a small sample, to be validated with more testing.

## How it works

1. **Pick a case study.** Browse by era or crisis type, search, or tap "Surprise me".
2. **Read the brief.** Role, key tension, and the situation.
3. **Make two decisions.** Each choice changes three scores from 0 to 100: customer trust, product quality and team morale. No choice is perfect.
4. **See your scorecard.** Profile, verdict, a recap of your decisions, your alternate timeline, a PM lesson, and the other timelines you did not take.
5. **Replay.** Try a different path, or another case study. Progress is saved in the browser.

## What is inside

- **322 case studies:** 8 hand-written classics plus 314 generated from 7 crisis patterns (Crash, Privacy, Scale, Safety, Pricing, Accuracy, First-Run Drop-Off) across 56 fictional products in 7 eras. Safety and Accuracy only pair with products where they make sense.
- **10 featured case studies** shown by default (the 8 classics plus HealthChat Guide and PayPocket Wallet).
- **Rule-based simulation engine.** Each crisis type has its own scoring pattern, key tension and PM lesson.
- **Progress, badges and an Insights page** (visits, scenarios finished, days played, results shared). Insights shows data from the current device only.
- **Light and dark themes**, mobile-friendly layout, keyboard shortcuts (1, 2, 3).

All scenarios are fictionalized and inspired by tech history. They are not reconstructions of real events, and all product names are invented.

## Why not just ask ChatGPT?

Curated scenarios, tracked scores, alternate timelines and replay, not open-ended chat. The core game uses no AI. When the page runs inside Claude, an optional AI coach can give feedback on a player's reasoning.

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
