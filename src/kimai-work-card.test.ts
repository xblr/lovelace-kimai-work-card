import { describe, expect, it } from "vitest";

import {
  KimaiWorkCard,
  asInteger,
  formatDuration,
  normalizeTags,
} from "./kimai-work-card";

describe("Kimai Work Card helpers", () => {
  it("formats non-negative durations", () => {
    expect(formatDuration(3661)).toBe("01:01:01");
    expect(formatDuration(-4)).toBe("00:00:00");
  });

  it("accepts only positive integer identifiers", () => {
    expect(asInteger("12")).toBe(12);
    expect(asInteger("1.5")).toBeUndefined();
    expect(asInteger(0)).toBeUndefined();
  });

  it("normalizes tags without producing an invalid payload", () => {
    expect(normalizeTags(["client", "urgent"])).toBe("client,urgent");
    expect(normalizeTags(null)).toBe("");
  });
});

describe("Kimai Work Card actions", () => {
  it("keeps multiple active timesheets in a safe blocked state", () => {
    const card = new KimaiWorkCard();
    card.setConfig({ entity: "sensor.kimai_current_work" });
    (card as any)._entity = { state: "multiple", attributes: { active_count: 2 } };

    expect(card._status()).toBe("multiple");
  });

  it("recognizes only running as the active backend state", () => {
    const card = new KimaiWorkCard();
    card.setConfig({ entity: "sensor.kimai_current_work" });

    (card as any)._entity = { state: "running", attributes: {} };
    expect(card._status()).toBe("working");
    (card as any)._entity = { state: "working", attributes: {} };
    expect(card._status()).toBe("idle");
  });

  it("uses the circle as the finish control when enabled", () => {
    const card = new KimaiWorkCard();
    card.setConfig({ entity: "sensor.kimai_current_work", circle_controls: true });

    const markup = card._renderActive({});
    expect(markup).toContain('data-action="ring-control"');
    expect(markup).toContain('aria-label="Finalizar"');
    expect(markup).not.toContain('data-action="finish"');
  });

  it("renders finish confirmation inside the card instead of using a browser dialog", () => {
    const card = new KimaiWorkCard();
    card.setConfig({ entity: "sensor.kimai_current_work", confirm_finish: true });
    (card as any)._entity = { state: "running", attributes: {} };

    card._requestFinish();
    expect(card.shadowRoot?.innerHTML).toContain("¿Finalizar el registro actual?");
  });

  it("removes the action footer when finish is hidden", () => {
    const card = new KimaiWorkCard();
    card.setConfig({ entity: "sensor.kimai_current_work", show_finish: false });

    expect(card._renderActive({})).not.toContain('class="footer"');
  });

  it("uses English card text outside Spanish Home Assistant locales", () => {
    const card = new KimaiWorkCard();
    card.setConfig({ entity: "sensor.kimai_current_work" });
    card.hass = { language: "en-US", states: {} };

    expect(card._renderActive({})).toContain("Customer");
  });

  it("does not submit a second service call while one is running", async () => {
    let resolveFirstCall: (() => void) | undefined;
    const callService = () => new Promise<void>((resolve) => {
      resolveFirstCall = resolve;
    });
    const card = new KimaiWorkCard();
    card.setConfig({ entity: "sensor.kimai_current_work" });
    card.hass = { callService, states: {} };

    const firstCall = card._callService("refresh", {}, "Actualizando…");
    await expect(card._callService("refresh", {}, "Actualizando…")).resolves.toBe(false);
    expect(resolveFirstCall).toBeTypeOf("function");
    resolveFirstCall?.();
    await expect(firstCall).resolves.toBe(true);
  });
});
