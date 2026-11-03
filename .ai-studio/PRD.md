# PRD: You've Got 10 Minutes Before Mum Needs the Phone

**Version:** 1.0 — Hackathon MVP
**Platform:** Desktop-first web application
**Development window:** 1.5 days
**Stack:** React, TypeScript, Vite, CSS
**Target demo duration:** 2 minutes
**Status:** Ready for implementation

---

## 1. Product Overview

### Concept

An interactive nostalgia experience that transports users back to 1996 through a fictional Windows 95-style desktop.

Users discover memories, make predictions about the future and choose a soundtrack. Their selections are collected into a personalised digital time capsule, which they seal and open in 2026.

### Tagline

*A tiny 1996 world where every object helps you leave something for the future.*

### The hook

"You've got 10 minutes before Mum needs the phone."

The experience recreates the playful urgency of using a family computer in the 1990s.

The 10-minute deadline is a narrative device, not a real countdown. Users should never be kicked out or lose their progress because time expires.

### Product goal

Build a visually memorable, interactive, complete experience that users can finish in approximately two minutes.

It must feel like a cohesive miniature digital world rather than a collection of unrelated demos.

---

## 2. Target Audience

- People nostalgic for 1990s computers, music and popular culture.
- Younger users curious about pre-smartphone technology.
- Hackathon judges looking for creativity, interactivity and technical execution.

No previous familiarity with Windows 95 should be required.

---

## 3. Core Experience

The user progresses through five stages:

1. Arrive at the 1996 desktop and receive the mission.
2. Choose a nostalgic memory through a View-Master.
3. Send a prediction about the future through a Nokia-style phone.
4. Choose a soundtrack using a cassette player.
5. Seal the completed time capsule and reveal a personalised result.

The three activities can be opened in any order.

Completion of all three activities unlocks the final sealing action.

The desktop stays accessible throughout the activities.

---

## 4. Visual Identity

### Design direction

An affectionate reinterpretation of a mid-1990s computer interface.

**Required elements:**
- Classic teal desktop wallpaper.
- Grey, bevelled application windows.
- Dark-blue title bars with white text.
- Pixel-inspired icons.
- Chunky buttons with pressed and raised states.
- Windows 95-inspired taskbar and Start button.
- Period-inspired typography.
- Physical objects represented inside application windows.
- A small amount of subtle CRT and screen-grain texture.

The application must look deliberately designed, not like a modern dashboard with retro colours.

### Design constraints

The experience is Windows 95-inspired, not a full Windows 95 emulator.

Do not attempt to implement an operating system, filesystem, browser or real desktop environment.

Prioritise readable text, consistent spacing, excellent image quality and clear interaction states.

Use an original fictional brand and original artwork. Do not use copyrighted music or unlicensed 1990s photographs.

---

## 5. Feature Requirements

### F01 — Desktop

**Purpose:** Establish the world and act as the central navigation interface.

**Requirements:**
- Full viewport desktop background.
- Four functional icons: View-Master, Nokia Phone, Music Player and My Time Capsule.
- Welcome window presented on first load.
- Welcome heading: "WELCOME BACK. IT'S 1996."
- Introductory description explaining the mission.
- Primary action: "Let's Go!"
- Taskbar with Start button, application name and fictional clock.
- Active application displayed in a reusable window.
- Window close control.
- Desktop icons remain clickable after closing a window.
- The time capsule status remains discoverable.

**Acceptance criteria:**
- The experience loads directly into the desktop.
- The welcome window can be dismissed.
- Clicking an icon opens the corresponding activity.
- Closing an activity does not erase selections.
- The active window never becomes trapped off-screen.

### F02 — View-Master and Instant Photo

**Purpose:** Select a nostalgic memory and transform it into a physical-looking keepsake.

**Requirements:**
- Three illustrated, 1990s-themed memory scenes.
- Previous and next navigation.
- Image index indicator (1/3, 2/3, 3/3).
- A short label describing each image.
- Button: "This is my memory!"
- A brief instant-photo developing animation.
- Finished photo resembling a Polaroid print.
- Selected memory stored in the capsule.
- Clear confirmation that the memory has been collected.

**Suggested scenes:**
1. Neon arcade full of machines.
2. Saturday morning cartoons in a family living room.
3. VHS rental shop on a Friday evening.

**Acceptance criteria:**
- Images can be browsed in both directions.
- Users can choose any of the three images.
- Choosing a memory creates a visible instant photo.
- The selected memory persists when the window is closed.
- Users can revisit and change their selection.

### F03 — Nokia Future Prediction

**Purpose:** Let the user imagine the future from the perspective of 1996.

**Requirements:**
- Recognisable Nokia-style mobile phone illustration.
- Phone display showing one new message.
- Message: "What will life be like in 2026?"
- Three predefined prediction options.
- Optional custom text input.
- Send action.
- Sent-message confirmation state.
- Selected prediction stored in capsule.

**Prediction options:**
1. "Everyone will have flying cars."
2. "Robots will teach at school."
3. "Everyone will carry the internet in their pocket."

**Acceptance criteria:**
- The phone feels like an interactive object, not a standard survey.
- A prediction can be selected or typed.
- Blank custom messages cannot be submitted.
- Maximum custom prediction length is 120 characters.
- The sent prediction appears in the capsule.
- Users can revise their prediction.

### F04 — Cassette Music Player

**Purpose:** Add a period-inspired soundtrack to the user's time capsule.

**Requirements:**
- Large illustrated cassette tape.
- Three selectable soundtracks.
- Previous and next controls.
- Track title and short description.
- Working play/pause controls when audio assets are available.
- Visual playback progress indication.
- Mute/unmute control.
- Button to add the selected track to the capsule.

**Track categories:**
1. Funky Mixtape.
2. Old-School Hip-Hop.
3. Retro Synth.

All audio must be original, licensed for use or generated specifically for the project.

**Acceptance criteria:**
- A user can select any of the three soundtracks.
- The selected track is stored in the capsule.
- No music plays automatically on initial page load.
- Missing audio never blocks the experience.
- Playback stops when appropriate and cleanup is reliable.

**Scope limitation:** Do not build audio synthesis or a complete music engine. Short approved audio files are sufficient.

### F05 — Time Capsule

**Purpose:** Connect all activities into one coherent experience.

**Requirements:**
- Show three collection slots: Photo, Message and Soundtrack.
- Each slot displays incomplete or completed status.
- Completed slots show the user's selected content.
- Progress indicator showing 0/3 to 3/3.
- Sealing control disabled until all three slots are completed.
- Button: "SEAL UNTIL 2026".
- Short retro progress animation once sealing begins.
- A completion screen containing the personalised capsule card.
- Ability to restart the experience.

**Acceptance criteria:**
- Completion is based on actual state, not the order of activities.
- The sealing button cannot be used prematurely.
- Each selection is displayed accurately.
- The final card reflects the user's three choices.
- All users can complete the full experience without encountering a dead end.

### F06 — Final Reveal

**Purpose:** Deliver an emotional and visually satisfying conclusion.

**Requirements:**
- Display "SAVE COMPLETE."
- Show the selected photo.
- Show the future prediction.
- Show the chosen soundtrack.
- Include a floppy disk illustration.
- Present the result as a nostalgic printable-style keepsake.
- Display: "Your memories have been safely stored on a floppy disk. Please do not lose it for 30 years."
- Offer "Start Again".
- Provide "Save My Capsule" as a stretch goal if reliable image export is feasible.

The final screen should be the strongest visual moment in the entire experience.

---

## 6. Shared State

The application maintains a single source of truth for the user's capsule.

Required data:
- Memory ID.
- Prediction text.
- Soundtrack ID.
- Whether the capsule is sealed.

Completion is derived from whether the three required selections are present.

State should survive closing and reopening application windows.

Local storage persistence is desirable and should be used if it does not create unnecessary complexity.

No external persistence is required.

---

## 7. Interaction Rules

- One application window is visible at a time.
- Clicking another desktop icon switches to that window.
- Every window uses consistent chrome, buttons and closing behaviour.
- Completed activities display the same confirmation pattern.
- Activities remain editable until sealing.
- No real countdown or forced session expiry.
- No browser reload is required to move between stages.
- Animations should be brief and skippable under reduced-motion preferences.

---

## 8. Accessibility and Usability

- All functionality must work with mouse and keyboard.
- Buttons and inputs must have accessible names.
- Text must remain legible against the retro interface.
- Selected and completed states must not depend on colour alone.
- Windows should have clear titles.
- Animations should respect reduced-motion settings.
- Sound should be muted by default until the user chooses to play it.
- The desktop-first experience must still remain usable at narrower viewport widths.

---

## 9. Non-Functional Requirements

- Runs locally with a standard Vite development command.
- Builds without TypeScript errors.
- No backend required.
- No authentication.
- No external API dependency.
- No database.
- No network access required after assets are loaded.
- All essential artwork should be served locally.
- Reasonable loading performance.
- Stable window, audio and animation cleanup.
- No blocking console errors during normal use.

---

## 10. MVP Scope

### Must have

- Retro desktop.
- Welcome window.
- Reusable activity window.
- Three illustrated memories.
- Instant photo development.
- Phone prediction interaction.
- Cassette selection.
- Shared time capsule state.
- Sealing animation.
- Personalised final card.
- Responsive layout.
- Basic sound controls and accessibility.

### Should have, if time permits

- Original short audio loops.
- Subtle hover and click effects.
- Retro notification sounds.
- Local storage persistence.
- Downloadable final capsule image.

### Explicitly out of scope

- Arcade mini-game.
- TV channels.
- Drag-and-drop desktop icons.
- Resizable application windows.
- Complex multi-window management.
- Multiplayer.
- AI chat.
- User accounts.
- Cloud storage.
- Real-time countdown mechanics.
- Backend services.
- Real Windows 95 emulation.

---

## 11. Demo Script

**0:00–0:15 — Introduction**

Show the retro desktop and explain the challenge.

**0:15–0:45 — Memory**

Open View-Master, browse images, choose a memory and show the photograph developing.

**0:45–1:10 — Prediction**

Open the Nokia phone and send a prediction about 2026.

**1:10–1:30 — Music**

Open the cassette player, select a soundtrack and add it to the capsule.

**1:30–2:00 — Reveal**

Open the capsule, show all three collected memories, seal the capsule and reveal the personalised final card.

The demo must work without an internet connection if all necessary assets have already been loaded.

---

## 12. Definition of Done

The MVP is complete when:

1. A new user can understand the challenge.
2. All three activities work independently.
3. Choices persist when switching activities.
4. The capsule accurately reflects the selections.
5. The sealing button unlocks after three valid selections.
6. The reveal works without errors.
7. The full experience takes approximately two minutes.
8. The interface closely follows the agreed retro visual direction.
9. The app passes build and basic functional testing.
10. The team can confidently demonstrate the complete flow.

**Success criterion:** A polished, complete experience with three interactive activities and a memorable ending, not a larger collection of unfinished features.