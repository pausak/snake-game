
# Snake Game (Vanilla JS + Vite)

A simple fullscreen Snake game inspired by the classic Nokia version. Built with Vanilla JavaScript and Vite. Playable on both desktop and mobile browsers.

## Features

- Classic Snake mechanics
- Fullscreen canvas
- Supports keyboard (desktop) and swipe input (mobile)
- Built with Vite for fast development and optimized builds

## Getting Started

1. Clone the repo

```
git clone https://github.com/apausak/snake-game.git
cd snake-game
```

2. Install dependencies

```
npm install
```

3. Run the dev server

```
npm run dev
```

Open `http://localhost:5173` in your browser to play.

## Deploy to Cloudflare Pages

### Prerequisites:
- A [Cloudflare account](https://dash.cloudflare.com/)
- A GitHub repository for this project

### Steps:

1. Push your project to GitHub:

```
git remote add origin https://github.com/your-username/snake-game.git
git push -u origin main
```

2. Go to [Cloudflare Pages](https://pages.cloudflare.com/) and click **"Create a project"**.

3. Connect your GitHub repository and select the `snake-game` repo.

4. In the setup, choose:
   - **Framework preset:** `None`
   - **Build command:** `npm run build`
   - **Output directory:** `dist`

5. Click **"Deploy"**

Cloudflare will build and deploy your game to a unique URL like:  
`https://your-subdomain.pages.dev`

### On future changes:
Every `git push` to the main branch will trigger an automatic redeploy on Cloudflare Pages.

## License

MIT License