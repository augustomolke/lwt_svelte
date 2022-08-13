import { writable } from 'svelte/store';

export interface Terms {
  type: 'term' | 'symbol';
  value: string;
  status: number;
}

export interface CurrentContent {
  originalString: string;
  title: string;
  parsed: Terms[];
}

const splitContent = (originalContent: string): Terms[] => {
  const terms = originalContent
    .replaceAll(
      /([`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~.(\r\n|\r|\n)]+)/g,
      ' $1 '
    )
    .split(/ +/)
    .map((t) => {
      const type: Terms['type'] = t.match(
        /([`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~.(\r\n|\r|\n)]+)/g
      )
        ? 'symbol'
        : 'term';

      return { type, value: t, status: 0 };
    });

  return terms;
};

const { subscribe, set, update } = writable<CurrentContent>({
  originalString: '',
  title: '',
  parsed: [],
});

export default {
  subscribe,
  setContent: (originalString: string, title: string) => {
    set({ originalString, title, parsed: splitContent(originalString) });
  },
  updateTermStatus: (term: string, status: number): void => {
    update((current) => {
      const newValue = current;
      newValue.parsed = newValue.parsed.map((c) => {
        if (c.value === term) {
          return { ...c, status };
        }

        return c;
      });

      return newValue;
    });
  },
};
