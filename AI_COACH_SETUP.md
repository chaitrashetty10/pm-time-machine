# Turn on the live AI coach (optional)

The coach already works with no setup: it shows notes written by Claude and answers four suggested questions. Follow this to make it **live**, so visitors can also type their own questions. A small Cloudflare Worker sits between your page and the AI, so no key is ever in the page or on GitHub. Cloudflare's free plan is enough.

Choose one AI source:

| | Cost | Setup |
|---|---|---|
| **A. Cloudflare Workers AI** | Free daily allowance | No API key. Add a binding. |
| **B. Claude (Anthropic API)** | Paid credits, small | Add a secret key. Better answers. |

If both are set, Claude is used.

## 1. Create the Worker
1. Create a free account at **dash.cloudflare.com**.
2. Open **Workers & Pages**, choose **Create**, then **Create Worker**, name it `pm-coach`, and click **Deploy**.
3. Click **Edit code**, delete the sample, paste in everything from `cloudflare-worker/worker.js`, and click **Deploy**.

## 2. Add settings
Open the Worker's **Settings**.

**Always add (Variables and Secrets, type Text):**
- `ALLOWED_ORIGINS` = `https://chaitrashetty10.github.io`

**Option A, free:** open **Bindings > Add > Workers AI** and set the variable name to `AI`.
- The default model is `@cf/meta/llama-3.1-8b-instruct`. Cloudflare retires models over time. If answers stop working, pick a current text model from Cloudflare's Workers AI model list and set a Text variable `WORKERS_AI_MODEL` to its id.
- The free allowance is limited per day. When it runs out, the page falls back to the built-in answers.

**Option B, Claude:**
1. At **console.anthropic.com**, add a little credit and set a **low monthly spend limit**.
2. Create an API key. Add it to the Worker as a **Secret** named `ANTHROPIC_API_KEY`. Never paste it into `index.html` or GitHub.
3. Optional Text variable `ANTHROPIC_MODEL` (default `claude-haiku-5-5`).

Save and deploy. Your Worker address looks like `https://pm-coach.YOUR-NAME.workers.dev`. Open it in a browser. You should see a message saying the coach is running.

## 3. Connect the page
In `index.html`, find `var COACH_URL="",busy=false;` and put your address between the quotes:
```
var COACH_URL="https://pm-coach.YOUR-NAME.workers.dev",busy=false;
```
Commit to GitHub. GitHub Pages updates in about a minute.

## 4. Test
Finish a case study on your live site. The coach card badge should read **Live AI**, with a box for typing your own question. Tap a suggested question and type one of your own. If the live AI fails, suggested questions still get built-in answers.

## Notes
- The page sends only structured fields (case study, your two decisions, scores, your question). The Worker builds the prompt itself and is told to stay on product management.
- It only accepts requests from your site and allows 30 per hour per visitor (best effort).
- Free allowances and model names change, so check Cloudflare's and Anthropic's current pages if something stops working.
