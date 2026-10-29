# Open Ruimte Ontwerpers — demo

Demoversie van de website van [ORO — open ruimte ontwerpers](https://www.openruimteontwerpers.be),
opgebouwd in het sjabloon van [openfabric.eu](https://www.openfabric.eu).

Alle inhoud (projecten, teksten, beelden, contactgegevens) komt van de huidige
ORO-website; de layout, typografie en interacties volgen de Openfabric-opzet.

## Stack

Next.js 14 (App Router) · TypeScript · `next/image` · DM Sans. Geen CSS-framework —
`app/globals.css` is een directe port van het Openfabric-stijlsysteem.

## Structuur

| Pad | Inhoud |
| --- | --- |
| `/` | Fullscreen scroll-slides van 8 uitgelichte projecten |
| `/projecten` | Raster van alle 42 projecten, titel verschijnt bij hover |
| `/projecten/[slug]` | Projectpagina met vaste hero, beschrijving, metadata en galerij |
| `/over-ons` | Studio en visie |
| `/contact` | Contactgegevens |

Projectdata staat in `data/projects.json`, beeldafmetingen in `data/image-sizes.json`,
beelden in `public/images/`.

## Lokaal draaien

```bash
npm install
npm run dev
```
