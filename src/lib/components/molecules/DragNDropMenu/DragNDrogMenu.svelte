<script lang="ts">
  import DropActionComponent from './components/DropActionComponent.svelte';
  import { dragArea } from './actions/touch';
  import { trackMouseOver } from './actions/cursor';
  import { createPopperActions } from 'svelte-popperjs';
  const [popperRef, popperContent] = createPopperActions({
    placement: 'auto-start',
  });
  const extraOpts = {
    modifiers: [{ name: 'offset', options: { offset: [0, 0] } }],
  };

  let open = false;
  let timer;
  let menuNode;

  export let actions;

  const openMenu = () => {
    timer = setTimeout(() => {
      open = true;
      document.body.classList.add('stop-scrolling');
    }, 400);
  };

  const closeMenu = () => {
    clearInterval(timer);
    open = false;
    document.body.classList.remove('stop-scrolling');
  };

  const onMouseOver = () => {
    timer = setTimeout(() => {
      open = true;
    }, 600);
  };

  const onMouseLeave = () => {
    clearInterval(timer);
    open = false;
  };
</script>

<div class="wrapper">
  <div
    use:popperRef
    use:dragArea
    use:trackMouseOver={{ onMouseOver, onMouseLeave, includeNode: menuNode }}
    class="menu"
    on:touchstart={openMenu}
    on:touchend={closeMenu}
    on:touchmove={() => {
      clearInterval(timer);
    }}
  >
    <slot />
  </div>

  {#if open}
    <article
      use:popperContent={extraOpts}
      class="action-components"
      bind:this={menuNode}
    >
      {#each actions as action (action.label)}
        <DropActionComponent
          onDropNode={() => {
            action.func();
            open = false;
          }}
        >
          <button>{action.label}</button>
        </DropActionComponent>
      {/each}
    </article>
  {/if}
</div>

<style>
  .menu {
    display: inline-block;
    margin: 0;
    padding: 0;
    border: none;
  }

  .wrapper {
    position: relative;
    display: inline-block;
    margin: 0;
    padding: 0;
    border: none;
  }

  .action-components {
    position: absolute;
    display: block;
    width: 15rem;
    z-index: 3;
    margin: 0;
    bottom: 10px;
  }

  :global(body.stop-scrolling) {
    overflow: hidden !important;
    height: 100%;
  }
</style>
