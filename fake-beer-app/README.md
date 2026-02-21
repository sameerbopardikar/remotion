# Fake Beer

A mobile web app that shows a glass of beer on your phone screen. Tilt your phone and the liquid moves realistically.

## Features

- Realistic beer liquid that responds to device tilt
- Foam layer with bubble details
- Rising carbonation bubbles
- Pour animation on first tap
- Tilt-to-drink effect
- Works on desktop with mouse movement as fallback

## Usage

1. Open `index.html` on your phone's browser
2. Tap the screen to pour the beer
3. Tilt your phone to slosh the liquid around
4. Tilt forward to "drink"

## Hosting

This is a static site with no dependencies. Host it anywhere:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

Then open `http://localhost:8000` on your phone (must be on the same network).

> **Note:** Device orientation requires HTTPS on most mobile browsers. For local testing, use `localhost` or set up HTTPS.
