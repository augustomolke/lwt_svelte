import { writable } from 'svelte/store';
import db, { type Term, splitContent } from '../../db';
import type { Content } from '../../db';

const defaultContent: Content = {
  id: null,
  originalString: '',
  title: '',
  parsed: [],
};

const { subscribe, update, set } = writable<Content>(defaultContent);

export default {
  subscribe,
  parseOriginalString: splitContent,
  setDefault: () => set(defaultContent),
  createContent: async (
    content: string,
    title: string,
    terms: Term[] = [],
    sync = true
  ) => {
    if (sync) {
      const id = await db.addContent(title, content, terms);

      set(await db.getContent(id));
    }
    update((u) => ({ ...u, originalString: content, parsed: terms }));
  },
  setContent: async (contentId: string) => {
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
  getContent: async (slug) => {
    if (!slug) {
      return;
    }
    const content = await db.getContent(slug);
    set(content);
  },
  updateOrCreateTerm: async (
    term: Term,
    patch: Partial<Term>,
    sync = true
  ): Promise<Term> => {
    let newTerm;
    if (sync) {
      let old = await db.getTerm(term.id);
      newTerm = old ? { ...old, ...patch } : { ...term, ...patch };

      await db.updateTerm(newTerm);
    } else {
      newTerm = term;
    }
    update((current) => {
      const updatedParsed = current.parsed.map((c) => {
        if (c.id === term.id) {
          return { ...c, ...newTerm };
        }
        return c;
      });

      const newContent = { ...current, parsed: updatedParsed };

      return newContent;
    });

    return newTerm;
  },
};
