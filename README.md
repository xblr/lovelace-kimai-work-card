# Kimai Work Card

Experimental Lovelace card for showing and controlling the current Kimai
timesheet through Home Assistant. It requires the separate Home Assistant
Kimai integration; it never receives a Kimai URL or API token.

![Kimai Work Card icon](assets/kimai-work-card-icon.png)

> This is an experimental project. Read the [disclaimer](DISCLAIMER.md) before
> relying on it.

## AI-assisted development

This project was developed primarily with AI-assisted code generation under
human direction. Review the code and test it in your own environment before
relying on it. See the [disclaimer](DISCLAIMER.md) for the full notice.

## Installation

Build the card with `npm run build`, copy `dist/kimai-work-card.js` to
`/config/www/kimai-work-card.js`, and register it as a JavaScript module in
Home Assistant. Once public, it can be added in HACS as a custom **Plugin**
repository.

```yaml
type: custom:kimai-work-card
entity: sensor.kimai_current_work
title: Current work
```

Choose the actual Kimai current-work entity from Home Assistant; entity IDs
can differ between installations.

## Behaviour

The card uses only Home Assistant state and `kimai` services. It supports
`idle`, `running`, `multiple`, and unavailable states. Pause is browser-local:
it stops the Kimai record and resuming creates a new one. See the
[integration contract](docs/INTEGRATION-CONTRACT.md) for details.

## Development and deployment

Run `npm run check` for typecheck, tests, build, and syntax validation. For a
local deployment, copy `.env.example` to `.env.dev`, configure it, then run
`scripts/deploy-dev.sh`. A forced browser refresh may be required after deploy.
