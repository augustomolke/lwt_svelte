import AddContentForm from './lib/components/AddContentForm.svelte';
import EditContentPage from './lib/pages/EditContentPage.svelte';
import SelectContentPage from './lib/pages/SelectContentPage.svelte';
import Content from './lib/components/ContentPage.svelte';
import SettingsPage from './lib/pages/SettingsPage.svelte';

export const routes = {
  '/edit/:slug': EditContentPage,
  '/create': AddContentForm,
  '/content': SelectContentPage,
  '/content/:slug': Content,
  '/settings': SettingsPage,
};
