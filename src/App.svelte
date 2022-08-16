<script lang="ts">

import Router, { replace} from "svelte-spa-router";
import BottomNavbar from "./lib/components/organisms/BottomNavbar.svelte";
import { routes } from "./routes.js";
import configs from './stores/configs'
import {hexToRgbA} from './utils/regex'



replace('/content')

$: style = Object.keys($configs.colors).reduce((acc, current) => {
      return acc + `--${current}:${$configs.colors[current]};`;
    },'') + `--primary-focus:${hexToRgbA($configs.colors.primary, 0.125)};`;


</script>

<main class="container mx-auto p-8" style="{style}" >
  <BottomNavbar/>
  <Router {routes}/>
</main>

<style>


</style>


