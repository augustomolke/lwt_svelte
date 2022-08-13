import { writable } from 'svelte/store';
import db, { splitContent, type Term } from '../../db';
import type { Content } from '../../db';

const defaultContent: Content & { promise?: Promise<Content> } = {
  id: null,
  originalString: '',
  title: '',
  parsed: [],
  promise: null,
};

const { subscribe, update, set } = writable<
  Content & { promise?: Promise<Content> }
>(defaultContent);

export default {
  subscribe,
  setDefault: () => set(defaultContent),
  createContent: async (
    content: string,
    title: string,
    terms: Term[] = [],
    sync = true
  ) => {
    let termsArray = splitContent(content);

    termsArray = termsArray.length > terms.length ? termsArray : terms;

    const parsed = await Promise.all(
      termsArray.map(async (term) => {
        const savedTerm = await db.getTerm(term.value);
        if (savedTerm) {
          return {
            ...term,
            status: savedTerm.status,
          };
        }
        return term;
      })
    );

    if (sync) {
      const id = await db.addContent(title, content, parsed);
      await db.bulkAddTerm(parsed);

      set(await db.getContent(id));
    }
    update((u) => ({ ...u, originalString: content, parsed }));
  },
  setContent: async (contentId: number) => {
    const content = await db.getContent(contentId);

    if (content) {
      const terms = content.parsed.map((p) => p.id);

      content.parsed = await db.getTerms(terms);

      set(content);
    }
  },
  setTitle: (title: string) => {
    update((u) => ({ ...u, title }));
  },
  setPromise: (promise) => update((c) => ({ ...c, promise })),
  updateTermStatus: async (
    term: string,
    status: number,
    sync = false
  ): Promise<void> => {
    const old = await db.getTerm(term);
    const newTerm = old ? { ...old, status } : false;

    if (sync && newTerm) {
      await db.updateTerm(newTerm);
    }

    update((current) => {
      const updatedParsed = current.parsed.map((c) => {
        if (c.value === term) {
          return { ...c, status };
        }
        return c;
      });

      const newvalue = { ...current, parsed: updatedParsed };

      return newvalue;
    });
  },
};
