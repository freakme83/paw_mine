# Meow Mine

`index.html` is now the canonical playable prototype file. The previous `meow_mine.html` flow has been folded into `index.html` so local development and production deploys both start from the site root.

## Controls

- Move: `WASD` or arrow keys
- Mine copper: `E` near the copper vein
- Sell copper: `F` near the market stall
- Sleep: click the HUD button

## Run

Open `index.html` directly in a browser, or use Vite:

```bash
npm install
npm run dev
```

## Deploy

Netlify should use:

- Build command: `npm run build`
- Publish directory: `dist`

The included Netlify redirect sends fallback routes to `index.html`.
