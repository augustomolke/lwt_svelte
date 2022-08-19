<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import store from '../store';
  export let onDropNode: () => void;

  const dispatcher = createEventDispatcher();
  let isHovering = false;

  const reportHoverDragging = (
    { firstChild: node }: HTMLElement,
    inputNode: HTMLElement
  ) => {
    const check = (checkNode) => {
      if (!isHovering && node === checkNode) {
        dispatcher('hoverDraggingStart');
        isHovering = true;
      }

      if (isHovering && checkNode !== node) {
        dispatcher('hoverDraggingEnd');
        isHovering = false;
      }
    };

    check(inputNode);

    return {
      update(newCurrentNode) {
        check(newCurrentNode);
      },
    };
  };

  const reportCursorHover = ({ firstChild: node }) => {
    const handle = () => {
      dispatcher('cursorHoverStart');
    };

    const handleLeave = (e) => {
      dispatcher('cursorHoverEnd');
    };

    node.addEventListener('mouseover', handle, true);
    node.addEventListener('focus', handle, true);
    node.addEventListener('mouseleave', handleLeave, true);

    return {
      destroy() {
        node.removeEventListener('mouseover', handle, true);
        node.removeEventListener('focus', handle, true);
        node.removeEventListener('mouseleave', handleLeave, true);
      },
    };
  };

  const dropNodeOver = (_, { dropped, onDrop }) => {
    const handleDrop = (trigger, func) => {
      if (isHovering && trigger) {
        func();
        isHovering = false;
      }
    };

    handleDrop(dropped, onDrop);

    return {
      update({ dropped, onDrop }) {
        handleDrop(dropped, onDrop);
      },
    };
  };
</script>

<div
  on:click={onDropNode}
  use:reportHoverDragging={$store.currentNode}
  use:reportCursorHover
  use:dropNodeOver={{ dropped: $store.trigger, onDrop: onDropNode }}
>
  <slot />
</div>

<style>
  div {
    margin: none;
    padding: none;
    border: none;
  }
</style>
