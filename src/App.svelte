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

</style>


