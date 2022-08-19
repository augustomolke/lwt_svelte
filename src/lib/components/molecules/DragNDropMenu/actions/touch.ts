import store from '../store';

export const dragArea = ({ firstChild: node }: HTMLElement) => {
  const trackNode = (e) => {
    store.update((u) => ({
      ...u,
      currentNode: document.elementFromPoint(
        e.touches[0].clientX,
        e.touches[0].clientY
      ),
    }));
  };

  const handleDragStart = () => {
    store.update((u) => ({ ...u, trigger: false }));
  };

  const handleDropNode = () => {
    store.update((u) => ({
      ...u,
      trigger: true,
    }));
  };

  node.addEventListener('touchmove', trackNode, false);
  node.addEventListener('touchstart', handleDragStart, false);
  node.addEventListener('touchend', handleDropNode, false);

  return {
    destroy() {
      node.removeEventListener('touchmove', trackNode, false);
      node.removeEventListener('touchstart', handleDragStart, false);
      node.removeEventListener('touchend', handleDropNode, false);
    },
  };
};
