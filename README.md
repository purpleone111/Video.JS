# PLAYBACK.EXE — Video.js v10 skin concept

A retro multimedia application skin inspired by the supplied visual direction: early-2000s application chrome, bright pink/orange/purple gradients, hard black borders, compact utility panels and playful desktop-software details.

## Run locally
This is a static HTML project. Because the player uses JavaScript modules, serve it over HTTP rather than opening `index.html` as a file.

```bash
npx serve .
```

Then open the local URL printed by the server.

## Deploy
Import this folder into a new GitHub repository and connect it to Vercel or Netlify. No build command is required; publish the project root.

## Video source
The demo currently uses MDN's public CC0 flower sample video. Replace the `src` on the `<video>` element in `index.html` with your own MP4 or HLS URL. For the challenge's Mux bonus, upload a video to Mux and use its public playback URL / playback ID with the appropriate Video.js Mux media integration.

## Included interactions
- Video.js v10 player and custom Video.js UI components
- Play/pause, timeline seeking, current/duration time, mute and fullscreen
- Keyboard shortcuts: Space, M, F, Left and Right arrows
- Chapter marker buttons (demo markers)
- Brightness and contrast filters applied to the video
- Save display settings in local storage
- Window controls and retro application menu dialogs
- Responsive layout, visible focus, reduced-motion and forced-colors styles

## Before submitting
- Test in current Chrome, Firefox and Safari.
- Test a bright and a dark video.
- Test keyboard-only navigation and mobile touch.
- Add a real caption track and verify the captions control if you plan to feature captions in the final concept.
- Replace demo chapter markers with meaningful timestamps for the selected film.
- Configure a Mux-hosted asset and verify it remains available through judging.
- Confirm the live deployment uses Video.js v10. The CDN bundles are pinned to `@videojs/cdn@10.3.0`.

## License
Apache License 2.0 (challenge entry requirement). Add the full license text before public submission.
