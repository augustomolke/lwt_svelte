<script lang="ts">
  import type { Term } from '../../../db';
  import { createEventDispatcher } from 'svelte';
  export let term: Term;
  export let disabled: boolean = false;
  let open = false;
  let timer;
  let nodeToDetectTouch;
  let touchEndFunc;
  let originNode;
  let currentNode;
  let tooltip;
  let isScrolling = false;

  const dispatcher = createEventDispatcher();

  const disableScroll = () => {
    document.body.classList.add('stop-scrolling');
  };

  const enableScroll = () => {
    document.body.classList.remove('stop-scrolling');
  };

  const handleClick = () => {
    clearInterval(timer);
    open = false;
    dispatcher('toggle');
  };

  function pressingDown(e) {
    // Start the timer
    e.target.originNode = e.target;
    timer = setTimeout(() => {
      if (!isScrolling) {
        open = true;
      }
    }, 600);
  }

  function notPressingDown() {
    // Stop the timer
    if (touchEndFunc) touchEndFunc();

    if (currentNode !== originNode && currentNode !== tooltip) {
      open = false;
      clearInterval(timer);
      currentNode = undefined;
    }

    if (originNode === currentNode && !isScrolling) {
      handleClick();
    }

    isScrolling = false;
  }

  const mouseOver = (e) => {
    // Start the timer
    timer = setTimeout(() => {
      open = true;
      originNode = e.target;
    }, 750);
  };

  const mouseNotOver = (e) => {
    // Stop the timer
    if (e.toElement !== tooltip) {
      open = false;
    }
    clearInterval(timer);
  };

  const trackTouch = (e) => {
    isScrolling = true;
    currentNode = document.elementFromPoint(
      e.touches[0].pageX,
      e.touches[0].pageY
    );

    if (currentNode === nodeToDetectTouch) {
      touchEndFunc = handleClick;
    } else {
      touchEndFunc = null;
    }
  };

  const trackMouse = (e) => {
    currentNode = document.elementFromPoint(e.x, e.y);
  };

  $: open ? disableScroll() : enableScroll();
</script>

{#if term.type === 'term'}
  <div
    class:open
    title={term.notes}
    bind:this={currentNode}
    on:click={handleClick}
    on:mouseover={mouseOver}
    on:mouseleave={mouseNotOver}
    on:focus={mouseOver}
    on:touchstart={pressingDown}
    on:touchend={notPressingDown}
    on:touchmove={trackTouch}
    class:disabled
    class:good={term.status === 2}
    class:neverSeen={term.status === 0}
    class:regular={term.status === 1}
    class:proficient={term.status === 3}
    role={disabled ? '' : 'button'}
    class="secondary outline word"
  >
    {term.value}
  </div>
{:else if term.type === 'symbol'}
  <p>{term.value}</p>
{/if}

{#if open}
  <article
    class="tooltip"
    bind:this={tooltip}
    on:mouseover={trackMouse}
    on:focus={trackMouse}
    on:mouseleave={mouseNotOver}
  >
    <button
      class="term-menu"
      bind:this={nodeToDetectTouch}
      on:click={handleClick}
    >
      Action
    </button>
  </article>
{/if}

<style>
  .term-menu {
    position: static;
  }
  p {
    display: inline;
  }

  .word {
    border: none;
    padding: 0.3rem;
    display: inline-block;
    position: relative;
    transition: transform 0.2s;
    font-style: italic;
  }

  .word:hover:not(.proficient):not(.disabled) {
    transform: scale(1.5);
    z-index: 1;
  }

  .disabled {
    background-color: transparent !important;
  }
  .neverSeen {
    background-color: pink;
  }

  .regular {
    background-color: yellow;
  }

  .good {
    background-color: greenyellow;
  }

  .proficient {
    background-color: transparent;
    opacity: 1;
  }

  .tooltip {
    margin: 0;
  }

  .word {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  :global(body.stop-scrolling) {
    overflow: hidden !important;
  }
</style>
