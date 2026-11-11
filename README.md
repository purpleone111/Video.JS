# CHANNEL ZERO — Video.js v10.3.0 Skin

CHANNEL ZERO is a retro broadcast-terminal skin for the Video.js v10 HTML player. It combines a custom media-control layout with a surrounding desktop-style station interface.

## Run locally

This is a static HTML project. Serve the folder over HTTP rather than opening `index.html` with `file://`.

```bash
python -m http.server 8000
```

Open <http://localhost:8000>.

The page loads Video.js v10.3.0 from jsDelivr and uses a public Mux MP4 sample. Replace the `<video src>` in `index.html` with a public MP4 URL to test another source.

## Included interactions

- Play / pause using the player button or Space
- Seek using the timeline or Left / Right arrow keys
- Mute / unmute using the button or M
- Volume level using the accessible volume slider
- Fullscreen using the button or F
- Three demo chapter markers at 0, 18 and 38 seconds
- Player time display, status announcements and an error dialog
- Responsive layout, visible keyboard focus and reduced-motion support

Chapter timestamps are demonstration values. Change the `data-time` attributes on the chapter buttons to match the supplied video.

## Implementation notes

- Uses the official Video.js v10 HTML CDN bundle: `@videojs/cdn@10.3.0/video.js`.
- The custom controls use Video.js v10 UI elements and state attributes. The player markup follows the official “Build your own skin” structure.
- The controls are Video.js v10 UI elements. Do not load Media Chrome alongside Video.js; both register similarly named custom elements.
- The sample player uses native HTML5 MP4 playback. HLS, DASH and provider adapters are not included.

## Before submitting

Run the project in current Chrome, Firefox and Safari. Verify media playback, keyboard-only operation, touch operation, fullscreen, chapter seeking, loading and error states, captions, and the narrowest supported player width. Confirm that the sample video URL is reachable from the judge's environment.

A static source review is not a substitute for browser testing. This archive has not been run through a live browser QA session.

## License

Apache License 2.0. See `LICENSE`.
