<script lang="ts">
  export let onClick;
</script>

<button on:click={onClick} class="floating-button">
  <slot />
</button>

<style>
  .floating-button {
    position: fixed !important;
    z-index: 2;
    right: 25px;
    bottom: 25px;
    border-radius: 50%;
    width: 3.5rem;
    height: 3.5rem;
    padding: 0;
    margin: 0;
  }
</style>
