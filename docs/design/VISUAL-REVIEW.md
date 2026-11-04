# Visual correction — 4 November 2026

## Reference and implementation

Primary reference: [approved nine-panel storyboard](1996-visual-reference.png). The existing application was restyled in place. Shared capsule state, persistence validation, track data, completion gate, timers and audio lifecycle remain in their existing modules. ViewMaster now owns its window title so gallery and instant-camera phases have the right chrome.

| Panel | Visual treatment | CSS / artwork responsibility |
| --- | --- | --- |
| 1 — Desktop | Flat teal desktop; five small icons in a left column; centred grey welcome window; navy title bar, bevelled controls and bottom taskbar. | Native SVG icons and CSS. |
| 2 — View-Master | Paper slide reel behind a rounded viewing aperture; photographic scene; previous/next controls; paper caption and selection button. | Original SVG reel, generated scene PNGs, CSS aperture. |
| 3 — Instant camera | Tilted white instant print, developing exposure, segmented progress and a physical rainbow-stripe camera. Window title changes to Instant Camera. | Generated scene and transparent camera PNG; CSS paper, development and progress. |
| 4 — Phone | Detailed dark blue phone beside the grey message dialog; live green-screen text; classic prediction choices and Send button. | Transparent generated phone; live HTML screen and form. Original fictional PIXELTEL branding. |
| 5 — Music | Detailed cassette, side arrows, track title and classic transport controls. | Transparent generated cassette; real existing audio state, controls remain disabled without recordings. |
| 6 — Capsule | Compact three-row summary with actual selected photo, message and track, green completion marks and a labelled purple floppy. | Generated floppy, live photo thumbnail, native SVG and CSS. |
| 7 — Sealing | Small grey progress dialog with hourglass and segmented navy bar. | Native SVG hourglass; existing progress timing and completion callback. |
| 8 — Final card | Aged paper, blue doodles, rainbow corner, tilted photograph and the user's three selections. | Generated scrapbook paper, real scene image, live HTML text. |
| 9 — CRT flourish | Green monospace disk-save status beneath the scrapbook. One completion flow, with Start Again. | CSS and native disk SVG; no extra ending screen. |

## Screenshots inspected

Screenshots are from the live React application, not static mockups. The 1440×900 set was captured from the rebuilt Nginx production app at port 8080. The 1366×768 set was captured from the live Docker Vite service at port 5173. Both use the corrected presentation. The mobile final was recaptured from production after its paper-border correction.

| Screen | 1440×900 | 1366×768 |
| --- | --- | --- |
| 1 — Desktop | [Screenshot](screenshots/1440-01-desktop.png) | [Screenshot](screenshots/1366-01-desktop.png) |
| 2 — View-Master | [Screenshot](screenshots/1440-02-viewer.png) | [Screenshot](screenshots/1366-02-viewer.png) |
| 3 — Instant camera | [Screenshot](screenshots/1440-03-photo.png) | [Screenshot](screenshots/1366-03-photo.png) |
| 4 — Phone | [Screenshot](screenshots/1440-04-phone.png) | [Screenshot](screenshots/1366-04-phone.png) |
| 5 — Music | [Screenshot](screenshots/1440-05-music.png) | [Screenshot](screenshots/1366-05-music.png) |
| 6 — Capsule | [Screenshot](screenshots/1440-06-capsule.png) | [Screenshot](screenshots/1366-06-capsule.png) |
| 7 — Sealing | [Screenshot](screenshots/1440-07-sealing.png) | [Screenshot](screenshots/1366-07-sealing.png) |
| 8 — Final card | [Screenshot](screenshots/1440-08-final.png) | [Screenshot](screenshots/1366-08-final.png) |

Additional development frames: [1440](screenshots/1440-03-developing.png), [1366](screenshots/1366-03-developing.png).
Mobile: [phone after sending, scrolled to controls](screenshots/375-phone.png), [final card at top of scrollable window](screenshots/375-final.png).

Comparison fixes made during QA:
- Replaced the oversized split welcome layout, decorative branding and pastel surfaces with compact Windows-style panels.
- Replaced flat memory illustrations and CSS-shaped hardware with detailed original artwork.
- Reduced the viewer aperture width and adjusted image positioning so the arcade sign is visible.
- Corrected the phone image scale and aligned its live screen and navigation controls with the physical device.
- Matched the instant-camera window title to its active phase.
- Used a sliced paper border on mobile to avoid stretching scrapbook corners.
- Restarted the dev service after confirming new image files were mounted but its public-file cache returned HTML for their URLs. Final production checks verified all eight generated image URLs return image/png with HTTP 200.

## Verification executed

- `docker compose up --build -d web`: passed; all **5/5** existing state tests passed; TypeScript and Vite production build passed.
- Production container healthy; runtime JS ~169.6 kB (54.1 kB gzip), CSS ~19.5 kB (5.2 kB gzip), excluding image assets.
- Complete live production journey at 1440×900: welcome, memory selection/development, phone hardware controls, prediction, track, collection, sealing, personalised final and restart. No runtime page errors or console errors.
- Full journey and screenshots at 1366×768. No page/body horizontal overflow or off-screen windows. Verified incomplete seal gate, photo close/reopen, two-selection refresh and sealed refresh restore.
- Complete reverse-order journey at 375×812 with reduced motion; custom SMS blank rejection and 120-character limit; arrow/Escape input; changed memory and prediction; exact final content; scroll-to-action and restart.
- Keyboard activation of welcome and desktop activity in production.
- All eight generated assets successfully served by production.

## Assets and limits

Original generated PNGs live in [public/images/1996](../../public/images/1996/). They were created using the built-in image-generation tool; [all prompts](ASSET-PROMPTS.md) are recorded. The source PNGs total about 23 MiB; image compression remains a delivery optimisation. There is no image generation or external image request at runtime.

The artwork follows the reference rather than reproducing its exact photos or branded hardware. Audio is intentionally unchanged and unavailable, as requested. No export feature, second completion flow, or other feature was added. Real-device and cross-browser verification were not performed.
