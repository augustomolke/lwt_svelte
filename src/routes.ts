import AddContentForm from './lib/AddContentForm.svelte';
import EditContentPage from './lib/EditContentPage.svelte';
import ReadContent from './lib/ReadContent.svelte';
import Content from './lib/ContentPage.svelte';

export const routes = {
  '/edit/:slug': EditContentPage,
  '/create': AddContentForm,
  '/content': ReadContent,
  '/content/:slug': Content,
};
