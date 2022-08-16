<script lang="ts">
  import Fab, { Icon } from '@smui/fab';
  export let onClick;
</script>

<div class="floating-button">
<Fab  color="primary" on:click={onClick}>
        <Icon class="material-icons">edit</Icon>
</Fab>
</div>

<style>
  .floating-button {
    position: fixed !important;
    z-index: 2;
    right: 25px;
   bottom: 25px;
  }
</style>