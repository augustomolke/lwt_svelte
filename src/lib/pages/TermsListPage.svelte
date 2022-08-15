<script lang="ts">
import bd from '../../db';
import { link } from "svelte-spa-router";

let timer;
let value;
let termsPromise = bd.getTerms();

const debounce = () => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			termsPromise = bd.getTerms(undefined,{value});
		}, 500);
	}

const init=(el)=>{
    el.focus()
  }

</script>


<section>
{#await termsPromise}
<p aria-busy="true"/>
    
{:then terms}

<input type="search" use:init bind:value on:keyup|preventDefault="{debounce}"/>

{#each terms as term (term.id)}
<details>
    <summary>{term.value}</summary>
    <p>{term.status}</p>
    <a use:link href="/terms/{term.id}">Editar</a>
</details>
    
{/each}
    
{/await}

</section>