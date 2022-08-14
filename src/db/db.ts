// db.ts
import Dexie from 'dexie';
import type { Table } from 'dexie';
import urlSlug from 'url-slug';

export interface Content {
  id?: string;
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
  content!: Table<Content, string>;
  terms!: Table<Term, string>;
  addTerm: (term: string) => Promise<string>;
  updateTerm: (term: Term) => Promise<string>;
  getTerm: (unformatted: string) => Promise<Term>;
  getTerms: (id: string[]) => Promise<Term[]>;
  getContent: (id: string) => Promise<Content>;
  bulkAddTerm: (terms: Omit<Term, 'id' | 'type'>[]) => Promise<string[]>;
  addContent: (
    title: string,
    originalString: string,
    parsed: Term[]
  ) => Promise<string>;
  updateContent: (id: string, newContent: Content) => Promise<number>;
  getContents: () => Promise<Content[]>;
  deleteContent: (id: string) => Promise<void>;

  constructor() {
    super('myDatabase');
    this.version(1).stores({
      content: 'id, title', // Primary key and indexed props
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
    this.addContent = async (title, originalString, parsed = []) => {
      try {
        const termsArray = splitContent(originalString);

        const generatedParsed = await Promise.all(
          termsArray.map(async (term) => {
            const savedTerm = await db.getTerm(term.value);
            const inputTerm = parsed.find((t) => t.id === term.id);

            let outputTerm;

            if (savedTerm) {
              outputTerm = {
                ...term,
                status: savedTerm.status,
              };
            }

            if (inputTerm) {
              outputTerm = {
                ...term,
                status: inputTerm.status[0],
              };
            }

            if (outputTerm) {
              await db.terms.put(outputTerm);

              return outputTerm;
            }

            return term;
          })
        );

        const contentId = await this.content.add({
          id: urlSlug(title),
          title,
          originalString,
          parsed: generatedParsed,
        });
        return contentId;
      } catch (err) {
        return err;
      }
    };
    this.deleteContent = async (id) => await this.content.delete(id);
    this.getTerm = (id) => {
      return this.terms.get(id);
    };
    this.getTerms = (ids) => {
      return this.terms.bulkGet(ids);
    };
    this.getContents = () => {
      return this.content.toArray();
    };
    this.updateContent = async (id, newContent) => {
      try {
        const newTerms = await Promise.all(
          splitContent(newContent.originalString).map(async (term) => {
            const old = await db.terms.get(term.id);

            if (!old) {
              this.terms.add(term);
              return term;
            }

            return old;
          })
        );

        return this.content.update(id, { ...newContent, parsed: newTerms });
      } catch (err) {
        return err;
      }
    };
    this.getContent = async (id) => {
      try {
        const content = await this.content.get(id);

        const updatedTerms = await Promise.all(
          content.parsed.map(async (term) => {
            const updated = await this.terms.get(term.id);
            if (updated) {
              return updated;
            }
            return term;
          })
        );

        const updatedContent = { ...content, parsed: updatedTerms };

        await this.updateContent(content.id, updatedContent);

        return updatedContent;
      } catch (err) {
        return err;
      }
    };
  }
}

export const db = new MySubClassedDexie();
