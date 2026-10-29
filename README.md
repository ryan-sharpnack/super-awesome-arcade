# SUPER AWESOME ARCADE (GitHub Pages)

## Tomorrow's launch checklist (Block 3)
1. **Gumroad:** start account/payout verification first. Create the "All-Access Token" product ($1.99). Choose a NEW access key and put it in the delivery email.
2. **GoatCounter:** sign up, copy your site code.
3. **hub.js:** set `gc`, `store`, and replace the key hash (`await HUB.sha('YOURKEY')` in the browser console, paste the result into `hashes`).
4. **GitHub:** create the repo (e.g. `super-awesome-arcade`), push everything, Settings → Pages → `main` / root.
5. **Phone test:** play until INSERT COIN appears, unlock with your key, set initials, tap CHALLENGE FRIENDS, confirm the visit shows in GoatCounter.
6. **Bios:** add the hub URL (use `?utm_source=tiktok`, `youtube`, `instagram`, `x`, `linkedin` per platform).
7. Replace the `#` social links in the footer of `index.html`.

## Brand system
- Constant: #0D0E12 background, Press Start 2P (in `fonts/`, SIL OFL license included), pink player/highlights, green for good news, logo watermark, INSERT COIN paywall, 3-letter initials, "No. 0X" cabinet numbers.
- Per game: one signature hazard color (see `HUB.PAL`), name, tagline, and a thumbnail template. The `T` theme block at the top of each game is the only part that changes.
- New games: use `docs/MASTER_TEMPLATE_PROMPT.md`. Orbit Dodge is the reference implementation.


## Deploy
1. Create a GitHub repo, push these files to `main`.
2. Settings → Pages → Deploy from branch → `main` / root. Your hub is live at `https://<user>.github.io/<repo>/`.
3. Local preview needs a server (fetch fails on file://): `python3 -m http.server`.

## Configure (top of hub.js, `C` object)
- `brand`, `tag` are already set to SUPER AWESOME ARCADE. `store`: your Gumroad/Payhip/Ko-fi product URL.
- `gc`: your GoatCounter site code (free at goatcounter.com). Events log as paths `ev/<game>/<event>`.
- `hashes`: SHA-256 of each valid Access Key. Default key is `ARCADE99` (change it!). Make a hash in the browser console on any page of the hub: `await HUB.sha('YOURKEY')`.

## Add a game
1. Generate it with `docs/MASTER_TEMPLATE_PROMPT.md` (one mechanic + one signature color).
2. Call `HUB.canPlay(slug)` before each round (returns false and shows the paywall at the limit), `HUB.track(slug,'round_end',score)` on death, `HUB.best(slug,score)` (returns {best,isNew}) and `HUB.initials()` for high scores, `HUB.share(slug,title,score,button)` for the share button, and set `HUB.onUnlock` to restart the game.
3. Put it in `games/<slug>/index.html` and flip its `status` to `live` in games.json.

## Events tracked per game
round_start, round_end (score in title), share_click, paywall_view, checkout_click, unlock_attempt, unlock_success, card_click, plus hub-level return_visit.

## Validation scorecard (starting heuristics, tune after your first 2-3 games)
Give every game the same window (e.g. 14 days) and the same posting cadence, then compare:
| Signal | Metric | Rough "keep going" bar |
|---|---|---|
| Content | Link clicks per 1k views | 5+ |
| Fun | round_start per visitor | 3+ |
| Stickiness | return_visit / visitors | 10%+ |
| Virality | share_click / round_end | 3%+ |
| Willingness to pay | checkout_click / paywall_view | 3%+ |
Decision: hits 4-5 → build native; 2-3 → one iteration pass, then re-measure; 0-1 → drop and rotate in the next concept.

## Know the limits
- The paywall is client-side, so it's a soft gate: a determined user can bypass it. That's fine for validation (you're measuring intent), not for protecting revenue.
- One shared key can be passed around. Rotate it by changing `hashes` and emailing new buyers. For real per-buyer keys later, verify Gumroad license keys through a small serverless function (e.g. Cloudflare Worker).
- Plays are counted per game per device per day via localStorage; clearing storage or switching devices resets them.
