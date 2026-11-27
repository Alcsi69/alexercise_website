#!/usr/bin/env bash
# One-time VPS setup for the Alexercise website. Run on the VPS as a sudo user:
#   bash setup-server.sh
# Creates a locked-down "deploy" user that may only rsync into the site folder.
set -euo pipefail

SITE_DIR=/var/www/alexercise-website
DEPLOY_USER=deploy

command -v rsync >/dev/null || sudo apt-get install -y rsync

if ! id "$DEPLOY_USER" >/dev/null 2>&1; then
  sudo adduser --system --group --shell /bin/bash --home "/home/$DEPLOY_USER" "$DEPLOY_USER"
fi

sudo install -d -o "$DEPLOY_USER" -g "$DEPLOY_USER" -m 755 "$SITE_DIR"
sudo install -d -o "$DEPLOY_USER" -g "$DEPLOY_USER" -m 700 "/home/$DEPLOY_USER/.ssh"

KEY_FILE=$(mktemp -d)/alexercise_deploy
ssh-keygen -t ed25519 -N '' -C 'github-actions@alexercise-website' -f "$KEY_FILE" >/dev/null
echo "$(cat "$KEY_FILE.pub")" | sudo tee -a "/home/$DEPLOY_USER/.ssh/authorized_keys" >/dev/null
sudo chown "$DEPLOY_USER:$DEPLOY_USER" "/home/$DEPLOY_USER/.ssh/authorized_keys"
sudo chmod 600 "/home/$DEPLOY_USER/.ssh/authorized_keys"

echo
echo "=== GitHub secret VPS_SSH_KEY (copy everything between the lines) ==="
cat "$KEY_FILE"
echo "======================================================================"
echo
echo "=== GitHub secret VPS_KNOWN_HOSTS ==="
ssh-keyscan -t ed25519 localhost 2>/dev/null | sed "s/^localhost/$(curl -fsS https://api.ipify.org 2>/dev/null || echo YOUR_VPS_IP)/"
echo "====================================="
echo
echo "VPS_USER = $DEPLOY_USER"
echo "Delete the private key from this server once it's saved in GitHub:"
echo "  rm -r $(dirname "$KEY_FILE")"
