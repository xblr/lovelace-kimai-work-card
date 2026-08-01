# Kimai Work Card integration contract (v0.1)

The card only communicates with Home Assistant. It receives a configured
current-work entity from `hass.states` and calls the public `kimai` services.
It never accepts a Kimai URL, API token, credentials, or HTTP headers.

## Required entity states

The card supports `idle`, `running`, `multiple`, `unavailable`, and `unknown`.

- With `running`, the timer is derived locally from `begin`.
- With `multiple`, the card shows a clear warning and disables destructive or
  ambiguous actions. Refresh remains available.
- With `unavailable`, `unknown`, or a missing entity, the card shows an error
  state and does not offer actions that can create or stop timesheets.
- With `idle` and saved local pause context, the card shows the paused state.

## Action rules

One operation may be in progress at a time, including quick actions. Buttons
must remain disabled until its service call settles. Service errors are visible
and the start/change dialog remains open after a failed validation or service
call.

Pause stops the explicit `timesheet_id` and writes local context only after the
stop action is accepted. Resume starts a new timesheet using that context.
Clearing local pause never alters Kimai.

## Data safety and rendering

All Kimai-derived text is rendered as text, never as executable HTML. The
component cleans its timer and event listeners when disconnected. `dist` is a
generated HACS artifact; future source changes belong under `src` and must be
reproducible through the build command.
