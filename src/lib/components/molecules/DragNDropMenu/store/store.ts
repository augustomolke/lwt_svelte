import { writable } from 'svelte/store';

export default writable({
  currentNode: null,
  trigger: false,
});
