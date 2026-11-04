# Live demo acceptance checklist

Reusable manual browser checklist. For executed visual-correction checks and screenshots, see [the visual review](design/VISUAL-REVIEW.md). Do not mark checks passed based solely on code review.

- [ ] A — Fresh site (`localStorage` cleared): Welcome message appears.
- [ ] B — Click Let's Go or X: desktop with four working icons remains.
- [ ] C — Choose arcade in Memory Viewer: developing animation then saved Polaroid; capsule 1/3.
- [ ] D — Open phone, open SMS, select one of the options, Send: message sent and capsule 2/3.
- [ ] E — Open mixtape, select Funky Mixtape, add: capsule 3/3. Disabled controls indicate no audio assets.
- [ ] F — Open capsule: the exact photo, message, track appear and Seal is enabled.
- [ ] G — Seal: segmented progress advances (~2s), then personalised Save Complete keepsake.
- [ ] H — Start Again: capsule empty, welcome displayed; sealing disabled at 0/3.
- [ ] I — In a fresh run, complete cassette → phone → photo: same result.
- [ ] J — Close and reopen photo/phone/cassette: selections persist; photo does not re-develop.
- [ ] K — Refresh after two selections: 2/3 restored. Refresh after seal: final card restored.
- [ ] L — Without audio assets: no broken URLs or fake playback; selection and seal work.
- [ ] Custom SMS: empty/whitespace rejected, text max 120 chars, arrow/Escape typing unaffected.
- [ ] Invalid/malformed stored JSON: app loads safely with empty capsule.
- [ ] Keyboard: tab through all actions, clear focus, close buttons keyboard reachable.
- [ ] Reduced motion emulation: developing/sealing waits almost instant; functionality preserved.
- [ ] Desktop 1440×900, 1366×768, 1024px, 768px, mobile 375px: no page horizontal overflow; all content scrollable and taskbar accessible.
- [ ] Console: no blocking runtime errors; typecheck and production build pass.

## Docker acceptance (to execute in a Docker-enabled environment)

- [ ] `docker compose up --build` completes without an npm test, typecheck or build error.
- [ ] `http://localhost:8080` serves the desktop and its three local SVG scene assets.
- [ ] Refresh and restart the `web` container; choices persist for the same browser origin.
- [ ] `docker compose --profile dev up --build dev` loads at `http://localhost:5173` and source edits hot-reload.
- [ ] `docker compose --profile dev run --rm --no-deps dev npm run typecheck` passes.
- [ ] No Docker service requires a backend, environment secret or local Node/npm installation.
