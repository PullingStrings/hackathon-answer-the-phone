# You've Got 10 Minutes Before Mum Needs the Phone

A small, playable trip back to **1996**, presented as an affectionate Windows 95–inspired desktop. Find an illustrated memory, send a prediction to your future self on a physical-looking mobile phone, choose your cassette soundtrack, and seal everything onto a floppy disk for 2026.

**Demo path (~2 minutes):** Welcome → View-Master → Future Phone → Music Player → My Time Capsule → Seal → Save Complete. You can do the three activities in any order, change your choices, close windows, refresh, and start over.

## Features

- Teal desktop, pixel-style illustrated icons, Start button, taskbar and bevelled application windows.
- Three **original generated photographic scenes**: neon arcade, Saturday cartoons at home and Friday VHS rental shop.
- Wraparound View-Master navigation, developing instant-photo animation and saved photo preview.
- Nokia-inspired phone with selectable predictions and custom SMS (120-character limit).
- Physical illustrated cassette, three track choices, safe play/mute controls that only enable when original audio is configured.
- Three-slot progress tracker; sealing only unlocks at 3/3. Animated floppy progress and personalised printed keepsake.
- Browser `localStorage` persistence with versioned keys and defensive restore validation.
- Keyboard-focus styling, labelled controls, announced notifications and reduced-motion support.
- Responsive desktop-first layout with scrollable windows on smaller viewports.

## Tech stack

React 18, TypeScript, Vite 6.4 and plain CSS. No backend, auth, database, external APIs, UI kit, or runtime animation library. Artwork is served locally as PNG and SVG files; there are no external image services.

## Docker setup (recommended — no Node or Yarn on your machine)

You only need **Docker Desktop with Docker Compose** (or Docker Engine + the Compose plugin). From the repository directory:

```bash
docker compose up --build
```

Open **http://localhost:8080**. The default `web` service builds the Vite production bundle in a `node:22-alpine` build stage, runs the capsule tests and TypeScript production build, then serves the static site from a lightweight Nginx image. It has no backend, database, or credentials. Press `Ctrl+C` to stop, or run `docker compose down` in another terminal. Browser saves are held in `localStorage` and remain after restarting Docker when the browser origin is unchanged.

**First build requires an internet connection** to pull the Node/Nginx images and download npm packages **inside Docker**. No host npm command is required. If port 8080 is occupied, change `"8080:80"` in `compose.yaml` to another host port (for example `"8090:80"`).

Dependencies are pinned by `package-lock.json` and installed with `npm ci` inside Docker. Commit the lockfile whenever dependencies change.

### Optional live-editing development mode (also entirely Dockerised)

```bash
docker compose --profile dev up --build dev
```

Open **http://localhost:5173**. The source directory is bind-mounted and Vite automatically refreshes as you edit files; dependencies live in a Docker-managed volume rather than on your computer. Each dev startup runs `npm ci` to synchronise that volume with the lockfile; this can require network access. Stop it with `Ctrl+C` followed by `docker compose --profile dev down` if you want to clean up containers and networks (the named dependency volume is retained).

If your editor reports that it cannot find `react` or `JSX.IntrinsicElements`, populate the ignored local `node_modules` for its TypeScript language service. The install still runs inside Docker:

```bash
docker run --rm --user "$(id -u):$(id -g)" -e HOME=/tmp -e npm_config_cache=/tmp/npm-cache -v "$PWD:/app" -w /app node:22-alpine npm ci --no-audit --no-fund
```

Restart the editor's TypeScript server if diagnostics from before the install remain visible. Continue running builds and tests through Docker.

To run checks in a throwaway container without installing Node locally:

```bash
docker compose --profile dev run --rm --no-deps dev npm test
docker compose --profile dev run --rm --no-deps dev npm run typecheck
```

The Docker production build itself runs `npm test` and `npm run build`; if either fails, it will not create a runtime image.

### Alternative native setup (optional)

For anyone who prefers running without Docker, Node.js 22+ and npm are supported (no Yarn configuration exists in the original repository):

```bash
npm ci
npm run dev           # http://localhost:5173
npm test              # state validation
npm run typecheck     # TypeScript
npm run build         # production bundle
npm run preview       # preview production build
```

## Structure

```text
public/images/1996/            Original scenes, physical objects and scrapbook artwork
public/audio/                  Optional ORIGINAL licensed MP3/OGG files
src/app/App.tsx                Window routing and journey coordination
src/components/desktop/       Desktop navigation, window shell and taskbar
src/components/activities/    View-Master, instant photo, phone, cassette
src/components/capsule/       Collection, sealing, final keepsake
src/components/ui/            Welcome, icons, notifications
src/data/                     Scenes, tracks and persistence validation
src/hooks/useCapsule.ts       Single shared capsule state and persistence
src/types/capsule.ts          Capsule and activity identifiers
src/styles/                   Design tokens, desktop and activity styling
tests/capsule.test.mjs        Local-state validation checks
docs/PROJECT.md               MVP scope
docs/STATE.md                 Delivery and verification status
docs/ACCEPTANCE.md            Manual functional test checklist
```

## Approved visual direction

The [nine-panel reference](docs/design/1996-visual-reference.png) guides the Windows 95 desktop, physical objects and scrapbook ending. See the [visual review and screenshots](docs/design/VISUAL-REVIEW.md) and [generated artwork prompts](docs/design/ASSET-PROMPTS.md).

## Adding original music

No copyrighted music is bundled. The **play/pause and mute controls are intentionally disabled** until audio files exist. Track selection, capsule completion and sealing work without any audio. Add licensed/original files such as `public/audio/funk.mp3`, then set `audioSrc: '/audio/funk.mp3'` on the matching track in `src/data/tracks.ts`. Only one HTML audio element plays at a time; track switching and unmounting stop it.

## Known limitations

- This is not an operating system emulator: no window dragging, resizing, multi-window management or real 10-minute countdown.
- No packaged original audio yet; disabled playback is expected.
- No PNG export (a stretch goal, not part of the core journey).
- Source PNG artwork totals about 23 MiB; image compression is a future delivery optimisation.
- Visual and functional checks were run in Chromium at 1440×900, 1366×768 and 375×812. Real-device and cross-browser checks remain separate.

## Future enhancements

Original soundtrack loops, reliable keepsake PNG export, optional dial-up/modem-style user-initiated sound, and a second set of memories. Keep the vertical slice intact before expanding it.
