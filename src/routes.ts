import AddContentForm from './lib/AddContentForm.svelte';
import EditContentPage from './lib/EditContentPage.svelte';
import SelectContentPage from './lib/SelectContentPage.svelte';
import Content from './lib/ContentPage.svelte';
import SettingsPage from './lib/SettingsPage.svelte';

export const routes = {
  '/edit/:slug': EditContentPage,
  '/create': AddContentForm,
  '/content': SelectContentPage,
  '/content/:slug': Content,
  '/settings': SettingsPage,
};
