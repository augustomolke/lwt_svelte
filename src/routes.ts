import AddContentForm from './lib/AddContentForm.svelte';
import ReadContent from './lib/ReadContent.svelte';
import Content from './lib/Content.svelte';

export const routes = {
  '/write': AddContentForm,
  '/content': ReadContent,
  '/content/:slug': Content,
};
