import AddContentForm from './lib/components/organisms/AddContentForm.svelte';
import EditContentPage from './lib/pages/EditContentPage.svelte';
import SelectContentPage from './lib/pages/ContentListPage.svelte';
import Content from './lib/pages/ContentPage.svelte';
import SettingsPage from './lib/pages/SettingsPage.svelte';
import TermsListPage from './lib/pages/TermsListPage.svelte';
import TermPage from './lib/pages/TermPage.svelte';

export const routes = {
  '/edit/:slug': EditContentPage,
  '/content/create': AddContentForm,
  '/content': SelectContentPage,
  '/content/:slug': Content,
  '/settings': SettingsPage,
  '/terms': TermsListPage,
  '/terms/:id': TermPage,
};
