# Delivery state — 1996 time capsule MVP

## Current verification — 4 November 2026

The visual correction now follows `docs/design/1996-visual-reference.png`. Docker production build, all 5 state tests, TypeScript and live browser journeys pass. Screenshots at 1440×900 and 1366×768 were inspected against the reference; a complete 375px journey also passed. See [visual review](design/VISUAL-REVIEW.md) for exact evidence, artwork prompts and remaining limits. Audio remains disabled.

The earlier environment blocks below are historical; Docker/build/browser blocks no longer describe the current local workspace. No GitHub push or permission recheck was performed during the visual correction.

---

# Historical implementation record

## Implemented (local working-tree artifact)

- New React 18 + TypeScript + Vite 5 app scaffold, responsive desktop/taskbar/window shell, welcome experience.
- Original local SVG illustrations for three memory scenes; gallery navigation and developing instant photograph.
- Nokia-inspired message interface, three presets, 120-char custom prediction and edit/send flow.
- Three physical-looking cassette variants with selectable tracks; optional HTMLAudioElement support, disabled controls if no audio.
- Shared state and versioned localStorage validation; 0–3 derived progress, seal gate, progress animation and final personalised keepsake; restart.
- Reduced motion, focus styling, form labels, notification live region, keyboard-reachable buttons, responsive layout.
- README, MVP scope, manual acceptance checklist, pure state tests.

## Docker delivery (2026-11-04)

- Added a multi-stage `Dockerfile`: `node:22-alpine` installs, tests and bundles the UI; `nginx:stable-alpine` serves only the resulting static build with SPA routing and a container health check.
- Added `compose.yaml` with default production `web` at port 8080 and optional bind-mounted Vite `dev` service at port 5173; added `docker/nginx.conf` and `.dockerignore`.
- README includes Compose start/stop, dev mode, validation commands, port changes and internet requirements. The user needs only Docker, not locally installed Node/npm/Yarn.
- GitHub branch creation retried on 2026-11-04 and **still failed with HTTP 403 Resource not accessible by integration**; GitHub reports `push: false` for `PullingStrings/hackathon-answer-the-phone` despite the app permissions screenshot. No PR was created.
- **Docker build and Compose startup could not be executed** in the current environment because the Docker CLI/daemon are unavailable. An initial image build requires network access to base images and npm dependencies. Re-run actual Docker and functional checks in a Docker-enabled environment before merging.

## Verified in this environment

- `node --experimental-strip-types --test tests/*.test.mjs`: **5/5 passing**, including invalid restores, progress, maximum prediction length, sealing validation and sealed restore.
- TypeScript compiler syntax transpilation of source files: **pass**.
- Strict TypeScript offline check with temporary React/Vite type stubs: **pass**. This is NOT a substitute for a real `npm run typecheck` with actual packages.
- Original scene SVG files validated as well-formed XML and rendered with CairoSVG for visual inspection.
- Browser visual QA using a **static render of the actual TSX component markup and CSS** via Chromium `set_content`: 10 structure variants passed; seven key views checked across 1440×900, 1366×768, 1024×768, 768×900 and 390×844 (35 checks). No horizontal page overflow or off-screen windows in these static previews; the capsule Seal and final keepsake footer fit at 1366×768.

## Not verified / blocked

- Chromium browser navigation for **live React** E2E checks: **blocked by administrator policy**, including local HTTP and file URLs. Static component HTML was inspected, but real React click interactions were not executed.
- `npm install`: **blocked by container DNS** (`EAI_AGAIN registry.npmjs.org`). As a result, genuine `npm run typecheck`, `npm run build`, and interactive React browser acceptance tests are **not yet verified** in this environment. Run these immediately in a network-enabled Node 22 environment before merging.
- GitHub feature branch creation: **403 Resource not accessible by integration**. Connected identity reports `push: false`. A PR **cannot be published** until GitHub write/branch permission is granted or a writable fork becomes available.
- No storyboard attachment was present, so visual direction comes from `.ai-studio/PRD.md` and the user specification.
- No original audio exists. Audio playback is visibly disabled, not simulated.
- PNG export omitted to protect the core demo flow.

## Next actions

1. On a Docker-enabled machine: `docker compose up --build`, load `http://localhost:8080` and complete the live browser acceptance checklist. No local Node/npm installation is needed.
2. Follow `docs/ACCEPTANCE.md` on desktop (~1366×768) and narrow (~375×812) viewports; review console errors, verify Docker health and polish as needed.
3. Enable repository write permission for the GitHub integration (or supply a writable fork) and push the feature branch for review.
