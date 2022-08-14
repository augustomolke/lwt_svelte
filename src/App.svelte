<script lang="ts">

import Router, { link } from "svelte-spa-router";
  import { routes } from "./routes.js";

</script>

<main class="container">
    <a role='button' use:link href='/write'>Create or Edit</a>
    <a role='button' use:link href='/content'>Read</a>
    <Router {routes}/>
</main>


