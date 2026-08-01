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
