# Design inspiration — The House Of Brides

Researched 2026-09-14. The sandbox could not open external sites directly (network proxy), so each site was confirmed through search indexes rather than screenshots. Open the shortlist in a browser and mark favourites before the mockup phase.

## A. Venues with two or more properties under one brand

### Mount Juliet Estate — https://www.mountjuliet.ie/weddings/
Two wedding settings under one brand. The closest structural analogue to our two apartments.
- Adopt: the "choose your setting" fork. Two side-by-side property cards with one photo, one line of character, one capacity number each, then a shared enquiry CTA.
- Adopt: capacity stated as a plain number in the first sentence of each property.
- Avoid: hotel nav sprawl. We need four links at most.

### Euridge — https://www.euridge.uk/
Exclusive-use estate; each suite/cottage has its own page.
- Adopt: one page per property with identical structure (hero → 3-line description → facts list → gallery → CTA), so the two apartments feel like siblings.
- Adopt: low-key photography with stone/linen texture. No HDR, no wide-angle distortion.
- Avoid: light-grey body text on white; contrast fails on mobile in sunlight.

### The Fig House — https://www.fighousela.com/
Design-forward event house with a dedicated get-ready suite.
- Adopt: a venue-details page where every space gets size, capacity and one photo; a separate availability page (a "check availability" URL is useful for WhatsApp links and ads); an FAQ with hours, parking and vendor rules.
- Avoid: colour-pop interiors in hero photography.

### Brindamour Studios, Getting Ready Suite — https://brindamourstudios.com/getting-ready-suite
The most direct product comparable.
- Adopt: it leads with the photographic reason for the space (natural light, neutral tones, calm morning). Sell the photos the bride will get, not the furniture.
- Adopt: single page, single CTA, no booking widget. Matches our WhatsApp flow.

Evaluated and dropped: Sainte Terre (steal the plain "what's included" page; generic template otherwise), Social Space, White Fallow Estate, Swallows Eve, Zorba Collective. "The Addresses", "Hilltop Estate", "The Suite at Level" from the original doc could not be found.

## B. Boutique hotels and villas with restrained editorial design

### Reschio — https://www.reschio.com/
The benchmark for quiet, serif-led hospitality storytelling.
- Adopt: hero = one still full-bleed photograph, wordmark only, no headline, no button; the CTA lives in the header.
- Adopt: editorial type scale. Large light serif headlines (~64–96 px desktop), narrow measure (~60 ch), sans reserved for labels/nav in tracked small caps.
- Adopt: 120–160 px section gaps and asymmetric two-column image + text blocks instead of centred stacks.
- Avoid: very slow image reveals and long transition fades. Keep motion to opacity + 8–12 px translate at 300–500 ms.

### Aman — https://www.aman.com/
- Adopt: slim persistent header, wordmark on one side, one "Reserve" action on the other.
- Adopt: near-monochrome palette (sand, stone, ink); photography carries all the colour.
- Avoid: autoplaying video heroes.

### Thyme — https://www.thyme.co.uk/
- Adopt: a "things to know" page in a warm voice: arrival times, what is included, parking, access. Our equivalent: hours, capacity, stations, fridge contents, parking, elevator, safe room.
- Adopt: detail / room / detail photo rhythm in galleries.
- Avoid: small centred serif body at 15–16 px. Hebrew serif body should be 18 px or more.

### Heckfield Place — https://www.heckfieldplace.com/
- Adopt: rooms named with a one-line "aspect" (what you see from the window). For us: "the morning-light one", "the balcony one".
- Adopt: muted olive/ochre accent only for links and small labels.

### Fogo Island Inn — https://fogoislandinn.ca/
- Adopt: a single honest "rates and inclusions" table. Showing the number builds trust.
- Adopt: rooms titled by floor/orientation; the light story is what matters for getting-ready photos.
- Avoid: long storytelling before the facts. Facts go above the fold on property pages.

### Casa Cook — https://casacook.com/
- Adopt: an index of identical property cards (photo, name, one-line setting, "Explore"). The template for our two-apartment switcher.
- Adopt: earthy palette tied to material photography (linen, plaster, wood), not to brand colours.
- Adopt: mobile cards stack with 4:5 portrait images and text aligned to the start.
- Avoid: auto-sliding hero carousel.

### Passalacqua — https://www.passalacqua.it/en/
- Adopt: room names as headlines, material adjectives in copy.
- Adopt: lightbox behaviour: click any image, arrow keys and swipe, caption, ESC closes, scroll position preserved.
- Avoid: gold rules and script accents. Keep it flat.

## C. Award-listed editorial sites (2024–2026)

### Palazzo Sogni — https://www.palazzosogni.com/ (Awwwards Site of the Day, July 2026)
- Adopt: one-page structure for the home page (hero, story, spaces, facts, CTA); section-by-section reveal on scroll; sticky contact pill after the hero leaves the viewport.
- Avoid: custom cursors and preloaders.

### BelArosa Chalet — https://www.belarosa-chalet.ch/en
- Adopt: facts as numbers with units inline ("95–210 m², 1–6 guests").
- Avoid: language toggle competing with the CTA. HE/EN is a tiny text link, never a button.

### Son Daven — https://sondaven.com/en (Awwwards Site of the Month, June 2026)
- Adopt: typographic confidence, big serif display over full-bleed imagery, art-directed mobile crops.
- Avoid: everything under the hood (WebGL, scroll-jacking). Take the look, not the stack.

## D. Israeli references for Hebrew RTL type and layout
- Pereh Hotel — https://pereh.co.il — two locations, one brand; stone/wood/natural-light narrative; room pages with facts.
- The Norman Tel Aviv — https://www.thenorman.com — understated luxury, editorial spacing.
- Ronit Farm — https://ronitfarm.com — large Hebrew display type, full-bleed gallery, venue facts.
- Lihi Hod — https://www.lihihod.com — the "book appointment" CTA pattern we want for "בדקי זמינות".
- Galia Lahav — https://galialahav.com — photo rhythm and restraint (English only).

## Design patterns we commit to
1. One still hero. No carousel, no video, no preloader. If a headline, one short serif line.
2. Header = wordmark + 3 links + one CTA. Turns solid on scroll.
3. Two-property fork immediately under the home hero.
4. Identical apartment-page skeleton: hero → 3-line character → facts rows (numbers first, tabular numerals, thin rules) → curated gallery in detail/room/detail rhythm → how the day looks → included list → calendar → form → trust → FAQ/location → the other apartment.
5. Editorial type scale: serif display roughly 56–96 px light, body 18–20 px, measure ≤ 65 ch, sans for labels/nav only.
6. Generous rhythm: 96–160 px between sections on desktop, 64–96 px on mobile; asymmetric 5/7 splits.
7. Motion budget: opacity + 8–12 px translate, 300–500 ms, reduced-motion respected.
8. Mobile sticky WhatsApp pill after the hero; hidden while the lightbox or keyboard is open.
9. Trust block next to the CTA: real facts, 2–3 short bride quotes, a response-time promise.

## Type pairings

| Seen on | Latin pairing | Hebrew equivalent |
|---|---|---|
| Reschio, Passalacqua | light high-contrast serif display + tracked grotesk labels | Frank Ruhl Libre Light/Regular display + Heebo 400/500 labels (use FRL 300 only at ≥ 48 px) |
| Aman | modern serif + tracked sans caps | David Libre display + Assistant labels |
| Thyme, Heckfield | transitional serif body + humanist sans nav | Frank Ruhl Libre body 18–20 px + Assistant nav |
| Fogo Island, Casa Cook | sans-only with weight contrast | Heebo 300 display / 400 body (fallback if serif Hebrew feels too "newspaper") |
| Palazzo Sogni, Son Daven | oversized serif display + tiny sans metadata | Frank Ruhl Libre 300 at 80 px+, leading 1.05 + Heebo 12–13 px tracked |

Recommendation: start with Frank Ruhl Libre + Heebo; test David Libre (display) and Assistant (labels) on the design canvas against real photos. Noto Serif Hebrew is the sturdier body fallback if FRL looks thin on Android. Skip Rubik, Secular One, Suez One, Miriam Libre for this brand. For English, pair a Latin serif such as Cormorant Garamond with `unicode-range` subsetting so each script loads only its own file.
