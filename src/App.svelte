<script lang="ts">
import Router, { replace} from "svelte-spa-router";
import {onMount} from 'svelte'
import BottomNavbar from "./lib/components/organisms/BottomNavbar.svelte";
import { routes } from "./routes.js";
import configs from './stores/configs'
import {hexToRgbA} from './utils/regex'
import Card from '@smui/card';
import Button from '@smui/button'



replace('/content')

$: style = Object.keys($configs.colors).reduce((acc, current) => {
      return acc + `--${current}:${$configs.colors[current]};`;
    },'') + `--primary-focus:${hexToRgbA($configs.colors.primary, 0.125)};`;


    onMount(()=>{

    })

</script>

<svelte:head>
<!-- SMUI Styles -->
{#if $configs.theme==='dark'}
     <link
     rel="stylesheet"
     href="/smui-dark.css"
     media="screen"
   />

{:else if $configs.theme==='light'}
    <link rel="stylesheet" href="/smui.css" media="screen" />

{:else}
    <link rel="stylesheet" href="/smui.css" media="screen" />
{/if}

</svelte:head>

<main style="{style}" >
  <BottomNavbar>
  <Card variant="outlined" padded>    
    <Button variant="raised">asdasd</Button>
  <Router {routes}/>
  </Card>
  </BottomNavbar>
</main>

<style>



/* Theme colors. */
:root {
  --mdc-theme-primary: #ff3e00;
  --mdc-theme-secondary: #676778;
  --mdc-theme-background: #fff;
  --mdc-theme-surface: #fff;
  --mdc-theme-error: #b71c1c;
  --mdc-theme-on-primary: #fff;
  --mdc-theme-on-secondary: #fff;
  --mdc-theme-on-surface: #000;
  --mdc-theme-on-error: #fff;
  --mdc-theme-text-primary-on-background: rgba(0, 0, 0, 0.87);
  --mdc-theme-text-secondary-on-background: rgba(0, 0, 0, 0.54);
  --mdc-theme-text-hint-on-background: rgba(0, 0, 0, 0.38);
  --mdc-theme-text-disabled-on-background: rgba(0, 0, 0, 0.38);
  --mdc-theme-text-icon-on-background: rgba(0, 0, 0, 0.38);
  --mdc-theme-text-primary-on-light: rgba(0, 0, 0, 0.87);
  --mdc-theme-text-secondary-on-light: rgba(0, 0, 0, 0.54);
  --mdc-theme-text-hint-on-light: rgba(0, 0, 0, 0.38);
  --mdc-theme-text-disabled-on-light: rgba(0, 0, 0, 0.38);
  --mdc-theme-text-icon-on-light: rgba(0, 0, 0, 0.38);
  --mdc-theme-text-primary-on-dark: white;
  --mdc-theme-text-secondary-on-dark: rgba(255, 255, 255, 0.7);
  --mdc-theme-text-hint-on-dark: rgba(255, 255, 255, 0.5);
  --mdc-theme-text-disabled-on-dark: rgba(255, 255, 255, 0.5);
  --mdc-theme-text-icon-on-dark: rgba(255, 255, 255, 0.5);
}

/* Layout grid spacing. */
:root {
  --mdc-layout-grid-margin-desktop: 24px;
  --mdc-layout-grid-gutter-desktop: 24px;
  --mdc-layout-grid-column-width-desktop: 72px;
  --mdc-layout-grid-margin-tablet: 16px;
  --mdc-layout-grid-gutter-tablet: 16px;
  --mdc-layout-grid-column-width-tablet: 72px;
  --mdc-layout-grid-margin-phone: 16px;
  --mdc-layout-grid-gutter-phone: 16px;
  --mdc-layout-grid-column-width-phone: 72px;
}

</style>


