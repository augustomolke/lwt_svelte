<script lang="ts">

import Router, { link } from "svelte-spa-router";
import { routes } from "./routes.js";

let checked=true
let value="#d81b60";

const handleSwitch=()=>{
        document.querySelector('html').setAttribute('data-theme', checked ? 'dark' : 'light')
    }

handleSwitch()


</script>


<main class="container" style:--value={value} >
      <input type="checkbox" role="switch" id="theme" name="theme" on:change="{handleSwitch}" bind:checked>

    <input type="color" id="color" name="color" bind:value>
    <nav>
      <ul>
        <li><strong>LWT</strong></li>
      </ul>
      <ul>
        <li><a use:link href="/create">Create</a></li>
        <li><a use:link href="/content">Read</a></li>
      </ul>
    </nav>

    <Router {routes}/>
</main>

<style>


</style>


