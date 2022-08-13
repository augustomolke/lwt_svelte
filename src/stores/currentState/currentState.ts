import { writable } from 'svelte/store';

interface State {
  action: 'read' | 'input';
}

const { subscribe, update } = writable<State>({
  action: 'read',
});

export default {
  subscribe,
  setAction: (action: State['action']) => {
    update((u) => ({ ...u, action }));
  },
};
