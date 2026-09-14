# Brand video (Remotion)

Renders the logo intro: the single-line mark draws itself, then the wordmark and tagline rise.
Three compositions: `LogoIntro` (1920×1080), `LogoIntroSquare` (1080×1080), `LogoIntroStory` (1080×1920).

```bash
cd video
pnpm install
pnpm studio                       # live preview in the browser (local machine)
pnpm render                       # out/logo-intro.mp4 (H.264)
pnpm render:square                # out/logo-intro-square.mp4
pnpm render:story                 # out/logo-intro-story.mp4
pnpm still                        # out/logo-intro.png, frame 120
```

The logo geometry comes from `../src/assets/brand/logo-paths.json`, the same source the website uses,
so the video and the site never drift apart. Timing lives in `src/LogoIntro.tsx`.

In the cloud sandbox Chrome cannot be downloaded; set
`REMOTION_BROWSER=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell`
before rendering. On a normal machine Remotion finds or downloads its own headless shell.

The website does not embed these videos. On the site the same drawing runs as a tiny CSS animation
(`.logo-draw` in `src/styles/global.css`), which respects reduced-motion settings. The MP4s are for
Instagram, reels, WhatsApp status and presentations.
