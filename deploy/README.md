# Casa India Deployment

The primary site is `https://casaindia.haloandrei.com/`. DNS points to the home public IP. Pi1 (`192.168.0.7`) terminates TLS through Nginx. Pi2 (`192.168.0.143`) runs the static site container behind the Caddy gateway. GitHub Pages is a second preview at `https://haloandrei.github.io/casacondimentelor/`.

## Build and Release

1. Run `npm ci` in the repository.
2. Run `VITE_BASE_PATH=/ npm run build`.
3. Copy `dist/` to a new release directory under `/srv/halo-return/data/casaindia/releases/` on Pi2.
4. Set `/srv/halo-return/data/casaindia/current` to the new release directory.
5. Recreate the site container with `sudo /srv/halo-return/compose casaindia up -d --force-recreate` on Pi2.
6. Check `https://casaindia.haloandrei.com/` and its images.

The Pi2 Compose and Nginx files are in `deploy/pi2/`. Copy them to `/srv/halo-return/platform/deploy/casaindia/` on Pi2. Add `deploy/pi2/gateway.caddy` to the gateway Caddyfile on Pi2. The Pi1 Nginx site file is `deploy/nginx/casaindia.haloandrei.com.conf`. The bootstrap file supports the first certificate request. The certificate lives under `/etc/letsencrypt/live/casaindia.haloandrei.com/`. Certbot renews it on Pi1.

## Rollback

1. Point `/srv/halo-return/data/casaindia/current` to the last good release directory.
2. Recreate the site container.
3. Check the public home page and product images.

No Pi1 Nginx reload is needed for a static release or rollback.
