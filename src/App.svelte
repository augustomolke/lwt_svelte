<script lang="ts">

import Router, { link } from "svelte-spa-router";
import { routes } from "./routes.js";
import configs from './stores/configs'


function hexToRgbA(hex, a=1){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+`,${a})`;
    }
    throw new Error('Bad Hex');
}


configs.applyTheme()

$: style = Object.keys($configs.colors).reduce((acc, current) => {
      return acc + `--${current}:${$configs.colors[current]};`;
    },'') + `--primary-focus:${hexToRgbA($configs.colors.primary, 0.125)};`;

</script>


<main class="container" style="{style}" >
   
    <nav>
      <ul>
        <li><strong>LWT</strong></li>
      </ul>
      <ul>
        <li><a use:link href="/create">Create</a></li>
        <li><a use:link href="/content">Read</a></li>
        <li><a use:link href="/terms">Terms</a></li>
        <li><a use:link href="/settings">Settings</a></li>
      </ul>
    </nav>

    <Router {routes}/>
</main>

<style>


/* :root:not([data-theme=dark]), :root[data-theme=light]{
  --background-color: "#000" !important
} */

main {
  /* --primary: var(--primary);
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


