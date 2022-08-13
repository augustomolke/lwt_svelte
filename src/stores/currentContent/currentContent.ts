import { writable } from 'svelte/store';
import db, { splitContent, type Term } from '../../db';
import type { Content } from '../../db';

const { subscribe, update, set } = writable<Content>({
  originalString: '',
  title: '',
  parsed: [],
});

export default {
  subscribe,
  createContent: async (content: string, title: string, sync = true) => {
    const termsArray = splitContent(content);

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
      await db.addContent(title, content, parsed);
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
