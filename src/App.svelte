<script lang="ts">
  import Router, { replace } from 'svelte-spa-router';
  import BottomNavbar from './lib/components/organisms/BottomNavbar.svelte';
  import { routes } from './routes.js';
  import configs from './stores/configs';
  import { hexToRgbA } from './utils/regex';

  replace('/content');

  $: style =
    Object.keys($configs.colors).reduce((acc, current) => {
      return acc + `--${current}:${$configs.colors[current]};`;
    }, '') +
    `--primary-focus:${hexToRgbA($configs.colors.primary, 0.125)};
    --switch-checked-background-color: ${$configs.colors.primary};
    --form-element-active-border-color:${$configs.colors.primary};
    --form-element-focus-color:${$configs.colors['primary-hover']};
    --switch-color: ${$configs.colors['primary-inverse']};
    --progress-color:${$configs.colors.primary}`;
</script>

<main class="container" {style}>
  <BottomNavbar>
    <Router {routes} />
  </BottomNavbar>
</main>

<style>
</style>
