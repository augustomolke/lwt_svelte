import { writable } from 'svelte/store';

type AvailableThemes = 'dark' | 'light';

type Themes = {
  [x in AvailableThemes]: AvailableThemes;
};
const defaultTheme: AvailableThemes = 'light';

// interface LocalStorage {
//     theme: AvailableThemes;
//     primary: string;
// }

const storedTheme: AvailableThemes =
  (localStorage.getItem('theme') as AvailableThemes) || defaultTheme;

export const { set, subscribe } = writable(storedTheme);

const availableThemes: Themes = { dark: 'dark', light: 'light' };

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
      set(storedTheme as AvailableThemes);
      themeToBeApplied = storedTheme;
    } else {
      localStorage.setItem('theme', theme);
      set(theme);
      themeToBeApplied = theme;
    }
    document.querySelector('html').setAttribute('data-theme', themeToBeApplied);
  },
};
