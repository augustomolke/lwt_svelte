import { writable } from 'svelte/store';

type AvailableThemes = 'dark' | 'light';

type Themes = {
  [x in AvailableThemes]: AvailableThemes;
};

interface Colors {
  primary?: string;
}
const defaultTheme: AvailableThemes = 'light';

const defaultPrimary = '#0f95c1';

const defaultColors: Colors = {
  primary: defaultPrimary,
};

const availableThemes: Themes = { dark: 'dark', light: 'light' };

interface Configs {
  theme: AvailableThemes;
  colors: Colors;
}

const defaultConfigs: Configs = {
  theme: defaultTheme,
  colors: defaultColors,
};

const storedTheme: AvailableThemes =
  (localStorage.getItem('theme') as AvailableThemes) || defaultConfigs.theme;

const storedPrimary: string =
  localStorage.getItem('primary') || defaultConfigs.colors.primary;

export const { update, subscribe } = writable({
  theme: storedTheme,
  colors: { primary: storedPrimary },
});

export default {
  subscribe,
  availableThemes,
  applyTheme: (theme?: AvailableThemes) => {
    let themeToBeApplied;
    if (!theme) {
      let storedTheme = localStorage.getItem('theme');
      if (!storedTheme) {
        localStorage.setItem('theme', defaultTheme);
        storedTheme = defaultTheme;
      }
      update((u) => ({ ...u, theme: storedTheme as AvailableThemes }));
      themeToBeApplied = storedTheme;
    } else {
      localStorage.setItem('theme', theme);
      update((u) => ({ ...u, theme }));
      themeToBeApplied = theme;
    }
    document.querySelector('html').setAttribute('data-theme', themeToBeApplied);
  },
  applyColors: (colors?: Colors) => {
    let currentColors = {
      primary: localStorage.getItem('colors') || defaultConfigs.colors.primary,
    };

    let colorsToBeApplied = colors
      ? { ...currentColors, ...colors }
      : currentColors;

    let output = '';

    Object.keys(colorsToBeApplied).forEach((key) => {
      localStorage.setItem(key, colorsToBeApplied[key]);
      output += `--${key}:${colorsToBeApplied[key]};`;
    });

    update((u) => ({ ...u, colors: colorsToBeApplied }));
  },
};
