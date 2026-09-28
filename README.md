# Casa Condimentelor

This repository holds the day-one public preview for Casa Condimentelor. The site presents a Romanian catalog inspired by the supplied brand poster.

## Current Features

- A responsive landing page with a generated spice image.
- Three product entries with images from the product makers.
- Category filters, text search, and product detail views.
- A local selection list with quantity controls and a copy action.
- A GitHub Pages deployment on each push to `main`.

The site is a catalog preview. It does not show prices or stock. It does not accept orders, payments, accounts, newsletter signups, or personal data. The selection list stays in the visitor's browser storage.

## Run Locally

1. Install Node.js 22 or later.
2. Run `npm ci`.
3. Run `npm run dev`.
4. Open the address shown by Vite.

Run `npm run build` before a release. The build writes static files to `dist/`.

## Deployment

GitHub Actions builds and deploys this site to [the public preview](https://haloandrei.github.io/casacondimentelor/). The workflow is in `.github/workflows/deploy.yml`.

The Vite base path is `/casacondimentelor/`. Update `vite.config.ts` if the public path changes.

## Product Images and Sources

The three product images show maker packaging. They are for this preview catalog. Confirm image use rights before commercial launch.

| Product | Source |
| --- | --- |
| Gits Gulab Jamun Mix | [Gits product page](https://international.gitsfood.com/product/gulab-jamun/) |
| Gits Uttapam Mix | [Gits product page](https://international.gitsfood.com/product/uttapam/) |
| Patanjali Cow's Ghee | [Patanjali product page](https://www.patanjaliayurved.net/product/natural-health-care/ghee/cows-ghee-200-ml/962) |

The brand poster came from the project owner. The hero image was generated for this project from that poster as a style reference. The generation prompt asked for a wide spice still life with ivory space on the left, bowls of turmeric and chili, cardamom, cinnamon, rose petals, brass decor, and a peacock feather. It asked for no text or logo.

## Next Inputs

The commercial store needs confirmed product rights, prices, stock, package details, merchant contact data, delivery terms, legal policies, and payment credentials. See [the day-one decisions](docs/architecture.md) before adding checkout.
