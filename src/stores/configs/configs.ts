import { writable } from 'svelte/store';

type AvailableThemes = 'dark' | 'light';

type Themes = {
  [x in AvailableThemes]: AvailableThemes;
};

interface Colors {
  primary?: string;
  ['primary-hover']?: string;
  // ['primary-focus']?: string;
  ['primary-inverse']?: string;
}
const defaultTheme: AvailableThemes = window.matchMedia(
  '(prefers-color-scheme: dark)'
)
  ? 'dark'
  : 'light';

const defaultPrimary = '#0f95c1';
const defaultHover = '#06769a';
// const defaultFocus = '#e6f1f8';
const defaultInverse = '#ffffff';

const defaultColors: Colors = {
  primary: defaultPrimary,
  'primary-hover': defaultHover,
  // 'primary-focus': defaultFocus,
  'primary-inverse': defaultInverse,
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
const storedHover: string =
  localStorage.getItem('primary-hover') ||
  defaultConfigs.colors['primary-hover'];
// const storedFocus: string =
//   localStorage.getItem('primary-focus') ||
//   defaultConfigs.colors['primary-focus'];
const storedInverse: string =
  localStorage.getItem('primary-inverse') ||
  defaultConfigs.colors['primary-inverse'];

export const { update, subscribe } = writable<Configs>({
  theme: storedTheme,
  colors: {
    primary: storedPrimary,
    'primary-hover': storedHover,
    // 'primary-focus': storedFocus,
    'primary-inverse': storedInverse,
  },
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
    const currentColors: Colors = {
      primary: localStorage.getItem('primary') || defaultConfigs.colors.primary,
      'primary-hover':
        localStorage.getItem('primary-hover') ||
        defaultConfigs.colors['primary-hover'],
      // 'primary-focus':
      //   localStorage.getItem('primary-focus') ||
      //   defaultConfigs.colors['primary-focus'],
      'primary-inverse':
        localStorage.getItem('primary-inverse') ||
        defaultConfigs.colors['primary-inverse'],
    };

    let colorsToBeApplied = colors
      ? { ...currentColors, ...colors }
      : currentColors;

    Object.keys(colorsToBeApplied).forEach((key) => {
      localStorage.setItem(key, colorsToBeApplied[key]);
    });

    update((u) => ({ ...u, colors: colorsToBeApplied }));
  },
  resetConfigs: () => {
    localStorage.clear();
    update((u) => defaultConfigs);
  },
};
