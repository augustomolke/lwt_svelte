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

  constructor() {
    super('myDatabase');
    this.version(1).stores({
      content: '++id, title, text', // Primary key and indexed props
      terms: '++id, term, sources',
    });
    this.addTerm = (term: string) => this.terms.add({ term, sources: [] });
  }
}

export const db = new MySubClassedDexie();
