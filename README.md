# Meow Mine

This repo treats `meow_mine.html` as the playable prototype source. For Netlify/Vite production deploys, the same file is copied to `public/meow_mine.html` so it is included in the generated `dist` folder and can be served at `/meow_mine.html`.

## Controls

- Move: `WASD` or arrow keys
- Mine copper: `E` near the copper vein
- Sell copper: `F` near the market stall
- Sleep: click the HUD button

## Run

Open `meow_mine.html` directly in a browser, or serve the folder with any static server.

For local Vite development:

```bash
npm install
npm run dev
```

## Deploy

Netlify should use:

- Build command: `npm run build`
- Publish directory: `dist`

The included `netlify.toml` and `_redirects` route `/` and other paths to the playable prototype.
