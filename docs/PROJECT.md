# MVP scope — Spirit of '96

**Outcome:** A two-minute, desktop-first 1996 nostalgia journey a user can finish without an account, internet data, or external services.

**Journey:** 1996 welcome → choose one of three original memory illustrations and develop a Polaroid → send a 2026 prediction via a phone → choose a cassette track → inspect 3/3 memories → seal → inspect personalised keepsake → restart.

**Acceptance:** All five desktop icons work; one window is shown at a time; three activities are independent and editable until sealing; 3/3 gates sealing; local state survives reopening/reload; bad saved data is safe; reduced motion shortens waits; narrow windows scroll; build/typecheck should pass in a configured Node environment.

**Non-goals:** Real OS emulation, timers/expiry, backend, music synthesis, accounts, external APIs, drag/resizing, AI-generated art at runtime, unlicensed media.

**Architecture choice:** A single `useCapsule` hook and small static data modules instead of a global state package. Original local PNG scenes and physical objects, native SVG desktop icons, and CSS window chrome. The approved nine-panel visual reference governs presentation; no runtime image/network service is used. React/Vite are explicitly requested and consistent with the greenfield repository PRD.
