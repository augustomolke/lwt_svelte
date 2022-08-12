// db.ts
import Dexie from 'dexie';
import type { Table } from 'dexie';

const formatTerm = (term: string): string =>
  term.replace(' ', '').toUpperCase();

export interface Content {
  id?: number;
  title: string;
  text: string;
}

export interface Term {
  id?: number;
  term: string;
  sources: string[];
}
export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  content!: Table<Content, string>;
  terms!: Table<Term, string>;
  addTerm: (term: string) => void;
  addContent: (
    title: string,
    text: string
  ) => Promise<{ contentId: string; addedTerms: string[] }>;

  constructor() {
    super('myDatabase');
    this.version(1).stores({
      content: '++id, title, text', // Primary key and indexed props
      terms: '++id, term, sources',
    });
    this.addTerm = (term: string) => this.terms.add({ term, sources: [] });
    this.addContent = async (title: string, text: string) => {
      const contentId = await this.content.add({ title, text });

      const terms = text.split(' ');

      const items = terms.map((term) => {
        return { term, sources: [contentId] };
      });
      const addedTerms = await this.terms.bulkAdd(items, { allKeys: true });

      return { contentId, addedTerms };
    };
  }
}

export const db = new MySubClassedDexie();
