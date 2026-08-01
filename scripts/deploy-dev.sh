#!/usr/bin/env sh
set -eu

ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
ENV_FILE="$ROOT/.env.dev"
[ -f "$ENV_FILE" ] || { echo "Missing $ENV_FILE (copy .env.example first)." >&2; exit 1; }
# shellcheck disable=SC1090
. "$ENV_FILE"
: "${HA_SSH_HOST:?HA_SSH_HOST is required}"
: "${HA_CARD_PATH:?HA_CARD_PATH is required}"

cd "$ROOT"
npm run build
[ -s dist/kimai-work-card.js ] || { echo "Build did not create a non-empty artifact." >&2; exit 1; }
scp dist/kimai-work-card.js "$HA_SSH_HOST:$HA_CARD_PATH"
echo "Deployed card to $HA_SSH_HOST:$HA_CARD_PATH"
echo "Use a cache-busted resource URL during development, e.g. /local/kimai-work-card.js?v=dev"
