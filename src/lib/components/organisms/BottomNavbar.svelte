<script lang="ts">
  import { link } from 'svelte-spa-router';
</script>

<nav class="navbar">
  <ul>
    <li><strong>LWT</strong></li>
  </ul>
  <ul>
    <li><a use:link href="/content">Read</a></li>
    <li><a use:link href="/terms">Review</a></li>
    <li><a use:link href="/settings" role="button">Settings</a></li>
  </ul>
</nav>
<slot />

<style>
  .navbar {
    z-index: 2;
  }
</style>
