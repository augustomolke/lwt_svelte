<script lang="ts">

import Router, { link } from "svelte-spa-router";
import { routes } from "./routes.js";
import theme from './stores/theme'


theme.applyTheme()

</script>


<main class="container" style="--value:black" >
   

    <nav>
      <ul>
        <li><strong>LWT</strong></li>
      </ul>
      <ul>
        <li><a use:link href="/create">Create</a></li>
        <li><a use:link href="/content">Read</a></li>
        <li><a use:link href="/settings">Settings</a></li>

      </ul>
    </nav>

    <Router {routes}/>
</main>

<style>

main {
  /* --primary: hsl(195deg, 85%, 41%);
  --primary-hover: hsl(195deg, 90%, 32%);
  --primary-focus: rgba(16, 149, 193, 0.125);
  --primary-inverse: #fff;
  --secondary: hsl(205deg, 15%, 41%);
  --secondary-hover: hsl(205deg, 20%, 32%);
  --secondary-focus: rgba(89, 107, 120, 0.125);
  --secondary-inverse: #fff;
  --contrast: hsl(205deg, 30%, 15%);
  --contrast-hover: #000;
  --contrast-focus: rgba(89, 107, 120, 0.125);
  --contrast-inverse: #fff; */

}

</style>


