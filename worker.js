// Cloudflare Worker: live AI coach for PM Time Machine.
// Option A (best quality): Claude via the Anthropic API. Add the secret ANTHROPIC_API_KEY.
// Option B (free): Cloudflare Workers AI. Add a Workers AI binding named AI. No API key needed.
// If both are set, Claude is used. Keys never appear in the web page.
const DEFAULT_ORIGINS = ["https://chaitrashetty10.github.io"];
const DEFAULT_MODEL = "claude-haiku-5-5";
const DEFAULT_AI_MODEL = "@cf/meta/llama-3.1-8b-instruct"; // change with WORKERS_AI_MODEL if Cloudflare retires it
const MAX_PER_HOUR = 30; // per visitor IP, best effort (resets when the Worker restarts)
const hits = new Map();

const clean = (v, n) => String(v == null ? "" : v).replace(/[\r\n]+/g, " ").slice(0, n);

export default {
  async fetch(request, env) {
    const allowed = (env.ALLOWED_ORIGINS ? env.ALLOWED_ORIGINS.split(",") : DEFAULT_ORIGINS).map((s) => s.trim());
    const origin = request.headers.get("Origin");
    const cors = {};
    if (origin && allowed.includes(origin)) {
      cors["Access-Control-Allow-Origin"] = origin;
      cors["Vary"] = "Origin";
      cors["Access-Control-Allow-Methods"] = "POST, OPTIONS";
      cors["Access-Control-Allow-Headers"] = "Content-Type";
    }
    const send = (obj, status = 200) =>
      new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json", ...cors } });

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (request.method === "GET") return send({ ok: true, message: "PM Time Machine coach is running. Use POST." });
    if (request.method !== "POST") return send({ error: "POST only" }, 405);
    if (origin && !allowed.includes(origin)) return send({ error: "Origin not allowed" }, 403);
    if (!env.ANTHROPIC_API_KEY && !env.AI) return send({ error: "AI coach is not configured" }, 503);

    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    const now = Date.now();
    const list = (hits.get(ip) || []).filter((t) => now - t < 3600000);
    if (list.length >= MAX_PER_HOUR) return send({ error: "Too many requests, try again later" }, 429);
    list.push(now);
    hits.set(ip, list);

    let b = null;
    try { b = JSON.parse(await request.text()); } catch (e) {}
    if (!b || !Array.isArray(b.scores) || b.scores.length !== 3) return send({ error: "Bad request" }, 400);
    const sc = b.scores.map((n) => Math.max(0, Math.min(100, Math.round(Number(n) || 0))));

    const q = clean(b.q, 200);
    const system =
      "You are a friendly product management coach for beginners. Explain ideas in simple words with a concrete example. Reply in plain text with no markdown, in under 110 words. Only discuss product management and this simulation; if asked about anything else, politely steer back.";
    const user =
      "A learner played a fictionalized simulation: " + clean(b.name, 120) + " (" + clean(b.era, 60) + "). Situation: " + clean(b.situation, 300) +
      " Decision 1: " + clean(b.d1, 120) + ". Decision 2: " + clean(b.d2, 120) + ". Final scores out of 100: trust " + sc[0] +
      ", quality " + sc[1] + ", morale " + sc[2] + ". " +
      (q
        ? "The learner asks: \"" + q + "\". Answer their question simply, using their result as the example."
        : "Name one strength in their reasoning, one trade-off they overlooked, and one question to think about when replaying.");

    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 20000);
    try {
      let text = "";
      if (env.ANTHROPIC_API_KEY) {
        const r = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "x-api-key": env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
          body: JSON.stringify({
            model: env.ANTHROPIC_MODEL || DEFAULT_MODEL,
            max_tokens: 300,
            system,
            messages: [{ role: "user", content: user }],
          }),
          signal: ctl.signal,
        });
        const data = await r.json();
        if (r.ok && data && Array.isArray(data.content)) {
          text = data.content.filter((c) => c.type === "text").map((c) => c.text).join(" ").trim();
        }
      } else {
        const out = await env.AI.run(env.WORKERS_AI_MODEL || DEFAULT_AI_MODEL, {
          messages: [{ role: "system", content: system }, { role: "user", content: user }],
          max_tokens: 300,
        });
        const r = out && (out.response || (out.result && out.result.response) || (out.choices && out.choices[0] && out.choices[0].message && out.choices[0].message.content));
        text = String(r || "").trim();
      }
      if (!text) return send({ error: "AI coach unavailable" }, 502);
      return send({ text: text.slice(0, 1200) });
    } catch (e) {
      return send({ error: "AI coach unavailable" }, 502);
    } finally {
      clearTimeout(timer);
    }
  },
};
