# SUPER AWESOME ARCADE: Master Template Prompt (v2)

Paste the prompt below into Claude. Replace the three bracketed items: [CONCEPT MECHANICS] (one module from your original 12 Concept Mechanics list), plus [GAME NAME / NUMBER / TAGLINE] and [SIGNATURE COLOR] from the identity kit.
After generating, save the output as `games/<slug>/index.html`, add the game to `games.json`, and test on your phone.

Signature colors (never green; green means "good news"): cyan #00F3FF, amber #FFB000, violet #9D4EDD, orange #FF6B1A, ice #7DF9FF, yellow #FFE600.

---

Act as an expert HTML5 game developer. Write a complete single-file `index.html` game using vanilla JavaScript and a `<canvas>`. No external images, audio, or libraries.

**The game loads the shared arcade SDK with `<script src="../../hub.js"></script>`.** Do NOT write your own paywall, play counter, high score storage, share logic, or initials entry. Use these existing functions only:
- `HUB.canPlay(slug)`: call at the start of every round. If it returns false, do nothing (the SDK shows the INSERT COIN paywall).
- `HUB.onUnlock = startRound;` so the game starts after a successful unlock.
- `HUB.track(slug,'round_start')` on round start and `HUB.track(slug,'round_end',score)` on death.
- `HUB.best(slug,score)` returns `{best,isNew}`. If `isNew` and `score>0` and `!HUB.ini()`, call `HUB.initials(callback)`.
- `HUB.share(slug,title,score,buttonElement)`: wire to a "CHALLENGE FRIENDS" button on the game over screen.
- `HUB.creditsText(slug)`: show on the attract and game over screens.
- `HUB.watermark(ctx,360,640)`: call every frame after drawing.
- `HUB.B` (brand colors: bg, pink, green, white), `HUB.PAL` (signature colors), `HUB.ready` (promise; start drawing after it resolves).

### 1. CORE MECHANICS
[CONCEPT MECHANICS]

### 2. IDENTITY KIT (put these in one `const T={...}` theme block at the top of the script)
`slug`, `name`: [GAME NAME], `no`: [NUMBER], `tag`: [TAGLINE], `hazard`: HUB.PAL.[SIGNATURE COLOR], `player`: HUB.B.pink, `score`: HUB.B.green, `bg`: HUB.B.bg. All drawing and UI must read colors from `T`.

### 3. ARCADE LOOK AND FLOW
- Logical canvas 360x640 (9:16), scaled to fit the window, centered on a #0D0E12 page. All text uses the font family 'Press Start 2P' (already loaded by hub.js), uppercase.
- Trail effect: fill with rgba(13,14,18,.25) each frame instead of clearing.
- Attract screen on load: "No. 0X", the game name in the hazard color with a pink offset shadow, the tagline, the credits text, and a blinking "PRESS START" (CSS class `hub-blink`).
- Game over screen: "GAME OVER", score, `HI <initials> <best>`, credits text, a "CONTINUE? 9..0" countdown, and the CHALLENGE FRIENDS button. One tap restarts, with a 300ms delay guard.
- On death: 14 particle fragments and a 200ms screen shake.
- Obstacle hitboxes are 15% smaller than their drawn size.
- Inputs: touch (pointerdown) and Spacebar/click map to the core action. Prevent scrolling and zooming (touch-action:none).

### 4. OUTPUT
Return ONLY the complete HTML in one code block. Use `games/orbit-dodge/index.html` in the repo as the reference for structure.
