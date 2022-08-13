// db.ts
import Dexie from 'dexie';
import type { Table } from 'dexie';

export interface Content {
  id?: number;
  title: string;
  originalString: string;
  parsed: Term[];
}

export interface Term {
  id: string;
  type: 'term' | 'symbol';
  value: string;
  status: number;
}

const REGEX = /([`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~.(\r\n|\r|\n)]+)/g;

const getType = (value: string): 'symbol' | 'term' => {
  return value.match(REGEX) ? 'symbol' : 'term';
};

export const formatTerm = (term: string): string =>
  term.replace(' ', '').toUpperCase();

export const splitContent = (originalContent: string): Term[] => {
  const terms = originalContent
    .replaceAll(REGEX, ' $1 ')
    .split(/ +/)
    .filter((t) => t !== '')
    .map((t) => {
      const type = getType(t);

      return { id: formatTerm(t), type, value: t, status: 0 };
    });

  return terms;
};

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  content!: Table<Content, number>;
  terms!: Table<Term, string>;
  addTerm: (term: string) => Promise<string>;
  updateTerm: (term: Term) => Promise<string>;
  getTerm: (unformatted: string) => Promise<Term>;
  getTerms: (id: string[]) => Promise<Term[]>;
  getContent: (id: number) => Promise<Content>;
  bulkAddTerm: (terms: Omit<Term, 'id' | 'type'>[]) => Promise<string[]>;
  addContent: (
    title: string,
    originalString: string,
    parsed: Term[]
  ) => Promise<number>;
  getContents: () => Promise<Content[]>;

  constructor() {
    super('myDatabase');
    this.version(1).stores({
      content: '++id, title', // Primary key and indexed props
      terms: 'id, term, status',
    });
    this.addTerm = async (value) => {
      const type: Term['type'] = value.match(
        /([`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~.(\r\n|\r|\n)]+)/g
      )
        ? 'symbol'
        : 'term';
      return await this.terms.add({
        id: formatTerm(value),
        value,
        status: 0,
        type,
      });
    };
    this.updateTerm = async (term: Term) => {
      return await this.terms.put(term);
    };
    this.bulkAddTerm = async (terms) => {
      const completeTerms = terms.map((t) => ({
        ...t,
        id: formatTerm(t.value),
        type: getType(t.value),
      }));
      return await this.terms
        .bulkPut(completeTerms, { allKeys: true })
        .catch((fail) => {
          return fail.failures.map(async (_f, idx) => {
            return await this.terms.get(completeTerms[idx].id);
          });
        });
    };
    this.addContent = async (title, originalString, parsed) => {
      const contentId = await this.content.add({
        title,
        originalString,
        parsed,
      });
      return contentId;
    };
    this.getTerm = (unformatted) => {
      return this.terms.get(formatTerm(unformatted));
    };
    this.getTerms = (ids) => {
      return this.terms.bulkGet(ids);
    };
    this.getContents = () => {
      return this.content.toArray();
    };
    this.getContent = (id) => {
      return this.content.get(id);
    };
  }
}

export const db = new MySubClassedDexie();
