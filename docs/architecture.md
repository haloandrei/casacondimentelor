# Day-One Decisions

## Scope

The project proposal describes a full commerce system with checkout, admin tools, payments, and email. Day one delivers a public catalog preview. This lets the owner review the brand and product presentation before the store accepts orders.

The preview uses React, TypeScript, and Vite. Pi2 serves the static build in a small Nginx container. Pi2 Caddy routes the `casaindia.haloandrei.com` host to that container. Pi1 Nginx handles public HTTPS and forwards requests to Pi2. GitHub Pages also hosts a preview. The site does not need an application server or database.

## Data

`src/catalog.ts` holds the sample product entries. Each entry includes its maker source. Prices and stock are absent because the owner has not confirmed them. The detail view points visitors to the maker page and tells them to read the physical label for food information.

The selection list uses `localStorage` with the key `casacondimentelor-selection-v1`. It accepts only known product IDs and counts from 1 to 99. No list data leaves the browser. The copy action uses the browser clipboard.

## Next Stage

Before a live checkout, confirm the merchant name, address, contact channel, product sale rights, prices, stock, tax details, shipping rules, and legal text. Then add a server, persistent data, order management, and verified payment integration. Do not treat the current selection list as an order.

## Source Project

The local `SPICE_SHOP_PROPOSAL.md` describes the target commercial system. This repository started from the `codex-ste-repo-template` GitHub template and keeps its writing and commit rules.
