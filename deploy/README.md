# Deploying to the VPS

Every push to `main` runs `.github/workflows/deploy.yml`: GitHub builds the site and
copies `dist/` to `/var/www/alexercise-website` on the VPS with rsync over SSH.
Caddy, which already serves the app, serves that folder.

```
git push main ──▶ GitHub Actions: npm ci + npm run build ──rsync/SSH──▶ VPS /var/www/alexercise-website ◀── Caddy :443
```

Until the steps below are done, the workflow only builds (the deploy job is skipped), so nothing breaks.

## One-time setup

### 1. DNS

At the registrar for **alexercise.fit**, add two `A` records pointing at the VPS's public IP (the same IP alexercise.app uses):

| Name | Type | Value |
| --- | --- | --- |
| `@` (alexercise.fit) | A | VPS IP |
| `www` | A | VPS IP |

`www.alexercise.fit` redirects to `alexercise.fit`.

### 2. Server: deploy user and folder

Copy `deploy/setup-server.sh` to the VPS and run it as your normal sudo user:

```bash
scp deploy/setup-server.sh you@YOUR_VPS_IP:
ssh you@YOUR_VPS_IP 'bash setup-server.sh'
```

It creates a `deploy` user that owns `/var/www/alexercise-website`, generates an SSH key for GitHub,
and prints the values for step 4. It doesn't touch the app, the API or Caddy.

### 3. Server: Caddy

Append the block from `deploy/Caddyfile` to `/etc/caddy/Caddyfile` on the VPS, below the existing
alexercise.app blocks (leave those as they are). Then:

```bash
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

### 4. GitHub: secrets and variables

In the repo: **Settings → Secrets and variables → Actions**.

Secrets:

| Name | Value |
| --- | --- |
| `VPS_HOST` | The VPS's public IP (the same one shown in `VPS_KNOWN_HOSTS`) |
| `VPS_USER` | `deploy` |
| `VPS_SSH_KEY` | The private key printed by the setup script |
| `VPS_KNOWN_HOSTS` | The host-key line printed by the setup script |
| `VPS_PORT` | Only if SSH doesn't run on port 22 |

Variables:

| Name | Value |
| --- | --- |
| `SITE_URL` | `https://alexercise.fit` (lets the deploy check the live site) |
| `DEPLOY_ENABLED` | `true` (turns the deploy job on) |
| `DEPLOY_PATH` | Only if you use a folder other than `/var/www/alexercise-website` |

### 5. First deploy

**Actions → Deploy → Run workflow**, or push anything to `main`. The last step loads the live
site and fails the run if it doesn't answer.

## Day to day

Add or edit a post, commit to `main`, and the site updates about a minute later.
If a deploy fails, the previous version stays online, and the run's log in the Actions tab says why.

## Deploying by hand

From your own computer, if you have SSH access as `deploy`:

```bash
npm run build
rsync -az --delete dist/ deploy@YOUR_VPS_IP:/var/www/alexercise-website/
```
