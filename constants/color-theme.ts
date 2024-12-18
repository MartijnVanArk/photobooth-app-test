import { vars } from "nativewind";

export const baseThemeVars = {
  light: {
    "--color-primary-default": "#3a5e96",
    "--color-primary-light": "#5bd1e7",
    "--color-secondary-default": "#9b6cca",
    "--color-secondary-light": "#dfbeff",
    "--color-tertiary-default": "#ff88bd",
    "--color-tertiary-light": "#ffc2e6",
    "--color-accent-default": "#f9c04a",
    "--color-accent-light": "#ffeea9",
    "--color-grey-default": "#979797",
    "--color-slate-default": "#38383a",
    "--color-dark-default": "#1f355b",
    "--color-light-default": "#ECEDED",
    "--color-light-sec-default": "#FAFAFA",
    "--color-light-med": "#DCDDDD",
    "--color-overlay": "rgba(0, 0, 0, .4)",
    "--color-overlay2": "rgba(0, 0, 0, .1)",
    "--color-overlay-inv": "rgba(255, 255, 255, .4)",
    "--color-overlay-dark": "rgba(0, 0, 0, .4)",
    "--color-overlay-light": "rgba(255, 255, 255, .4)",
    "--color-text-primary": "#FCFDFD",
    "--color-text-main": "#333",
    "--color-text-med": "#555",
    "--color-text-secondary": "#777",
    "--color-red-danger-text": "#fff",
    "--color-input-bg": "#fff",
  },
  dark: {
    "--color-primary-default": "#3a5e96",
    "--color-primary-light": "#5bd1e7",
    "--color-secondary-default": "#9b6cca",
    "--color-secondary-light": "#dfbeff",
    "--color-tertiary-default": "#ff88bd",
    "--color-tertiary-light": "#ffc2e6",
    "--color-accent-default": "#f9c04a",
    "--color-accent-light": "#ffeea9",
    "--color-grey-default": "#979797",
    "--color-slate-default": "#38383a",
    "--color-dark-default": "#1f355b",
    "--color-light-default": "#1E1E1E",
    "--color-light-sec-default": "#2E2E2E",
    "--color-light-med": "#2E2E2E",
    "--color-overlay": "rgba(255, 255, 255, .4)",
    "--color-overlay2": "rgba(255, 255, 255, .1)",
    "--color-overlay-inv": "rgba(0, 0, 0, .4)",
    "--color-overlay-dark": "rgba(0, 0, 0, .4)",
    "--color-overlay-light": "rgba(255, 255, 255, .4)",
    "--color-text-primary": "#FCFDFD",
    "--color-text-main": "#EEE",
    "--color-text-med": "#CCC",
    "--color-text-secondary": "#AAA",
    "--color-red-danger-text": "#f00",
    "--color-input-bg": "#ccc",
  },
};

export const themes = {
  light: vars(baseThemeVars.light),
  dark: vars(baseThemeVars.dark),
};
