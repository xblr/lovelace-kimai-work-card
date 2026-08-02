#!/usr/bin/env sh
set -eu

ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
ENV_FILE="$ROOT/.env.dev"
[ -f "$ENV_FILE" ] || { echo "Missing $ENV_FILE (copy .env.example first)." >&2; exit 1; }
# shellcheck disable=SC1090
. "$ENV_FILE"
: "${HA_SSH_HOST:?HA_SSH_HOST is required}"
: "${HA_SSH_PORT:=22}"
: "${HA_CARD_PATH:?HA_CARD_PATH is required}"
SCP_COMMAND=${HA_SCP_COMMAND:-scp}

case "$HA_SSH_PORT" in
  ''|*[!0-9]*) echo "HA_SSH_PORT must be a numeric TCP port." >&2; exit 1 ;;
esac

cd "$ROOT"
npm run build
[ -s dist/kimai-work-card.js ] || { echo "Build did not create a non-empty artifact." >&2; exit 1; }

CARD_FILE="$ROOT/dist/kimai-work-card.js"
case "$SCP_COMMAND" in
  *.exe)
    if command -v wslpath >/dev/null 2>&1; then
      SCP_CARD_FILE=$(wslpath -w "$CARD_FILE")
    elif command -v cygpath >/dev/null 2>&1; then
      SCP_CARD_FILE=$(cygpath -w "$CARD_FILE")
    else
      SCP_CARD_FILE="$CARD_FILE"
    fi
    ;;
  *) SCP_CARD_FILE="$CARD_FILE" ;;
esac

"$SCP_COMMAND" -P "$HA_SSH_PORT" "$SCP_CARD_FILE" "$HA_SSH_HOST:$HA_CARD_PATH"
echo "Deployed card to $HA_SSH_HOST:$HA_SSH_PORT$HA_CARD_PATH"
echo "Use a cache-busted resource URL during development, e.g. /local/kimai-work-card.js?v=dev"
