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
  id?: string;
  term: string;
  status: number;
}
export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  content!: Table<Content, string>;
  terms!: Table<Term, string>;
  addTerm: (term: string) => Promise<string>;
  bulkAddTerm: (terms: Term[]) => Promise<string[]>;
  addContent: (title: string, text: string) => Promise<string>;

  constructor() {
    super('myDatabase');
    this.version(1).stores({
      content: '++id, title, text', // Primary key and indexed props
      terms: 'id, term, status',
    });
    this.addTerm = async (term) => {
      return await this.terms.add({ id: formatTerm(term), term, status: 0 });
    };
    this.bulkAddTerm = async (terms) => {
      return await this.terms
        .bulkAdd(terms, { allKeys: true })
        .catch((fail) => {
          return fail.failures.map(async (_f, idx) => {
            return await this.terms.get(terms[idx].id);
          });
        });
    };
    this.addContent = async (title: string, text: string) => {
      const contentId = await this.content.add({ title, text });

      // const terms = text.split(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~ ]+/);

      // const items = terms.map((term) => {
      //   return { id: formatTerm(term), term, sources: [contentId], status: 0 };
      // });
      // const addedTerms = await this.bulkAddTerm(items);

      return contentId;
    };
  }
}

export const db = new MySubClassedDexie();
