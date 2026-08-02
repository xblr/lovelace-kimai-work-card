// @ts-nocheck
/* Kimai Work Card v0.1.0 | MIT | Experimental AI-assisted project */
/**
 * Kimai Work Card
 * Experimental, AI-assisted custom card for Home Assistant.
 *
 * Copyright (c) 2026
 * SPDX-License-Identifier: MIT
 */

const CARD_VERSION = "0.1.0";
const CARD_TAG = "kimai-work-card";
const EDITOR_NAME = "Kimai Work Card";

const DEFAULTS = Object.freeze({
  title: "",
  theme: "auto",
  accent_color: "",
  show_header: true,
  show_customer: true,
  show_description: true,
  show_last_started: true,
  show_progress_ring: true,
  show_finish: true,
  circle_controls: false,
  compact: false,
  confirm_finish: false,
});

const TEXT = Object.freeze({
  en: {
    title: "Current work", noCustomer: "No customer", unnamedProject: "Unnamed project", unnamedActivity: "Unnamed activity",
    customer: "Customer", project: "Project", activity: "Activity", description: "Description", finish: "Finish",
    confirmFinish: "Finish the current timesheet?", cancel: "Cancel", unavailable: "Kimai unavailable", multiple: "Multiple active records",
    ready: "Ready to start", missing: "{entity} was not found.", unavailableText: "The Kimai integration is not available right now.",
    multipleText: "Kimai returned multiple active records. Resolve them in Kimai before continuing.", noActive: "There is no active timesheet.",
    start: "Start activity", change: "Change activity", close: "Close", projectId: "Project ID", activityId: "Activity ID",
    tags: "Tags", billable: "Billable time", optional: "Optional", entityRequired: "Kimai Work Card requires an entity, for example sensor.kimai_current_work.", requiredIds: "Project ID and Activity ID are required.", actionFailed: "Kimai could not complete the action. Check the integration status and try again.", note: "Project and activity IDs can be found in Kimai URLs or its API. A future version may load them automatically.",
  },
  es: {
    title: "Trabajo actual", noCustomer: "Sin cliente", unnamedProject: "Proyecto sin nombre", unnamedActivity: "Actividad sin nombre",
    customer: "Cliente", project: "Proyecto", activity: "Actividad", description: "Descripción", finish: "Finalizar",
    confirmFinish: "¿Finalizar el registro actual?", cancel: "Cancelar", unavailable: "Kimai no disponible", multiple: "Varios registros activos",
    ready: "Listo para empezar", missing: "No se ha encontrado {entity}.", unavailableText: "La integración Kimai no está disponible en este momento.",
    multipleText: "Kimai ha devuelto varios registros activos. Actualiza o resuélvelos en Kimai antes de continuar.", noActive: "No hay ningún registro de tiempo activo.",
    start: "Iniciar actividad", change: "Cambiar actividad", close: "Cerrar", projectId: "Proyecto ID", activityId: "Actividad ID",
    tags: "Etiquetas", billable: "Tiempo facturable", optional: "Opcional", entityRequired: "Kimai Work Card necesita una entidad, por ejemplo sensor.kimai_trabajo_actual.", requiredIds: "Proyecto ID y Actividad ID son obligatorios.", actionFailed: "No se pudo completar la acción en Kimai. Revisa el estado de la integración e inténtalo de nuevo.", note: "Los identificadores de proyecto y actividad se pueden consultar en las URLs o en la API de Kimai. Una versión posterior podrá cargarlos automáticamente.",
  },
});

const ICONS = Object.freeze({
  briefcase: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5V3h6v2h4a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4Zm2 0h2V4h-2v1Zm-6 6v7h14v-7h-5v2h-4v-2H5Zm7 0v-1h-2v1h2ZM5 7v2h5V8h4v1h5V7H5Z"/></svg>',
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7L8 5Z"/></svg>',
  stop: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6h12v12H6V6Z"/></svg>',
  swap: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m16 3 4 4-4 4V8H6V6h10V3ZM8 13v3h10v2H8v3l-4-4 4-4Z"/></svg>',
  refresh: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.7 6.3A8 8 0 1 0 20 12h-2a6 6 0 1 1-1.76-4.24L13 11h8V3l-3.3 3.3Z"/></svg>',
  clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm-1 3v6l5 3 1-1.73-4-2.27V7h-2Z"/></svg>',
  edit: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 16.5 9.9-9.9 3.5 3.5-9.9 9.9H4v-3.5Zm15.7-8.7-3.5-3.5 1.1-1.1a2 2 0 0 1 2.8 0l.7.7a2 2 0 0 1 0 2.8l-1.1 1.1Z"/></svg>',
  warning: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 1 21h22L12 2Zm0 5 7.53 12H4.47L12 7Zm-1 3v5h2v-5h-2Zm0 7v2h2v-2h-2Z"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 16.2-4.2-4.2-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2Z"/></svg>',
  close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6.4 5 5.6 5.6L17.6 5 19 6.4 13.4 12 19 17.6 17.6 19 12 13.4 6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5Z"/></svg>',
  plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5Z"/></svg>',
});

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function asInteger(value) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined;
}

function normalizeTags(value) {
  if (Array.isArray(value)) return value.filter(Boolean).join(",");
  return typeof value === "string" ? value : "";
}

function formatDuration(totalSeconds) {
  const safe = Math.max(0, Math.floor(Number(totalSeconds) || 0));
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;
  return [hours, minutes, seconds].map((part) => String(part).padStart(2, "0")).join(":");
}

function formatClockTime(value, locale) {
  const date = value ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat(locale || "es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function cleanServiceData(data) {
  return Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== undefined && value !== null && value !== "")
  );
}

class KimaiWorkCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._hass = undefined;
    this._config = undefined;
    this._entity = undefined;
    this._timerHandle = undefined;
    this._busy = "";
    this._confirmingFinish = false;
    this._errorMessage = "";
    this._dialogOpen = false;
    this._dialogMode = "start";
    this._dialogDefaults = {};
  }

  static getStubConfig() {
    return {
      entity: "sensor.kimai_trabajo_actual",
    };
  }

  static getConfigForm() {
    return {
      schema: [
        { name: "entity", required: true, selector: { entity: { filter: [{ domain: "sensor" }] } } },
        { name: "title", selector: { text: {} } },
        { name: "config_entry_id", selector: { config_entry: { integration: "kimai" } } },
        {
          type: "grid",
          name: "",
          flatten: true,
          column_min_width: "180px",
          schema: [
            {
              name: "theme",
              selector: {
                select: {
                  mode: "dropdown",
                  options: [
                    { value: "auto", label: "Automático" },
                    { value: "dark", label: "Oscuro" },
                    { value: "light", label: "Claro" },
                  ],
                },
              },
            },
            { name: "accent_color", selector: { text: {} } },
            { name: "show_header", selector: { boolean: {} } },
            { name: "compact", selector: { boolean: {} } },
            { name: "confirm_finish", selector: { boolean: {} } },
          ],
        },
        {
          type: "expandable",
          name: "",
          title: "Contenido y acciones",
          flatten: true,
          schema: [
            { name: "show_customer", selector: { boolean: {} } },
            { name: "show_description", selector: { boolean: {} } },
            { name: "show_last_started", selector: { boolean: {} } },
            { name: "show_progress_ring", selector: { boolean: {} } },
            { name: "show_finish", selector: { boolean: {} } },
            { name: "circle_controls", selector: { boolean: {} } },
          ],
        },
      ],
      computeLabel: (schema) => {
        const labels = {
          entity: "Current work entity",
          title: "Title",
          config_entry_id: "Config entry ID (only if multiple accounts are configured)",
          theme: "Theme",
          accent_color: "CSS accent color, for example #2aa7ff",
          show_header: "Show header",
          compact: "Compact mode",
          confirm_finish: "Confirm before finishing",
          show_customer: "Show customer",
          show_description: "Show description",
          show_last_started: "Show start time",
          show_progress_ring: "Show timer ring",
          show_finish: "Show finish",
          circle_controls: "Control with the circle",
        };
        return labels[schema.name];
      },
      computeHelper: (schema) => {
        if (schema.name === "config_entry_id") {
          return "Leave empty when only one Kimai integration is configured.";
        }
        if (schema.name === "accent_color") {
          return "Leave empty to use Home Assistant's primary theme color.";
        }
        return undefined;
      },
    };
  }

  setConfig(config) {
    if (!config?.entity) {
      throw new Error(TEXT.en.entityRequired);
    }
    this._config = { ...DEFAULTS, ...config };
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    const nextEntity = this._config?.entity ? hass?.states?.[this._config.entity] : undefined;
    const changed = nextEntity !== this._entity;
    this._entity = nextEntity;
    if (changed) this._render();
    this._updateTimerDom();
  }

  get hass() {
    return this._hass;
  }

  connectedCallback() {
    this._startTimer();
    this._render();
  }

  disconnectedCallback() {
    this._stopTimer();
  }

  getCardSize() {
    return this._config?.compact ? 4 : 6;
  }

  getGridOptions() {
    return {
      rows: this._config?.compact ? 4 : 5,
      columns: 6,
      min_rows: this._config?.compact ? 3 : 4,
      min_columns: 6,
    };
  }

  _locale() {
    return this._hass?.locale?.language || this._hass?.language || "es-ES";
  }

  _t(key, values = {}) {
    const language = this._locale().toLowerCase().startsWith("es") ? "es" : "en";
    return (TEXT[language][key] || TEXT.en[key] || key).replace(
      /\{(\w+)\}/g,
      (_match, name) => String(values[name] ?? "")
    );
  }

  _status() {
    const state = this._entity?.state;
    if (!this._entity) return "missing";
    if (["unavailable", "unknown"].includes(state)) return "unavailable";
    if (state === "multiple") return "multiple";
    if (state === "running") return "working";
    return "idle";
  }

  _elapsedSeconds() {
    const attrs = this._entity?.attributes || {};
    const begin = attrs.begin ? new Date(attrs.begin) : null;
    if (begin && !Number.isNaN(begin.getTime())) {
      return Math.max(0, Math.floor((Date.now() - begin.getTime()) / 1000));
    }
    const base = Number(attrs.elapsed_seconds_at_update) || 0;
    const updated = this._entity?.last_updated ? new Date(this._entity.last_updated) : null;
    const delta = updated && !Number.isNaN(updated.getTime())
      ? Math.max(0, Math.floor((Date.now() - updated.getTime()) / 1000))
      : 0;
    return base + delta;
  }

  _startTimer() {
    if (this._timerHandle) return;
    this._timerHandle = window.setInterval(() => this._updateTimerDom(), 1000);
  }

  _stopTimer() {
    if (!this._timerHandle) return;
    window.clearInterval(this._timerHandle);
    this._timerHandle = undefined;
  }

  _updateTimerDom() {
    if (!this.shadowRoot) return;
    const elapsed = this._elapsedSeconds();
    const timer = this.shadowRoot.querySelector("[data-timer]");
    if (timer) timer.textContent = formatDuration(elapsed);
    const ring = this.shadowRoot.querySelector("[data-ring-progress]");
    if (ring) {
      const circumference = 2 * Math.PI * 54;
      const progress = (elapsed % 3600) / 3600;
      ring.style.strokeDasharray = `${circumference}`;
      ring.style.strokeDashoffset = `${circumference * (1 - progress)}`;
    }
  }

  _displayData() {
    return this._entity?.attributes || {};
  }

  _render() {
    if (!this.shadowRoot || !this._config) return;
    const status = this._status();
    const data = this._displayData();
    const themeClass = ["light", "dark"].includes(this._config.theme)
      ? `forced-${this._config.theme}`
      : "";
    const accentStyle = this._config.accent_color
      ? `--kimai-accent:${escapeHtml(this._config.accent_color)};`
      : "";
    const activeHasFooter = this._config.show_finish
      && !(this._config.circle_controls && this._config.show_progress_ring);

    this.shadowRoot.innerHTML = `
      <style>${this._styles()}</style>
      <article class="card ${themeClass} ${this._config.compact ? "compact" : ""} ${activeHasFooter ? "with-active-footer" : ""}" style="${accentStyle}">
        ${this._renderHeader(status, data)}
        ${this._errorMessage ? `<div class="message error" role="alert">${ICONS.warning}<span>${escapeHtml(this._errorMessage)}</span></div>` : ""}
        ${status === "working" ? this._renderActive(data) : this._renderIdle(status)}
      </article>
      ${this._dialogOpen ? this._renderDialog() : ""}
    `;

    this._bindEvents();
    this._updateTimerDom();
  }

  _renderHeader(status, data) {
    const activeCount = Number(data.active_count) || 0;
    const started = this._config.show_last_started && status === "working" && data.begin
      ? `<div class="started header-started">${ICONS.clock}<span>Iniciada a las ${escapeHtml(formatClockTime(data.begin, this._locale()))}</span></div>`
      : "";
    return `
      <header class="header ${this._config.show_header ? "" : "without-heading"} ${this._config.show_header || started ? "" : "empty"}">
        ${this._config.show_header ? `
        <div class="heading">
          <span class="heading-icon">${ICONS.briefcase}</span>
          <div>
            <h2>${escapeHtml(this._config.title || this._t("title"))}</h2>
          </div>
        </div>
        ` : ""}
        ${started}
      </header>
      ${activeCount > 1 ? `<div class="message warning">${ICONS.warning}<span>Kimai devuelve varios registros activos. La tarjeta muestra y detiene el registro principal.</span></div>` : ""}
    `;
  }

  _renderActive(data) {
    const circleControls = this._config.show_finish && this._config.circle_controls && this._config.show_progress_ring;
    const customer = data.customer || this._t("noCustomer");
    const project = data.project || this._t("unnamedProject");
    const activity = data.activity || this._t("unnamedActivity");
    const description = data.description;

    return `
      <section class="content active-content">
        <div class="details">
          ${this._config.show_customer ? this._detail(this._t("customer"), customer) : ""}
          ${this._detail(this._t("project"), project)}
          ${this._detail(this._t("activity"), activity)}
          ${this._config.show_description && description ? this._detail(this._t("description"), description, true) : ""}
        </div>
        <div class="timer-zone">
          ${this._config.show_progress_ring ? `
            <div class="ring-wrap">
              ${circleControls ? `<button class="ring-control-hit" type="button" data-action="ring-control" aria-label="${this._t("finish")}" title="${this._t("finish")}" ${this._busy ? "disabled" : ""}></button>` : ""}
              <svg class="ring" viewBox="0 0 128 128" aria-hidden="true">
                <circle class="ring-track" cx="64" cy="64" r="54"></circle>
                <circle class="ring-progress" data-ring-progress cx="64" cy="64" r="54"></circle>
              </svg>
              <div class="timer-center">
                <div class="timer" data-timer>${formatDuration(this._elapsedSeconds())}</div>
                <div class="timer-state">EN CURSO</div>
              </div>
            </div>
          ` : `
            <div class="plain-timer">
              <div class="timer" data-timer>${formatDuration(this._elapsedSeconds())}</div>
              <div class="timer-state">EN CURSO</div>
            </div>
          `}
        </div>
      </section>
      ${this._confirmingFinish ? this._renderFinishConfirmation() : !circleControls && this._config.show_finish ? `<footer class="footer">${this._renderActiveActions()}</footer>` : ""}
      ${this._busy ? `<div class="busy-line"><span></span>${escapeHtml(this._busy)}</div>` : ""}
    `;
  }

  _renderActiveActions() {
    return `
      <div class="actions">
        ${this._config.show_finish ? `<button class="button danger" type="button" data-action="finish" ${this._busy ? "disabled" : ""}>${ICONS.stop}<span>${this._t("finish")}</span></button>` : ""}
      </div>
    `;
  }

  _renderFinishConfirmation() {
    return `
      <div class="finish-confirmation" role="alert">
        <div class="finish-confirmation-panel">
          <span>${this._t("confirmFinish")}</span>
          <div class="finish-confirmation-actions">
            <button class="button ghost" type="button" data-action="cancel-finish">${this._t("cancel")}</button>
            <button class="button danger" type="button" data-action="confirm-finish">${ICONS.stop}<span>${this._t("finish")}</span></button>
          </div>
        </div>
      </div>
    `;
  }

  _detail(label, value, wide = false) {
    return `
      <div class="detail ${wide ? "wide" : ""}">
        <span class="detail-label">${escapeHtml(label)}</span>
        <span class="detail-value">${escapeHtml(value)}</span>
      </div>
    `;
  }

  _renderIdle(status) {
    const unavailable = status === "missing" || status === "unavailable";
    const multiple = status === "multiple";
    const actionsBlocked = unavailable || multiple;
    const text = status === "missing"
      ? this._t("missing", { entity: this._config.entity })
      : status === "unavailable"
        ? this._t("unavailableText")
        : multiple
          ? this._t("multipleText")
        : this._t("noActive");
    return `
      <section class="idle-content">
        <div class="idle-symbol ${unavailable ? "danger" : ""}">${unavailable || multiple ? ICONS.warning : ICONS.clock}</div>
        <div class="idle-copy">
          <h3>${unavailable ? this._t("unavailable") : multiple ? this._t("multiple") : this._t("ready")}</h3>
          <p>${escapeHtml(text)}</p>
        </div>
        <div class="actions idle-actions">
          ${!actionsBlocked ? `<button class="button primary" type="button" data-action="start" ${this._busy ? "disabled" : ""}>${ICONS.plus}<span>${this._t("start")}</span></button>` : ""}
        </div>
        ${this._busy ? `<div class="busy-line"><span></span>${escapeHtml(this._busy)}</div>` : ""}
      </section>
    `;
  }

  _renderDialog() {
    const defaults = this._dialogDefaults || {};
    const title = this._dialogMode === "change" ? this._t("change") : this._t("start");
    return `
      <div class="dialog-backdrop" data-action="close-dialog" role="presentation">
        <section class="dialog" role="dialog" aria-modal="true" aria-labelledby="kimai-dialog-title" data-dialog-panel>
          <header class="dialog-header">
            <div>
              <div class="eyebrow">KIMAI</div>
              <h3 id="kimai-dialog-title">${title}</h3>
            </div>
            <button class="icon-button" type="button" data-action="close-dialog" aria-label="${this._t("close")}">${ICONS.close}</button>
          </header>
          <form data-dialog-form>
            <div class="form-grid">
              <label>
                <span>${this._t("projectId")}</span>
                <input name="project_id" type="number" min="1" required value="${escapeHtml(defaults.project_id || "")}" inputmode="numeric">
              </label>
              <label>
                <span>${this._t("activityId")}</span>
                <input name="activity_id" type="number" min="1" required value="${escapeHtml(defaults.activity_id || "")}" inputmode="numeric">
              </label>
            </div>
            <label>
              <span>${this._t("description")}</span>
              <textarea name="description" rows="3" placeholder="${this._t("optional")}">${escapeHtml(defaults.description || "")}</textarea>
            </label>
            <label>
              <span>${this._t("tags")}</span>
              <input name="tags" type="text" value="${escapeHtml(normalizeTags(defaults.tags))}" placeholder="Separadas por comas">
            </label>
            <label class="checkbox-row">
              <input name="billable" type="checkbox" ${defaults.billable === false ? "" : "checked"}>
              <span>${this._t("billable")}</span>
            </label>
            <div class="dialog-note">${this._t("note")}</div>
            <div class="dialog-actions">
              <button class="button ghost" type="button" data-action="close-dialog">${this._t("cancel")}</button>
              <button class="button primary" type="submit">${this._dialogMode === "change" ? ICONS.swap : ICONS.play}<span>${this._dialogMode === "change" ? this._t("change") : this._t("start")}</span></button>
            </div>
          </form>
        </section>
      </div>
    `;
  }

  _bindEvents() {
    this.shadowRoot.querySelectorAll("[data-action]").forEach((element) => {
      element.addEventListener("click", (event) => {
        const action = event.currentTarget.dataset.action;
        if (action === "close-dialog" && event.target.closest("[data-dialog-panel]") && event.currentTarget.classList.contains("dialog-backdrop")) return;
        this._handleAction(action);
      });
    });

    const form = this.shadowRoot.querySelector("[data-dialog-form]");
    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        this._submitDialog({
          project_id: asInteger(formData.get("project_id")),
          activity_id: asInteger(formData.get("activity_id")),
          description: String(formData.get("description") || "").trim(),
          tags: String(formData.get("tags") || "").trim(),
          billable: formData.get("billable") === "on",
        });
      });
      queueMicrotask(() => form.querySelector("input")?.focus());
    }
  }

  async _handleAction(action) {
    if (this._busy && action !== "close-dialog") return;
    switch (action) {
      case "refresh":
        await this._callService("refresh", {}, "Actualizando…");
        break;
      case "finish":
        this._requestFinish();
        break;
      case "ring-control":
        this._requestFinish();
        break;
      case "confirm-finish":
        await this._finish();
        break;
      case "cancel-finish":
        this._confirmingFinish = false;
        this._render();
        break;
      case "change":
        this._openDialog("change", this._entity?.attributes || {});
        break;
      case "start":
        this._openDialog("start", {});
        break;
      case "close-dialog":
        this._dialogOpen = false;
        this._render();
        break;
      default:
        break;
    }
  }

  _openDialog(mode, defaults) {
    this._dialogMode = mode;
    this._dialogDefaults = {
      project_id: defaults.project_id,
      activity_id: defaults.activity_id,
      description: defaults.description,
      tags: defaults.tags,
      billable: defaults.billable,
    };
    this._dialogOpen = true;
    this._errorMessage = "";
    this._render();
  }

  async _submitDialog(data) {
    if (!data.project_id || !data.activity_id) {
      this._errorMessage = this._t("requiredIds");
      this._render();
      return;
    }
    const service = this._dialogMode === "change" && this._status() === "working"
      ? "switch_timesheet"
      : "start_timesheet";
    const ok = await this._callService(service, data, this._dialogMode === "change" ? "Cambiando actividad…" : "Iniciando actividad…");
    if (ok) {
      this._dialogOpen = false;
      this._render();
    }
  }

  _requestFinish() {
    if (this._config.confirm_finish) {
      this._confirmingFinish = true;
      this._render();
      return;
    }
    this._finish();
  }

  async _finish() {
    this._confirmingFinish = false;
    const attrs = this._entity?.attributes || {};
    const ok = await this._callService(
      "stop_timesheet",
      { timesheet_id: asInteger(attrs.timesheet_id) },
      "Finalizando…"
    );
  }

  async _callService(service, data, busyLabel) {
    if (this._busy) return false;
    if (!this._hass?.callService) {
      this._errorMessage = "Home Assistant no ha proporcionado acceso a servicios.";
      this._render();
      return false;
    }
    this._busy = busyLabel;
    this._errorMessage = "";
    this._render();
    try {
      const payload = cleanServiceData({
        config_entry_id: this._config.config_entry_id,
        ...data,
      });
      await this._hass.callService("kimai", service, payload);
      return true;
    } catch (error) {
      this._errorMessage = this._t("actionFailed");
      return false;
    } finally {
      this._busy = "";
      this._render();
    }
  }

  _styles() {
    return `
      :host {
        display: block;
        --kimai-accent: var(--primary-color, #2aa7ff);
        --kimai-success: var(--success-color, #28c98b);
        --kimai-warning: var(--warning-color, #f2ae3d);
        --kimai-danger: var(--error-color, #ef5b62);
        --kimai-card-bg: var(--ha-card-background, var(--card-background-color, #0d1722));
        --kimai-surface: color-mix(in srgb, var(--kimai-card-bg) 92%, var(--primary-text-color) 8%);
        --kimai-surface-2: color-mix(in srgb, var(--kimai-card-bg) 86%, var(--primary-text-color) 14%);
        --kimai-border: color-mix(in srgb, var(--kimai-accent) 24%, var(--divider-color, transparent));
        --kimai-text: var(--primary-text-color, #f5f7fb);
        --kimai-muted: var(--secondary-text-color, #9dacbd);
        font-family: var(--paper-font-body1_-_font-family, var(--ha-font-family-body, sans-serif));
      }

      *, *::before, *::after { box-sizing: border-box; }
      button, input, textarea { font: inherit; }
      button { -webkit-tap-highlight-color: transparent; }
      svg { width: 1em; height: 1em; fill: currentColor; display: block; }

      .card {
        position: relative;
        min-height: 0;
        overflow: hidden;
        padding: 22px;
        border-radius: var(--ha-card-border-radius, 18px);
        border: 1px solid var(--kimai-border);
        background: var(--kimai-card-bg);
        color: var(--kimai-text);
        box-shadow: var(--ha-card-box-shadow, 0 10px 30px rgba(0,0,0,.16));
      }

      .forced-dark {
        --kimai-card-bg: #0a1520;
        --kimai-text: #f3f7fb;
        --kimai-muted: #98aabb;
        --kimai-border: color-mix(in srgb, var(--kimai-accent) 28%, #25394a);
      }

      .forced-light {
        --kimai-card-bg: #ffffff;
        --kimai-text: #17212b;
        --kimai-muted: #647485;
        --kimai-border: color-mix(in srgb, var(--kimai-accent) 22%, #d8e1ea);
      }

      .header,
      .heading,
      .actions,
      .started,
      .busy-line,
      .message,
      .checkbox-row {
        display: flex;
        align-items: center;
      }

      .header { gap: 16px; margin-bottom: 20px; }
      .header.empty { display: none; }
      .heading { margin-right: auto; }
      .header.without-heading { justify-content: flex-end; }
      .heading { gap: 12px; min-width: 0; }
      .heading-icon {
        width: 40px;
        height: 40px;
        border-radius: 12px;
        display: grid;
        place-items: center;
        color: var(--kimai-accent);
        background: color-mix(in srgb, var(--kimai-accent) 12%, transparent);
        border: 1px solid color-mix(in srgb, var(--kimai-accent) 24%, transparent);
        font-size: 22px;
      }
      .heading h2, .dialog h3 { margin: 1px 0 0; font-size: 20px; line-height: 1.2; }
      .message {
        gap: 9px;
        margin: -6px 0 16px;
        padding: 10px 12px;
        border-radius: 12px;
        font-size: 12px;
        line-height: 1.4;
      }
      .message svg { flex: 0 0 auto; font-size: 17px; }
      .message.warning { color: var(--kimai-warning); background: color-mix(in srgb, var(--kimai-warning) 10%, transparent); border: 1px solid color-mix(in srgb, var(--kimai-warning) 25%, transparent); }
      .message.error { color: var(--kimai-danger); background: color-mix(in srgb, var(--kimai-danger) 10%, transparent); border: 1px solid color-mix(in srgb, var(--kimai-danger) 25%, transparent); }

      .active-content { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 28px; align-items: center; }
      .details { display: grid; grid-template-columns: minmax(0, 1fr); gap: 14px; min-width: 0; }
      .detail { min-width: 0; }
      .detail-label { display: block; margin-bottom: 5px; color: var(--kimai-muted); font-size: 10px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
      .detail-value { display: block; overflow: hidden; text-overflow: ellipsis; color: var(--kimai-text); font-size: 16px; font-weight: 700; line-height: 1.35; }
      .detail.wide { margin-top: 2px; }
      .detail.wide .detail-value { white-space: normal; font-size: 12px; color: var(--kimai-muted); font-weight: 500; }

      .timer-zone { min-width: 190px; display: grid; place-items: center; }
      .ring-wrap { width: 178px; height: 178px; position: relative; display: grid; place-items: center; }
      .ring-control-hit { position: absolute; z-index: 1; inset: 0; padding: 0; border: 0; border-radius: 50%; background: transparent; cursor: pointer; }
      .ring-control-hit:hover + .ring .ring-progress { stroke-width: 6; }
      .ring-control-hit:focus-visible { outline: 2px solid var(--kimai-accent); outline-offset: 5px; }
      .ring-control-hit[disabled] { cursor: wait; }
      .ring { position: absolute; inset: 0; width: 100%; height: 100%; transform: rotate(-90deg); filter: drop-shadow(0 0 8px color-mix(in srgb, var(--kimai-accent) 28%, transparent)); }
      .ring-track, .ring-progress { fill: none; stroke-width: 5; }
      .ring-track { stroke: color-mix(in srgb, var(--kimai-accent) 11%, var(--kimai-surface)); }
      .ring-progress { stroke: var(--kimai-accent); stroke-linecap: round; transition: stroke-dashoffset .3s linear; }
      .timer-center { position: relative; z-index: 2; text-align: center; pointer-events: none; }
      .timer { color: var(--kimai-text); font-size: 29px; line-height: 1; font-variant-numeric: tabular-nums; letter-spacing: -.04em; font-weight: 800; }
      .timer-state { margin-top: 8px; color: var(--kimai-accent); font-size: 10px; font-weight: 900; letter-spacing: .18em; }
      .plain-timer { min-width: 190px; padding: 24px 20px; text-align: center; border-radius: 18px; background: var(--kimai-surface); border: 1px solid var(--kimai-border); }

      .footer { margin-top: 22px; padding-top: 18px; border-top: 1px solid color-mix(in srgb, var(--kimai-border) 68%, transparent); }
      .actions { flex-wrap: wrap; gap: 10px; }
      .finish-confirmation { position: absolute; z-index: 5; inset: 0; display: grid; place-items: center; padding: 22px; background: color-mix(in srgb, var(--kimai-card-bg) 72%, transparent); backdrop-filter: blur(3px); }
      .finish-confirmation-panel { display: grid; gap: 14px; width: min(310px, 100%); padding: 18px; border: 1px solid color-mix(in srgb, var(--kimai-danger) 35%, var(--kimai-border)); border-radius: 14px; color: var(--kimai-text); background: var(--kimai-card-bg); box-shadow: 0 16px 40px rgba(0,0,0,.25); font-size: 13px; font-weight: 700; text-align: center; }
      .finish-confirmation-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
      .button {
        min-height: 42px;
        padding: 0 15px;
        border: 1px solid transparent;
        border-radius: 12px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        color: var(--kimai-text);
        background: var(--kimai-surface);
        cursor: pointer;
        font-weight: 750;
        font-size: 13px;
        transition: transform .15s ease, filter .15s ease, border-color .15s ease;
      }
      .button svg { font-size: 18px; }
      .button:hover { filter: brightness(1.06); }
      .button:active { transform: translateY(1px); }
      .button[disabled] { opacity: .55; cursor: wait; }
      .button.primary { color: #fff; background: var(--kimai-accent); box-shadow: 0 7px 22px color-mix(in srgb, var(--kimai-accent) 25%, transparent); }
      .button.danger { color: var(--kimai-danger); background: color-mix(in srgb, var(--kimai-danger) 10%, transparent); border-color: color-mix(in srgb, var(--kimai-danger) 28%, transparent); }
      .button.secondary { color: var(--kimai-text); border-color: var(--kimai-border); }
      .button.ghost { color: var(--kimai-muted); background: transparent; border-color: color-mix(in srgb, var(--kimai-muted) 20%, transparent); }
      .started { gap: 7px; color: var(--kimai-muted); font-size: 11px; }
      .header-started { margin-left: auto; white-space: nowrap; }
      .started svg { font-size: 14px; }

      .busy-line { gap: 9px; margin-top: 13px; color: var(--kimai-muted); font-size: 12px; }
      .busy-line > span { width: 42px; height: 2px; overflow: hidden; border-radius: 999px; background: color-mix(in srgb, var(--kimai-accent) 20%, transparent); position: relative; }
      .busy-line > span::after { content: ""; position: absolute; inset: 0; width: 45%; background: var(--kimai-accent); animation: loading 1s ease-in-out infinite; }
      @keyframes loading { 0% { transform: translateX(-110%); } 100% { transform: translateX(240%); } }

      .idle-content { min-height: 178px; height: 178px; display: grid; place-items: center; align-content: center; text-align: center; padding: 0 10px; overflow: hidden; }
      .with-active-footer .idle-content { min-height: 260px; height: 260px; }
      .idle-symbol { width: 48px; height: 48px; display: grid; place-items: center; border-radius: 15px; color: var(--kimai-accent); background: color-mix(in srgb, var(--kimai-accent) 10%, transparent); border: 1px solid color-mix(in srgb, var(--kimai-accent) 25%, transparent); font-size: 24px; }
      .idle-symbol.danger { color: var(--kimai-danger); background: color-mix(in srgb, var(--kimai-danger) 10%, transparent); border-color: color-mix(in srgb, var(--kimai-danger) 25%, transparent); }
      .idle-copy h3 { margin: 10px 0 3px; font-size: 16px; }
      .idle-copy p { margin: 0; color: var(--kimai-muted); font-size: 12px; line-height: 1.3; }
      .idle-actions { margin-top: 10px; justify-content: center; }
      .idle-actions .button { min-height: 36px; }

      .dialog-backdrop { position: fixed; inset: 0; z-index: 9999; display: grid; place-items: center; padding: 20px; background: rgba(4,10,16,.64); backdrop-filter: blur(8px); }
      .dialog { width: min(520px, 100%); max-height: calc(100vh - 40px); overflow: auto; padding: 22px; border-radius: 20px; color: var(--primary-text-color, #f5f7fb); background: var(--ha-card-background, var(--card-background-color, #101b26)); border: 1px solid color-mix(in srgb, var(--kimai-accent) 30%, var(--divider-color, transparent)); box-shadow: 0 24px 80px rgba(0,0,0,.42); }
      .dialog-header { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 18px; }
      .dialog form { display: grid; gap: 15px; }
      .dialog label { display: grid; gap: 7px; color: var(--secondary-text-color, #9dacbd); font-size: 12px; font-weight: 700; }
      .form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 13px; }
      .dialog input[type="text"], .dialog input[type="number"], .dialog textarea {
        width: 100%;
        padding: 11px 12px;
        border-radius: 11px;
        border: 1px solid var(--divider-color, rgba(255,255,255,.12));
        outline: none;
        color: var(--primary-text-color, #f5f7fb);
        background: color-mix(in srgb, var(--ha-card-background, #101b26) 90%, var(--primary-text-color) 10%);
      }
      .dialog input:focus, .dialog textarea:focus { border-color: var(--kimai-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--kimai-accent) 13%, transparent); }
      .checkbox-row { display: flex !important; grid-template-columns: auto 1fr; gap: 9px !important; cursor: pointer; }
      .checkbox-row input { accent-color: var(--kimai-accent); width: 17px; height: 17px; }
      .dialog-note { padding: 10px 12px; border-radius: 11px; color: var(--secondary-text-color, #9dacbd); background: color-mix(in srgb, var(--kimai-accent) 7%, transparent); border: 1px solid color-mix(in srgb, var(--kimai-accent) 17%, transparent); font-size: 11px; line-height: 1.45; }
      .dialog-actions { margin-top: 3px; display: flex; gap: 10px; justify-content: flex-end; }

      .compact { padding: 18px; }
      .compact .header { margin-bottom: 14px; }
      .compact .active-content { gap: 20px; }
      .compact .ring-wrap { width: 150px; height: 150px; }
      .compact .timer { font-size: 25px; }
      .compact .footer { margin-top: 15px; padding-top: 14px; }
      .compact .detail-value { font-size: 14px; }
      .compact .idle-content { min-height: 150px; height: 150px; }
      .compact.with-active-footer .idle-content { min-height: 221px; height: 221px; }

      @media (max-width: 620px) {
        .card { padding: 18px; }
        .active-content { grid-template-columns: 1fr; }
        .timer-zone { order: -1; min-width: 0; }
        .footer { text-align: center; }
        .finish-confirmation-actions { justify-content: center; }
        .actions { justify-content: center; }
        .started { justify-content: center; }
        .header { align-items: flex-start; }
      }

      @media (max-width: 430px) {
        .form-grid { grid-template-columns: 1fr; }
        .actions .button { flex: 1 1 130px; }
      }

      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
      }
    `;
  }
}

if (!customElements.get(CARD_TAG)) {
  customElements.define(CARD_TAG, KimaiWorkCard);
}

window.customCards = window.customCards || [];
if (!window.customCards.some((card) => card.type === CARD_TAG)) {
  window.customCards.push({
    type: CARD_TAG,
    name: EDITOR_NAME,
    preview: true,
    description: "Controla el registro de tiempo actual de Kimai desde Home Assistant.",
    getEntitySuggestion: (hass, entityId) => {
      const state = hass?.states?.[entityId];
      if (!state || entityId.split(".")[0] !== "sensor") return null;
      const attrs = state.attributes || {};
      const looksLikeKimai =
        entityId.includes("kimai") ||
        Object.prototype.hasOwnProperty.call(attrs, "timesheet_id") ||
        Object.prototype.hasOwnProperty.call(attrs, "active_count");
      if (!looksLikeKimai) return null;
      return { config: { type: `custom:${CARD_TAG}`, entity: entityId } };
    },
  });
}

console.info(
  `%c KIMAI WORK CARD %c v${CARD_VERSION} `,
  "background:#168be8;color:#fff;font-weight:700;padding:3px 6px;border-radius:4px 0 0 4px",
  "background:#0b1620;color:#9ccfff;padding:3px 6px;border-radius:0 4px 4px 0"
);

export { KimaiWorkCard, asInteger, formatDuration, normalizeTags };
